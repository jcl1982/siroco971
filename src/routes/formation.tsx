import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import newsAcademy from "@/assets/news-academy.jpg";

export const Route = createFileRoute("/formation")({
  head: () => ({
    meta: [
      { title: "Formation & école de foot — Siroco Abymes" },
      { name: "description", content: "L’école de football du Siroco des Abymes : encadrement diplômé, parcours du joueur, stages vacances, tarifs et inscriptions." },
      { property: "og:title", content: "Formation — Siroco Abymes" },
      { property: "og:description", content: "Le parcours de formation des jeunes joueurs du Siroco des Abymes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageFormation,
});

const piliers = [
  { titre: "Technique", texte: "Maîtrise du ballon, conduite, passe et finition travaillées à chaque séance, avec des ateliers individualisés." },
  { titre: "Collectif", texte: "Comprendre le jeu, occuper l’espace, communiquer et jouer pour l’équipe avant tout." },
  { titre: "Éducation", texte: "Assiduité scolaire, respect de l’arbitre, hygiène de vie et entraide font partie du contrat signé en début de saison." },
];

const parcours = [
  ["U6 – U7", "Motricité, jeux avec ballon, découverte du terrain. Une séance par semaine le samedi matin."],
  ["U9 – U11", "Football à 5 puis à 8, plateaux du samedi, apprentissage des règles et de la vie de groupe."],
  ["U13", "Passage au football à 8 puis à 11, première compétition avec classement et travail tactique simple."],
  ["U15 – U17", "Championnat jeunes, préparation physique adaptée, suivi scolaire et premiers entraînements avec les seniors."],
  ["U19 – Seniors", "Intégration progressive à l’équipe B puis à l’équipe première pour les joueurs les plus assidus."],
];

const rendezvous = [
  ["Stages vacances", "Quatre stages par saison (Toussaint, Noël, Carnaval, Pâques), du lundi au vendredi de 8h30 à 12h30."],
  ["Plateaux du samedi", "Rencontres inter-clubs pour les catégories d’animation, en Grande-Terre et Basse-Terre."],
  ["Tournoi du club", "Le tournoi annuel du Siroco réunit chaque année une vingtaine d’équipes de l’archipel."],
];

function PageFormation() {
  return (
    <SiteShell>
      <EnTetePage titre="Formation" sousTitre="Préparer demain : l’école de football du Siroco accompagne chaque jeune, du premier ballon jusqu’à l’équipe première." image={newsAcademy} />

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <TitreSection>Notre projet</TitreSection>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            L’école de football accueille les enfants dès 5 ans, encadrés par des éducateurs diplômés. Les séances sont adaptées à chaque âge et suivies tout au long de la saison, avec des plateaux, des tournois et des stages pendant les vacances scolaires. L’objectif du club est clair : former des joueurs formés aux Abymes, capables de rejoindre l’équipe première.
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

      <section className="bg-secondary/50 py-14">
        <div className="mx-auto max-w-[1440px] px-5">
          <TitreSection>Le parcours du joueur</TitreSection>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {parcours.map(([age, texte]) => (
              <article key={age} className="rounded-xl border border-border bg-background p-5">
                <h3 className="font-impact text-lg uppercase text-primary">{age}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <TitreSection>Les rendez-vous de la saison</TitreSection>
          <div className="mt-6 grid gap-4">
            {rendezvous.map(([titre, texte]) => (
              <div key={titre} className="rounded-xl border border-border bg-secondary/40 p-5">
                <h3 className="font-impact text-lg uppercase">{titre}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{texte}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background p-6">
          <h3 className="font-impact text-xl uppercase">S’inscrire à l’école de foot</h3>
          <ul className="mt-4 grid gap-2 text-xs leading-relaxed text-muted-foreground">
            <li>• Permanence inscriptions : mercredi 14h–18h et samedi 9h–12h au club-house.</li>
            <li>• Pièces à fournir : certificat médical de moins de 3 mois, photo d’identité, copie d’une pièce d’identité, autorisation parentale.</li>
            <li>• Cotisation à partir de 90 € par saison, paiement possible en trois fois.</li>
            <li>• Deux séances d’essai gratuites avant toute inscription définitive.</li>
          </ul>
          <Button asChild variant="outline" className="mt-6 h-12 w-full rounded-md text-xs font-black uppercase"><Link to="/contact">Poser une question →</Link></Button>
        </div>
      </section>
    </SiteShell>
  );
}
