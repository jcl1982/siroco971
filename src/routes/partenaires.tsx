import { createFileRoute, Link } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import newsSupporters from "@/assets/news-supporters.jpg";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Partenaires & sponsors — Siroco Abymes" },
      { name: "description", content: "Soutenez le Siroco des Abymes : formules de partenariat, visibilité au stade et accompagnement de la formation." },
      { property: "og:title", content: "Partenaires — Siroco Abymes" },
      { property: "og:description", content: "Devenez partenaire du Siroco des Abymes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PagePartenaires,
});

const formules = [
  { nom: "Supporter", prix: "150 €", avantages: ["Nom sur le site du club", "Invitation au match de gala", "Remerciement sur les réseaux"] },
  { nom: "Partenaire", prix: "600 €", avantages: ["Panneau publicitaire au stade", "Logo sur le site et les affiches", "4 invitations par saison"] },
  { nom: "Partenaire majeur", prix: "Sur mesure", avantages: ["Logo sur les maillots", "Visibilité sur tous les supports", "Événement entreprise au club"] },
];

function PagePartenaires() {
  return (
    <SiteShell>
      <EnTetePage titre="Partenaires" sousTitre="Le Siroco avance grâce à celles et ceux qui le soutiennent. Associez votre image à un club formateur, ancré dans les Abymes." image={newsSupporters} />
      <section className="mx-auto max-w-[1440px] px-5 py-14">
        <TitreSection>Devenir partenaire</TitreSection>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {formules.map((formule) => (
            <article key={formule.nom} className="rounded-xl border border-border bg-secondary/40 p-6">
              <Handshake className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-impact text-2xl uppercase">{formule.nom}</h3>
              <p className="font-impact text-xl text-primary">{formule.prix}</p>
              <ul className="mt-4 grid gap-2 text-xs text-muted-foreground">
                {formule.avantages.map((avantage) => <li key={avantage}>• {avantage}</li>)}
              </ul>
              <Button asChild className="btn-3d mt-6 h-11 w-full rounded-md text-[11px] font-black uppercase"><Link to="/contact">Nous contacter →</Link></Button>
            </article>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">Les montants indiqués sont donnés à titre d’exemple : contactez le club pour construire un partenariat adapté.</p>
      </section>
    </SiteShell>
  );
}
