import { createFileRoute, Link } from "@tanstack/react-router";
import { Handshake, Megaphone, Ticket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import { usePartenaires, useReglages, reglagesParDefaut } from "@/lib/site-content";
import { ImageSite } from "@/lib/image-stockage";
import newsSupporters from "@/assets/news-supporters.jpg";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Partenaires & sponsors — Siroco Abymes" },
      { name: "description", content: "Soutenez le Siroco des Abymes : formules de partenariat, visibilité au stade, déduction fiscale et accompagnement de la formation." },
      { property: "og:title", content: "Partenaires — Siroco Abymes" },
      { property: "og:description", content: "Devenez partenaire du Siroco des Abymes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PagePartenaires,
});

const formules = [
  { nom: "Supporter", prix: "150 €", avantages: ["Nom sur le site du club", "Invitation au match de gala", "Remerciement sur les réseaux sociaux"] },
  { nom: "Partenaire", prix: "600 €", avantages: ["Panneau publicitaire au stade sur la saison", "Logo sur le site et les affiches de match", "4 invitations par saison", "Photo de remise de maillots"] },
  { nom: "Partenaire majeur", prix: "Sur mesure", avantages: ["Logo sur les maillots de l’équipe première", "Visibilité sur tous les supports du club", "Événement entreprise au club-house", "Opération commune avec l’école de foot"] },
];

const raisons = [
  { icone: Users, titre: "Une audience locale", texte: "Plus de 200 licenciés, leurs familles et plusieurs centaines de spectateurs chaque week-end aux Abymes." },
  { icone: Megaphone, titre: "Une visibilité toute l’année", texte: "Stade, maillots, réseaux sociaux et site du club : votre marque est vue de septembre à juin." },
  { icone: Ticket, titre: "Un engagement utile", texte: "Votre soutien finance les équipements, les déplacements et la formation des éducateurs." },
];

function PagePartenaires() {
  const { data: reglages } = useReglages();
  const { data: partenaires } = usePartenaires();
  const intro = reglages?.["page_partenaires_intro"] ?? reglagesParDefaut["page_partenaires_intro"] ?? "";

  return (
    <SiteShell>
      <EnTetePage titre="Partenaires" sousTitre={intro} image={newsSupporters} />

      {(partenaires ?? []).length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 pt-14">
          <TitreSection>Ils soutiennent le club</TitreSection>
          <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-4">
            {(partenaires ?? []).map((partenaire) => (
              <article key={partenaire.id} className="rounded-xl border border-border bg-background p-4 text-center">
                {partenaire.logo_url
                  ? <ImageSite src={partenaire.logo_url} alt={partenaire.name} className="mx-auto h-20 w-full rounded-md object-contain" />
                  : <Handshake className="mx-auto h-8 w-8 text-primary" />}
                <strong className="mt-3 block font-impact text-base uppercase leading-tight">{partenaire.name}</strong>
                {partenaire.tier && <span className="text-[10px] uppercase tracking-wide text-primary">{partenaire.tier}</span>}
                {partenaire.description && <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{partenaire.description}</p>}
                {partenaire.website && (
                  <a href={partenaire.website} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[11px] font-bold uppercase text-primary underline">Site internet</a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1440px] px-5 py-14">
        <TitreSection>Pourquoi nous soutenir</TitreSection>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {raisons.map((raison) => (
            <article key={raison.titre} className="rounded-xl border border-border bg-secondary/40 p-6">
              <raison.icone className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-impact text-xl uppercase">{raison.titre}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{raison.texte}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-14">
        <div className="mx-auto max-w-[1440px] px-5">
          <TitreSection>Devenir partenaire</TitreSection>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {formules.map((formule) => (
              <article key={formule.nom} className="rounded-xl border border-border bg-background p-6">
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
          <div className="mt-8 rounded-xl border border-border bg-background p-6 text-xs leading-relaxed text-muted-foreground">
            <strong className="block font-impact text-base uppercase text-foreground">Comment ça se passe ?</strong>
            Vous prenez contact avec le club, nous convenons d’un rendez-vous au club-house, puis une convention de partenariat est signée pour la saison. Le club étant une association loi 1901, votre soutien peut ouvrir droit à une réduction d’impôt au titre du mécénat : demandez-nous le détail. Les montants indiqués sont donnés à titre d’exemple et peuvent être adaptés à votre budget.
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
