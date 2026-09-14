
-- roles
CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- first signed-up user becomes admin
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- settings (key/value)
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings admin write" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER site_settings_touch BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- news
CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Actualité',
  published_on date NOT NULL DEFAULT current_date,
  image_url text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "news public read" ON public.news FOR SELECT USING (true);
CREATE POLICY "news admin write" ON public.news FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER news_touch BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- matches
CREATE TABLE public.matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition text NOT NULL DEFAULT '',
  home_team text NOT NULL DEFAULT 'Siroco Abymes',
  away_team text NOT NULL DEFAULT '',
  kickoff timestamptz NOT NULL DEFAULT now(),
  venue text NOT NULL DEFAULT '',
  home_score int,
  away_score int,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.matches TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.matches TO authenticated;
GRANT ALL ON public.matches TO service_role;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "matches public read" ON public.matches FOR SELECT USING (true);
CREATE POLICY "matches admin write" ON public.matches FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER matches_touch BEFORE UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- standings
CREATE TABLE public.standings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position int NOT NULL DEFAULT 1,
  team text NOT NULL,
  points int NOT NULL DEFAULT 0,
  played int NOT NULL DEFAULT 0,
  goal_diff text NOT NULL DEFAULT '0',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.standings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.standings TO authenticated;
GRANT ALL ON public.standings TO service_role;
ALTER TABLE public.standings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "standings public read" ON public.standings FOR SELECT USING (true);
CREATE POLICY "standings admin write" ON public.standings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER standings_touch BEFORE UPDATE ON public.standings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- gallery
CREATE TABLE public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery TO authenticated;
GRANT ALL ON public.gallery TO service_role;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gallery public read" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "gallery admin write" ON public.gallery FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER gallery_touch BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- seed settings
INSERT INTO public.site_settings (key, value) VALUES
 ('club_name','Siroco'),
 ('club_city','Abymes'),
 ('club_since','Depuis 1979'),
 ('topbar_location','Les Abymes, Guadeloupe'),
 ('topbar_slogan','Plus qu''un club, une famille'),
 ('hero_title','Siroco Abymes'),
 ('hero_tagline','Passion · Respect · Formation'),
 ('hero_subtitle','Club de football'),
 ('hero_quote','Fiers de nos couleurs'),
 ('banner_text','Ensemble, toujours plus loin !'),
 ('stat_members','200+'),
 ('stat_members_label','Licenciés'),
 ('stat_years','46'),
 ('stat_years_label','Années d''histoire'),
 ('stat_family','1'),
 ('stat_family_label','Grande famille'),
 ('footer_signature','Passionnément Siroco !'),
 ('newsletter_text','Restez informé de toute l''actualité du club !'),
 ('contact_email','contact@siroco-abymes.fr'),
 ('contact_phone','0590 00 00 00'),
 ('contact_address','Stade Municipal des Abymes, Guadeloupe'),
 ('social_facebook',''),
 ('social_instagram',''),
 ('social_youtube',''),
 ('quote_text','Le football est un jeu simple : 22 joueurs, un ballon, et tout un peuple derrière son équipe.');

INSERT INTO public.matches (competition, home_team, away_team, kickoff, venue, sort_order) VALUES
 ('Championnat régional — Journée 3','Siroco Abymes','A.S. Rivière-Salée','2025-09-20 16:00:00+00','Stade Municipal des Abymes',1);

INSERT INTO public.standings (position, team, points, played, goal_diff) VALUES
 (1,'Siroco Abymes',9,3,'+6'),
 (2,'Rivière-Salée',7,3,'+4'),
 (3,'Baie-Mahault',6,3,'+2'),
 (4,'Gosier',4,3,'0'),
 (5,'Sainte-Anne',3,3,'-2');
