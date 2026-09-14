import { createFileRoute, Link } from "@tanstack/react-router";
import { Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import heroMatch from "@/assets/hero-match.jpg";

export const Route = createFileRoute("/equipes")({
  head: () => ({
    meta: [
      { title: "Nos équipes — Siroco Abymes" },
      { name: "description", content: "Des U6 aux seniors : toutes les équipes du Siroco des Abymes, leur championnat, leur encadrement et leurs horaires d’entraînement." },
      { property: "og:title", content: "Nos équipes — Siroco Abymes" },
      { property: "og:description", content: "Toutes les catégories du Siroco des Abymes, des U6 aux seniors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageEquipes,
});

const equipes = [
  { nom: "Seniors A", categorie: "Championnat régional", effectif: "24 joueurs", coach: "Staff seniors", horaires: "Mardi & jeudi — 18h30", objectif: "Jouer le haut de tableau et viser la montée." },
  { nom: "Seniors B", categorie: "Division départementale", effectif: "20 joueurs", coach: "Staff seniors", horaires: "Mardi & vendredi — 18h30", objectif: "Former la passerelle entre les U19 et l’équipe fanion." },
  { nom: "U19", categorie: "Championnat jeunes", effectif: "18 joueurs", coach: "Staff jeunes", horaires: "Lundi & mercredi — 17h30", objectif: "Préparer l’entrée dans le football senior." },
  { nom: "U17", categorie: "Championnat jeunes", effectif: "20 joueurs", coach: "Staff jeunes", horaires: "Mardi & jeudi — 17h00", objectif: "Consolider les bases tactiques et physiques." },
  { nom: "U15", categorie: "Championnat jeunes", effectif: "19 joueurs", coach: "Staff jeunes", horaires: "Mercredi & vendredi — 16h30", objectif: "Travail du jeu de position et de la prise d’information." },
  { nom: "U13", categorie: "Football d’animation", effectif: "22 joueurs", coach: "Éducateurs école de foot", horaires: "Mercredi — 15h00", objectif: "Plaisir de jouer et maîtrise technique individuelle." },
  { nom: "U11 / U9", categorie: "École de football", effectif: "30 enfants", coach: "Éducateurs école de foot", horaires: "Mercredi — 14h00", objectif: "Découverte du jeu à effectif réduit et plateaux du samedi." },
  { nom: "U7 / U6", categorie: "Baby foot", effectif: "25 enfants", coach: "Éducateurs école de foot", horaires: "Samedi — 9h00", objectif: "Premiers pas avec le ballon, motricité et jeux collectifs." },
];

const encadrement = [
  ["Éducateurs diplômés", "Chaque catégorie est encadrée par un éducateur titulaire d’un diplôme fédéral, secondé par un adjoint bénévole."],
  ["Suivi des joueurs", "Un bilan individuel est transmis aux familles deux fois par saison : progression technique, assiduité et comportement."],
  ["Équipement", "Le club fournit le jeu de maillots, les ballons et la trousse de secours. Le survêtement club est proposé à prix coûtant."],
];

function PageEquipes() {
  return (
    <SiteShell>
      <EnTetePage titre="Nos équipes" sousTitre="Huit catégories, un seul maillot. Chaque semaine, plus de 200 licenciés s’entraînent au Stade Municipal des Abymes." image={heroMatch} />
      <section className="mx-auto max-w-[1440px] px-5 py-14">
        <TitreSection>Toutes les catégories</TitreSection>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {equipes.map((equipe) => (
            <article key={equipe.nom} className="rounded-xl border border-border bg-secondary/40 p-5">
              <Shirt className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-impact text-xl uppercase">{equipe.nom}</h3>
              <p className="text-[11px] font-bold uppercase tracking-wide text-primary">{equipe.categorie}</p>
              <p className="mt-3 text-xs text-muted-foreground">Effectif : {equipe.effectif}</p>
              <p className="text-xs text-muted-foreground">Encadrement : {equipe.coach}</p>
              <p className="text-xs text-muted-foreground">Entraînements : {equipe.horaires}</p>
              <p className="mt-3 border-t border-border pt-3 text-xs italic leading-relaxed text-muted-foreground">{equipe.objectif}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {encadrement.map(([titre, texte]) => (
            <article key={titre} className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-impact text-lg uppercase text-primary">{titre}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{texte}</p>
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
