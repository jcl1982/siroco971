import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import { reglagesParDefaut, useReglages } from "@/lib/site-content";
import newsTeam from "@/assets/news-team.jpg";
import newsSupporters from "@/assets/news-supporters.jpg";

export const Route = createFileRoute("/club")({
  head: () => ({
    meta: [
      { title: "Le club — Siroco Abymes" },
      { name: "description", content: "Histoire, valeurs, organisation et chiffres clés du Siroco des Abymes, club de football guadeloupéen." },
      { property: "og:title", content: "Le club — Siroco Abymes" },
      { property: "og:description", content: "Découvrez l’histoire et les valeurs du Siroco des Abymes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageClub,
});

const valeurs = [
  { titre: "Passion", texte: "Le maillot vert se porte avec le cœur, du premier entraînement au coup de sifflet final." },
  { titre: "Respect", texte: "Arbitres, adversaires, bénévoles : le respect est la première règle de la maison." },
  { titre: "Formation", texte: "Former des joueurs et des citoyens, du foot d’animation jusqu’aux seniors." },
  { titre: "Solidarité", texte: "Une grande famille où chaque licencié compte, sur et en dehors du terrain." },
];

const etapes = [
  ["1979", "Naissance du club aux Abymes, porté par un groupe de passionnés du quartier."],
  ["1995", "Création de l’école de football et des premières catégories jeunes."],
  ["2010", "Structuration du club : encadrement diplômé, arbitres et section féminine."],
  ["Aujourd’hui", "Plus de 200 licenciés, des U6 aux seniors, et un projet tourné vers la formation."],
];

function PageClub() {
  const { data: reglages = reglagesParDefaut } = useReglages();
  return (
    <SiteShell>
      <EnTetePage titre="Le club" sousTitre="Depuis 1979, le Siroco des Abymes fait vivre le football guadeloupéen avec la même ambition : former, rassembler et gagner ensemble." image={newsTeam} />

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <TitreSection>Notre histoire</TitreSection>
          <div className="mt-6 space-y-6">
            {etapes.map(([annee, texte]) => (
              <div key={annee} className="grid grid-cols-[110px_minmax(0,1fr)] gap-5 border-b border-border pb-5">
                <strong className="font-impact text-2xl uppercase text-primary">{annee}</strong>
                <p className="text-sm leading-relaxed text-muted-foreground">{texte}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img src={newsSupporters} alt="Supporters du Siroco" loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
          <div className="mt-6 grid gap-4">
            {[[Users, reglages["stat_members"], reglages["stat_members_label"]], [Trophy, reglages["stat_years"], reglages["stat_years_label"]], [Heart, reglages["stat_family"], reglages["stat_family_label"]]].map(([Icon, valeur, label]) => {
              const StatIcon = Icon as typeof Users;
              return (
                <div key={String(label)} className="flex items-center gap-4 rounded-xl border border-border bg-secondary/60 p-4">
                  <StatIcon className="h-7 w-7 text-primary" />
                  <div><strong className="font-impact text-2xl leading-none">{String(valeur)}</strong><span className="block text-[11px] text-muted-foreground">{String(label)}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-14">
        <div className="mx-auto max-w-[1440px] px-5">
          <TitreSection>Nos valeurs</TitreSection>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {valeurs.map((valeur) => (
              <article key={valeur.titre} className="rounded-xl border border-border bg-background p-5">
                <h3 className="font-impact text-xl uppercase text-primary">{valeur.titre}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{valeur.texte}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild className="btn-3d h-12 rounded-md px-7 text-xs font-black uppercase"><Link to="/equipes">Nos équipes →</Link></Button>
            <Button asChild variant="outline" className="h-12 rounded-md px-7 text-xs font-black uppercase"><Link to="/contact">Nous contacter →</Link></Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
