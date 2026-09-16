CREATE TABLE public.teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT '',
  squad text NOT NULL DEFAULT '',
  coach text NOT NULL DEFAULT '',
  schedule text NOT NULL DEFAULT '',
  goal text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.teams TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teams TO authenticated;
GRANT ALL ON public.teams TO service_role;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "teams public read" ON public.teams FOR SELECT TO public USING (true);
CREATE POLICY "teams admin write" ON public.teams FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER teams_touch BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL DEFAULT '',
  number text NOT NULL DEFAULT '',
  team text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.players TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.players TO authenticated;
GRANT ALL ON public.players TO service_role;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "players public read" ON public.players FOR SELECT TO public USING (true);
CREATE POLICY "players admin write" ON public.players FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER players_touch BEFORE UPDATE ON public.players FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tier text NOT NULL DEFAULT '',
  website text NOT NULL DEFAULT '',
  logo_url text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.partners TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "partners public read" ON public.partners FOR SELECT TO public USING (true);
CREATE POLICY "partners admin write" ON public.partners FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER partners_touch BEFORE UPDATE ON public.partners FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.teams (name, category, squad, coach, schedule, goal, sort_order) VALUES
('Seniors A', 'Championnat régional', '24 joueurs', 'Staff seniors', 'Mardi & jeudi — 18h30', 'Jouer le haut de tableau et viser la montée.', 1),
('Seniors B', 'Division départementale', '20 joueurs', 'Staff seniors', 'Mardi & vendredi — 18h30', 'Former la passerelle entre les U19 et l''équipe fanion.', 2),
('U19', 'Championnat jeunes', '18 joueurs', 'Staff jeunes', 'Lundi & mercredi — 17h30', 'Préparer l''entrée dans le football senior.', 3),
('U17', 'Championnat jeunes', '20 joueurs', 'Staff jeunes', 'Mardi & jeudi — 17h00', 'Consolider les bases tactiques et physiques.', 4),
('U15', 'Championnat jeunes', '19 joueurs', 'Staff jeunes', 'Mercredi & vendredi — 16h30', 'Travail du jeu de position et de la prise d''information.', 5),
('U13', 'Football d''animation', '22 joueurs', 'Éducateurs école de foot', 'Mercredi — 15h00', 'Plaisir de jouer et maîtrise technique individuelle.', 6),
('U11 / U9', 'École de football', '30 enfants', 'Éducateurs école de foot', 'Mercredi — 14h00', 'Découverte du jeu à effectif réduit et plateaux du samedi.', 7),
('U7 / U6', 'Baby foot', '25 enfants', 'Éducateurs école de foot', 'Samedi — 9h00', 'Premiers pas avec le ballon, motricité et jeux collectifs.', 8);
