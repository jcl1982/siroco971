import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import newsAcademy from "@/assets/news-academy.jpg";

export const Route = createFileRoute("/formation")({
  head: () => ({
    meta: [
      { title: "Formation & école de foot — Siroco Abymes" },
      { name: "description", content: "L’école de football du Siroco des Abymes : encadrement diplômé, stages, parcours du joueur et inscriptions." },
      { property: "og:title", content: "Formation — Siroco Abymes" },
      { property: "og:description", content: "Le parcours de formation des jeunes joueurs du Siroco des Abymes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageFormation,
});

const piliers = [
  { titre: "Technique", texte: "Maîtrise du ballon, conduite, passe et finition travaillées à chaque séance." },
  { titre: "Collectif", texte: "Comprendre le jeu, occuper l’espace et jouer pour l’équipe avant tout." },
  { titre: "Éducation", texte: "Assiduité scolaire, respect et hygiène de vie font partie du contrat." },
];

function PageFormation() {
  return (
    <SiteShell>
      <EnTetePage titre="Formation" sousTitre="Préparer demain : l’école de football du Siroco accompagne chaque jeune, du premier ballon jusqu’à l’équipe première." image={newsAcademy} />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <TitreSection>Notre projet</TitreSection>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            L’école de football accueille les enfants dès 5 ans, encadrés par des éducateurs diplômés. Les séances sont adaptées à chaque âge et suivies tout au long de la saison, avec des plateaux, des tournois et des stages pendant les vacances scolaires.
          </p>
          <div className="mt-7 grid gap-4">
            {piliers.map((pilier) => (
              <div key={pilier.titre} className="flex gap-4 rounded-xl border border-border bg-secondary/40 p-4">
                <GraduationCap className="h-6 w-6 shrink-0 text-primary" />
                <div><h3 className="font-impact text-lg uppercase">{pilier.titre}</h3><p className="text-xs text-muted-foreground">{pilier.texte}</p></div>
              </div>
            ))}
          </div>
          <Button asChild className="btn-3d mt-8 h-12 rounded-md px-7 text-xs font-black uppercase"><Link to="/contact">Inscrire mon enfant →</Link></Button>
        </div>
        <img src={newsAcademy} alt="Jeunes joueurs à l’entraînement" loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover" />
      </section>
    </SiteShell>
  );
}
