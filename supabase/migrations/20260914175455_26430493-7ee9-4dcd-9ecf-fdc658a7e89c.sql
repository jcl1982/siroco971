
ALTER TABLE public.matches
  ADD COLUMN IF NOT EXISTS matchday text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS video_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS summary text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS report text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS scorers text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS referee text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS attendance text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS image_url text NOT NULL DEFAULT '';

DELETE FROM public.matches WHERE true;

INSERT INTO public.matches (competition, matchday, home_team, away_team, kickoff, venue, home_score, away_score, sort_order, video_url, summary, report, scorers, referee, attendance, image_url) VALUES
('Championnat régional', 'Journée 1', 'Siroco Abymes', 'U.S. Sainte-Anne', '2025-08-30T16:00:00Z', 'Stade Municipal des Abymes', 3, 1, 1,
 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 'Une entrée en matière maîtrisée devant son public : le Siroco lance sa saison par un succès net.',
 'Dominateurs dès l''entame, les Verts ouvrent le score sur un centre en retrait converti à la 12e minute. Sainte-Anne égalise juste avant la pause sur coup de pied arrêté, mais le Siroco repasse devant dès le retour des vestiaires et scelle le succès en fin de match sur une contre-attaque rondement menée. Une victoire construite sur l''intensité et la discipline défensive.',
 'Buts Siroco : 12e, 51e, 78e — But Sainte-Anne : 43e', 'Commission régionale d''arbitrage', '450 spectateurs', '/photos/hero-match.jpg'),
('Championnat régional', 'Journée 2', 'A.S. Gosier', 'Siroco Abymes', '2025-09-06T17:00:00Z', 'Stade de Gosier', 1, 1, 2,
 '',
 'Match accroché au Gosier : le Siroco arrache le nul dans les dernières minutes.',
 'Pris à froid en début de rencontre, le Siroco a longtemps buté sur un bloc adverse très compact. Entrés en jeu à l''heure de jeu, les jeunes du centre de formation ont apporté la percussion nécessaire, et l''égalisation est tombée à la 85e minute au terme d''une longue possession. Un point précieux à l''extérieur.',
 'But Siroco : 85e — But Gosier : 9e', 'Commission régionale d''arbitrage', '300 spectateurs', '/photos/news-team.jpg'),
('Championnat régional', 'Journée 3', 'Siroco Abymes', 'C.S. Baie-Mahault', '2025-09-13T16:00:00Z', 'Stade Municipal des Abymes', 2, 0, 3,
 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 'Deux buts en seconde période et une défense impériale : le Siroco s''installe en haut du classement.',
 'Face à une équipe de Baie-Mahault joueuse, les Verts ont su rester patients. Le déblocage est venu d''une frappe lointaine à la 58e, avant que le second but ne vienne récompenser un pressing haut à dix minutes du terme. Clean sheet et trois points supplémentaires pour la bande abymienne.',
 'Buts Siroco : 58e, 80e', 'Commission régionale d''arbitrage', '520 spectateurs', '/photos/news-supporters.jpg'),
('Championnat régional', 'Journée 4', 'Siroco Abymes', 'A.S. Rivière-Salée', '2025-09-20T16:00:00Z', 'Stade Municipal des Abymes', NULL, NULL, 4,
 '', 'Choc du haut de tableau aux Abymes face au dauphin du championnat.', 'Les deux meilleures attaques du championnat se retrouvent au Stade Municipal des Abymes. Billetterie sur place dès 15h, animation supporters et buvette du club.', '', '', '', '/photos/hero-match.jpg'),
('Coupe de Guadeloupe', '32es de finale', 'U.S. Capesterre', 'Siroco Abymes', '2025-09-27T16:30:00Z', 'Stade de Capesterre-Belle-Eau', NULL, NULL, 5,
 '', 'Premier tour de Coupe de Guadeloupe en déplacement.', 'Déplacement à Capesterre-Belle-Eau pour l''entrée en lice du Siroco en Coupe de Guadeloupe. Un bus supporters est organisé par le club, inscription auprès du secrétariat.', '', '', '', '/photos/news-team.jpg'),
('Championnat régional', 'Journée 5', 'Étoile de Morne-à-l''Eau', 'Siroco Abymes', '2025-10-04T16:00:00Z', 'Stade de Morne-à-l''Eau', NULL, NULL, 6,
 '', 'Déplacement dans le Nord Grande-Terre pour la 5e journée.', 'Un déplacement toujours piégeux chez une équipe solide à domicile.', '', '', '', '/photos/news-supporters.jpg');

INSERT INTO public.news (title, excerpt, category, published_on, image_url, sort_order) VALUES
('Le Siroco s''impose 2-0 et prend la tête du championnat', 'Portés par un public nombreux au Stade Municipal, les Verts ont fait la différence en seconde période face à Baie-Mahault et grimpent à la première place.', 'Équipe première', '2025-09-14', '/photos/hero-match.jpg', 1),
('Ouverture des inscriptions à l''école de football', 'Les inscriptions pour les catégories U6 à U13 sont ouvertes au secrétariat du club, le mercredi de 14h à 18h. Certificat médical et photo d''identité demandés.', 'École de foot', '2025-09-10', '/photos/news-academy.jpg', 2),
('Trois éducateurs du club diplômés cette saison', 'Le Siroco poursuit la montée en compétence de son encadrement : trois éducateurs viennent de valider leur certificat fédéral de football.', 'Formation', '2025-09-05', '/photos/news-team.jpg', 3),
('Une tribune pleine pour la reprise du championnat', 'Plus de 450 supporters ont accompagné les Verts pour le premier match de la saison. Merci à tous pour cette ambiance.', 'Vie du club', '2025-08-31', '/photos/news-supporters.jpg', 4),
('Le club recherche des bénévoles pour la saison', 'Buvette, arbitrage, transport des jeunes : le Siroco recrute des bénévoles pour faire vivre les week-ends sportifs.', 'Vie du club', '2025-08-20', '/photos/news-team.jpg', 5);

INSERT INTO public.gallery (image_url, caption, sort_order) VALUES
('/photos/hero-match.jpg', 'Coup d''envoi au Stade Municipal des Abymes', 1),
('/photos/news-team.jpg', 'L''équipe première avant la rencontre', 2),
('/photos/news-supporters.jpg', 'Les supporters du Siroco en tribune', 3),
('/photos/news-academy.jpg', 'Séance de l''école de football', 4);
