import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Reglages = Record<string, string>;

export type Actualite = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_on: string;
  image_url: string;
  sort_order: number;
};

export type Match = {
  id: string;
  competition: string;
  matchday: string;
  home_team: string;
  away_team: string;
  kickoff: string;
  venue: string;
  home_score: number | null;
  away_score: number | null;
  sort_order: number;
  video_url: string;
  summary: string;
  report: string;
  scorers: string;
  referee: string;
  attendance: string;
  image_url: string;
};

export type Classement = {
  id: string;
  position: number;
  team: string;
  points: number;
  played: number;
  goal_diff: string;
};

export type Photo = {
  id: string;
  image_url: string;
  caption: string;
  sort_order: number;
};

export type Equipe = {
  id: string;
  name: string;
  category: string;
  squad: string;
  coach: string;
  schedule: string;
  goal: string;
  image_url: string;
  sort_order: number;
};

export type Joueur = {
  id: string;
  name: string;
  position: string;
  number: string;
  team: string;
  image_url: string;
  sort_order: number;
};

export type Partenaire = {
  id: string;
  name: string;
  tier: string;
  website: string;
  logo_url: string;
  description: string;
  sort_order: number;
};

export const reglagesParDefaut: Reglages = {
  club_name: "Siroco",
  club_city: "Abymes",
  club_since: "Depuis 1979",
  topbar_location: "Les Abymes, Guadeloupe",
  topbar_slogan: "Plus qu’un club, une famille",
  hero_title: "Siroco Abymes",
  hero_tagline: "Passion · Respect · Formation",
  hero_subtitle: "Club de football",
  hero_quote: "Fiers de nos couleurs",
  banner_text: "Ensemble, toujours plus loin !",
  stat_members: "200+",
  stat_members_label: "Licenciés",
  stat_years: "46",
  stat_years_label: "Années d’histoire",
  stat_family: "1",
  stat_family_label: "Grande famille",
  footer_signature: "Passionnément Siroco !",
  newsletter_text: "Restez informé de toute l’actualité du club !",
  contact_email: "contact@siroco-abymes.fr",
  contact_phone: "0590 00 00 00",
  contact_address: "Stade Municipal des Abymes, Guadeloupe",
  social_facebook: "",
  social_instagram: "",
  social_youtube: "",
  quote_text:
    "Le football est un jeu simple : 22 joueurs, un ballon, et tout un peuple derrière son équipe.",
};

export const CLES_REGLAGES: { key: string; label: string; groupe: string; multiligne?: boolean }[] = [
  { key: "club_name", label: "Nom du club", groupe: "Identité" },
  { key: "club_city", label: "Ville", groupe: "Identité" },
  { key: "club_since", label: "Année de création", groupe: "Identité" },
  { key: "topbar_location", label: "Lieu (barre du haut)", groupe: "Identité" },
  { key: "topbar_slogan", label: "Slogan (barre du haut)", groupe: "Identité" },
  { key: "hero_title", label: "Grand titre", groupe: "Accueil" },
  { key: "hero_tagline", label: "Valeurs affichées", groupe: "Accueil" },
  { key: "hero_subtitle", label: "Sous-titre", groupe: "Accueil" },
  { key: "hero_quote", label: "Phrase manuscrite", groupe: "Accueil" },
  { key: "banner_text", label: "Texte du bandeau", groupe: "Accueil" },
  { key: "quote_text", label: "Citation", groupe: "Accueil", multiligne: true },
  { key: "stat_members", label: "Chiffre 1", groupe: "Chiffres clés" },
  { key: "stat_members_label", label: "Libellé 1", groupe: "Chiffres clés" },
  { key: "stat_years", label: "Chiffre 2", groupe: "Chiffres clés" },
  { key: "stat_years_label", label: "Libellé 2", groupe: "Chiffres clés" },
  { key: "stat_family", label: "Chiffre 3", groupe: "Chiffres clés" },
  { key: "stat_family_label", label: "Libellé 3", groupe: "Chiffres clés" },
  { key: "contact_email", label: "Email", groupe: "Contact" },
  { key: "contact_phone", label: "Téléphone", groupe: "Contact" },
  { key: "contact_address", label: "Adresse", groupe: "Contact" },
  { key: "social_facebook", label: "Lien Facebook", groupe: "Réseaux & pied de page" },
  { key: "social_instagram", label: "Lien Instagram", groupe: "Réseaux & pied de page" },
  { key: "social_youtube", label: "Lien YouTube", groupe: "Réseaux & pied de page" },
  { key: "footer_signature", label: "Signature du pied de page", groupe: "Réseaux & pied de page" },
  { key: "newsletter_text", label: "Texte newsletter", groupe: "Réseaux & pied de page" },
];

export function useReglages() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<Reglages> => {
      const { data, error } = await supabase.from("site_settings").select("key, value");
      if (error) throw error;
      const valeurs: Reglages = { ...reglagesParDefaut };
      for (const ligne of data ?? []) valeurs[ligne.key] = ligne.value;
      return valeurs;
    },
  });
}

export function useActualites() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async (): Promise<Actualite[]> => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("published_on", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Actualite[];
    },
  });
}

export function useMatchs() {
  return useQuery({
    queryKey: ["matches"],
    queryFn: async (): Promise<Match[]> => {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("kickoff", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Match[];
    },
  });
}

export function useClassement() {
  return useQuery({
    queryKey: ["standings"],
    queryFn: async (): Promise<Classement[]> => {
      const { data, error } = await supabase
        .from("standings")
        .select("*")
        .order("position", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Classement[];
    },
  });
}

export function useGalerie() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async (): Promise<Photo[]> => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Photo[];
    },
  });
}

export function formatDateFr(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatHeureFr(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export function useMatch(id: string) {
  return useQuery({
    queryKey: ["match", id],
    queryFn: async (): Promise<Match | null> => {
      const { data, error } = await supabase.from("matches").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return (data ?? null) as Match | null;
    },
  });
}

/** Transforme un lien YouTube / Vimeo en adresse intégrable dans le site. */
export function lienVideoIntegrable(url: string): string | null {
  if (!url) return null;
  const youtube = url.match(/(?:youtu\.be\/|v=|youtube\.com\/embed\/)([\w-]{6,})/);
  if (youtube?.[1]) return `https://www.youtube.com/embed/${youtube[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo?.[1]) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export function matchJoue(match: Match) {
  return match.home_score !== null && match.away_score !== null;
}

export function resultatSiroco(match: Match): "victoire" | "nul" | "defaite" | null {
  if (!matchJoue(match)) return null;
  const domicile = match.home_team.toLowerCase().includes("siroco");
  const pour = domicile ? match.home_score! : match.away_score!;
  const contre = domicile ? match.away_score! : match.home_score!;
  if (pour > contre) return "victoire";
  if (pour === contre) return "nul";
  return "defaite";
}
