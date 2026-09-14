import { createFileRoute, Link } from "@tanstack/react-router";
import { Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import heroMatch from "@/assets/hero-match.jpg";

export const Route = createFileRoute("/equipes")({
  head: () => ({
    meta: [
      { title: "Nos équipes — Siroco Abymes" },
      { name: "description", content: "Des U6 aux seniors : toutes les équipes du Siroco des Abymes, leurs entraîneurs et leurs horaires d’entraînement." },
      { property: "og:title", content: "Nos équipes — Siroco Abymes" },
      { property: "og:description", content: "Toutes les catégories du Siroco des Abymes, des U6 aux seniors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageEquipes,
});

const equipes = [
  { nom: "Seniors A", categorie: "Championnat régional", coach: "Staff seniors", horaires: "Mardi & jeudi — 18h30" },
  { nom: "Seniors B", categorie: "Division départementale", coach: "Staff seniors", horaires: "Mardi & vendredi — 18h30" },
  { nom: "U19", categorie: "Championnat jeunes", coach: "Staff jeunes", horaires: "Lundi & mercredi — 17h30" },
  { nom: "U17", categorie: "Championnat jeunes", coach: "Staff jeunes", horaires: "Mardi & jeudi — 17h00" },
  { nom: "U15", categorie: "Championnat jeunes", coach: "Staff jeunes", horaires: "Mercredi & vendredi — 16h30" },
  { nom: "U13", categorie: "Football d’animation", coach: "Éducateurs école de foot", horaires: "Mercredi — 15h00" },
  { nom: "U11 / U9", categorie: "École de football", coach: "Éducateurs école de foot", horaires: "Mercredi — 14h00" },
  { nom: "U7 / U6", categorie: "Baby foot", coach: "Éducateurs école de foot", horaires: "Samedi — 9h00" },
];

function PageEquipes() {
  return (
    <SiteShell>
      <EnTetePage titre="Nos équipes" sousTitre="Huit catégories, un seul maillot. Chaque semaine, les équipes du Siroco s’entraînent au Stade Municipal des Abymes." image={heroMatch} />
      <section className="mx-auto max-w-[1440px] px-5 py-14">
        <TitreSection>Toutes les catégories</TitreSection>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {equipes.map((equipe) => (
            <article key={equipe.nom} className="rounded-xl border border-border bg-secondary/40 p-5">
              <Shirt className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-impact text-xl uppercase">{equipe.nom}</h3>
              <p className="text-[11px] font-bold uppercase tracking-wide text-primary">{equipe.categorie}</p>
              <p className="mt-3 text-xs text-muted-foreground">Encadrement : {equipe.coach}</p>
              <p className="text-xs text-muted-foreground">Entraînements : {equipe.horaires}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild className="btn-3d h-12 rounded-md px-7 text-xs font-black uppercase"><Link to="/contact">S’inscrire au club →</Link></Button>
          <Button asChild variant="outline" className="h-12 rounded-md px-7 text-xs font-black uppercase"><Link to="/calendrier">Voir le calendrier →</Link></Button>
        </div>
      </section>
    </SiteShell>
  );
}
