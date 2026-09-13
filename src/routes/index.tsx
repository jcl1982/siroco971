import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "@/assets/siroco-logo.png.asset.json";
import heroMatch from "@/assets/hero-match.jpg";
import newsAcademy from "@/assets/news-academy.jpg";
import newsSupporters from "@/assets/news-supporters.jpg";
import newsTeam from "@/assets/news-team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Siroco des Abymes — Club de football en Guadeloupe" },
      {
        name: "description",
        content:
          "Site officiel du Siroco des Abymes : équipes, calendrier et résultats, actualités, école de foot et inscriptions.",
      },
      { property: "og:title", content: "Siroco des Abymes — Club de football en Guadeloupe" },
      {
        property: "og:description",
        content:
          "Équipes, calendrier, résultats et inscriptions du Siroco des Abymes, club de football guadeloupéen.",
      },
    ],
  }),
  component: Accueil,
});

const nav = [
  { href: "#club", label: "Le club" },
  { href: "#equipes", label: "Équipes" },
  { href: "#calendrier", label: "Calendrier" },
  { href: "#actualites", label: "Actualités" },
  { href: "#rejoindre", label: "Nous rejoindre" },
  { href: "#contact", label: "Contact" },
];

const chiffres = [
  { valeur: "380", label: "licenciés" },
  { valeur: "9", label: "équipes engagées" },
  { valeur: "1962", label: "année de création" },
  { valeur: "3", label: "terrains d'entraînement" },
];

const equipes = [
  { nom: "Seniors A", niveau: "Régional 1", entrainement: "Mardi & jeudi — 18h30" },
  { nom: "Seniors B", niveau: "Départemental", entrainement: "Mercredi & vendredi — 19h" },
  { nom: "Féminines", niveau: "Régional féminin", entrainement: "Lundi & jeudi — 18h" },
  { nom: "U17", niveau: "Championnat régional", entrainement: "Mardi & vendredi — 17h30" },
  { nom: "U15", niveau: "Championnat départemental", entrainement: "Mercredi & vendredi — 17h" },
  { nom: "École de foot U7–U13", niveau: "Plateaux et tournois", entrainement: "Mercredi & samedi — 9h" },
];

const resultats = [
  { date: "07 sept.", dom: "Siroco des Abymes", ext: "CS Moulien", score: "2 – 1", lieu: "Domicile" },
  { date: "31 août", dom: "Racing Club", ext: "Siroco des Abymes", score: "0 – 0", lieu: "Extérieur" },
  { date: "24 août", dom: "Siroco des Abymes", ext: "Solidarité Scolaire", score: "3 – 2", lieu: "Domicile" },
];

const matchs = [
  { date: "Sam. 20 sept. — 17h", adversaire: "JS Vieux-Habitants", lieu: "Domicile", competition: "Régional 1" },
  { date: "Dim. 28 sept. — 16h", adversaire: "Étoile de Morne-à-l'Eau", lieu: "Extérieur", competition: "Régional 1" },
  { date: "Sam. 04 oct. — 18h", adversaire: "Phare du Gosier", lieu: "Domicile", competition: "Coupe de Guadeloupe" },
];

const actus = [
  {
    image: newsAcademy,
    date: "10 septembre",
    titre: "L'école de foot fait le plein pour la rentrée",
    texte: "Plus de 120 enfants ont repris le chemin du terrain, encadrés par nos éducateurs diplômés.",
  },
  {
    image: newsSupporters,
    date: "02 septembre",
    titre: "Une ambiance de feu pour le derby",
    texte: "Le public des Abymes a poussé les Seniors A jusqu'au bout d'un derby à haute intensité.",
  },
  {
    image: newsTeam,
    date: "24 août",
    titre: "Présentation de l'effectif 2025-2026",
    texte: "Quatre recrues rejoignent le groupe professionnel du club pour viser le haut du tableau.",
  },
];

function Accueil() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#accueil" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-12 w-12 object-contain" />
            <span className="leading-tight">
              <span className="block font-display text-lg font-black uppercase tracking-wide text-primary">
                Siroco
              </span>
              <span className="block text-xs uppercase tracking-[0.25em] text-muted-foreground">Abymes</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#rejoindre"
            className="hidden rounded-sm bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90 lg:inline-block"
          >
            S'inscrire
          </a>

          <button
            type="button"
            onClick={() => setMenuOuvert((v) => !v)}
            aria-expanded={menuOuvert}
            aria-label="Ouvrir le menu"
            className="rounded-sm border border-border px-3 py-2 text-sm font-semibold uppercase lg:hidden"
          >
            Menu
          </button>
        </div>

        {menuOuvert && (
          <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOuvert(false)}
                className="block py-2 text-sm font-semibold uppercase tracking-wide text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="accueil">
        {/* Bandeau d'accueil */}
        <section className="relative">
          <img
            src={heroMatch}
            alt="Match de football du Siroco des Abymes au coucher du soleil"
            width={1920}
            height={1200}
            className="h-[32rem] w-full object-cover md:h-[38rem]"
          />
          <div className="absolute inset-0 bg-primary-deep/75" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-6xl px-4">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground/80">
                  Les Abymes · Guadeloupe · Depuis 1962
                </p>
                <h1 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] text-primary-foreground sm:text-6xl">
                  Siroco des Abymes
                </h1>
                <p className="mt-5 max-w-xl text-base text-primary-foreground/90 sm:text-lg">
                  Un club de quartier, une famille de passionnés. Du premier ballon de l'école de foot
                  jusqu'aux soirées de championnat, on joue ensemble, on gagne ensemble.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#rejoindre"
                    className="rounded-sm bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    Nous rejoindre
                  </a>
                  <a
                    href="#calendrier"
                    className="rounded-sm border-2 border-primary-foreground/60 px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  >
                    Voir le calendrier
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Le club */}
        <section id="club" className="crescent-bg border-b border-border py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h2 className="section-title text-3xl text-primary sm:text-4xl">Le club</h2>
                <p className="mt-6 text-lg text-foreground">
                  Né aux Abymes, le Siroco porte les couleurs de son quartier sur tous les terrains de
                  l'archipel. Le vert du blason, le croissant et les joueurs en pleine action disent
                  l'essentiel : ici, on forme, on transmet et on se bat sur chaque ballon.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Le club accueille les enfants dès 5 ans, accompagne les jeunes vers la compétition et
                  fait vivre ses équipes seniors et féminines tout au long de la saison. Éducateurs
                  diplômés, bénévoles et parents forment le socle du projet.
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {["Formation", "Respect", "Fierté locale"].map((valeur) => (
                    <li
                      key={valeur}
                      className="rounded-sm border-l-4 border-accent bg-card px-4 py-3 font-display text-sm font-bold uppercase tracking-wide text-foreground"
                    >
                      {valeur}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 self-start">
                {chiffres.map((c) => (
                  <div key={c.label} className="rounded-sm bg-primary px-5 py-7 text-center">
                    <p className="font-display text-4xl font-black text-primary-foreground">{c.valeur}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-primary-foreground/80">
                      {c.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Équipes */}
        <section id="equipes" className="border-b border-border bg-secondary py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="section-title text-3xl text-primary sm:text-4xl">Nos équipes</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Neuf équipes engagées, de l'école de foot aux seniors, filles et garçons.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {equipes.map((e) => (
                <article
                  key={e.nom}
                  className="rounded-sm border border-border bg-card p-6 transition-shadow hover:shadow-lg"
                >
                  <h3 className="font-display text-xl font-bold uppercase text-foreground">{e.nom}</h3>
                  <p className="mt-2 text-sm font-semibold text-primary">{e.niveau}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{e.entrainement}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Calendrier & résultats */}
        <section id="calendrier" className="border-b border-border py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="section-title text-3xl text-primary sm:text-4xl">Calendrier & résultats</h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Derniers résultats
                </h3>
                <ul className="mt-4 divide-y divide-border rounded-sm border border-border bg-card">
                  {resultats.map((r) => (
                    <li key={r.date} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {r.date} · {r.lieu}
                        </p>
                        <p className="mt-1 font-semibold text-foreground">
                          {r.dom} <span className="text-muted-foreground">vs</span> {r.ext}
                        </p>
                      </div>
                      <span className="rounded-sm bg-primary px-3 py-1.5 font-display text-base font-black text-primary-foreground">
                        {r.score}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Prochains matchs
                </h3>
                <ul className="mt-4 divide-y divide-border rounded-sm border border-border bg-card">
                  {matchs.map((m) => (
                    <li key={m.date} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {m.date} · {m.competition}
                        </p>
                        <p className="mt-1 font-semibold text-foreground">Siroco — {m.adversaire}</p>
                      </div>
                      <span className="rounded-sm border border-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-foreground">
                        {m.lieu}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Actualités */}
        <section id="actualites" className="border-b border-border bg-secondary py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="section-title text-3xl text-primary sm:text-4xl">Actualités</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {actus.map((a) => (
                <article key={a.titre} className="overflow-hidden rounded-sm border border-border bg-card">
                  <img
                    src={a.image}
                    alt={a.titre}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-52 w-full object-cover"
                  />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                      {a.date}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold uppercase leading-snug text-foreground">
                      {a.titre}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">{a.texte}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Nous rejoindre */}
        <section id="rejoindre" className="bg-primary py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="section-title text-3xl text-primary-foreground sm:text-4xl">Nous rejoindre</h2>
                <p className="mt-5 text-primary-foreground/90">
                  Les inscriptions sont ouvertes toute la saison, dans la limite des places disponibles.
                  Venez au club le mercredi de 15h à 18h ou le samedi matin pour rencontrer les éducateurs.
                </p>
                <ul className="mt-8 space-y-3 text-primary-foreground/90">
                  <li>• Fiche d'inscription remplie et signée</li>
                  <li>• Certificat médical de moins de 6 mois</li>
                  <li>• Photo d'identité et copie d'une pièce d'identité</li>
                  <li>• Cotisation annuelle (paiement en trois fois possible)</li>
                </ul>
              </div>
              <div className="rounded-sm bg-card p-8">
                <h3 className="font-display text-xl font-bold uppercase text-foreground">
                  Horaires d'entraînement
                </h3>
                <dl className="mt-6 space-y-4 text-sm">
                  {[
                    ["Lundi", "Féminines — 18h00"],
                    ["Mardi", "Seniors A & U17 — 17h30"],
                    ["Mercredi", "École de foot & Seniors B — 9h / 19h"],
                    ["Jeudi", "Seniors A & Féminines — 18h30"],
                    ["Vendredi", "U15, U17, Seniors B — 17h"],
                    ["Samedi", "École de foot — 9h"],
                  ].map(([jour, detail]) => (
                    <div key={jour} className="flex justify-between gap-4 border-b border-border pb-3">
                      <dt className="font-semibold text-foreground">{jour}</dt>
                      <dd className="text-right text-muted-foreground">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="section-title text-3xl text-primary sm:text-4xl">Contact</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-sm border border-border bg-card p-6">
                <h3 className="font-display text-base font-bold uppercase text-foreground">Stade</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Stade municipal des Abymes
                  <br />
                  97139 Les Abymes, Guadeloupe
                </p>
              </div>
              <div className="rounded-sm border border-border bg-card p-6">
                <h3 className="font-display text-base font-bold uppercase text-foreground">Téléphone</h3>
                <p className="mt-3 text-sm text-muted-foreground">0590 00 00 00</p>
                <p className="text-sm text-muted-foreground">Du lundi au samedi, 9h – 18h</p>
              </div>
              <div className="rounded-sm border border-border bg-card p-6">
                <h3 className="font-display text-base font-bold uppercase text-foreground">E-mail</h3>
                <p className="mt-3 text-sm text-muted-foreground">contact@siroco-abymes.fr</p>
                <p className="text-sm text-muted-foreground">Réponse sous 48h</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-primary-deep py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-10 w-10 object-contain" />
            <p className="font-display text-sm font-bold uppercase tracking-wide text-primary-foreground">
              Siroco des Abymes
            </p>
          </div>
          <p className="text-xs text-primary-foreground/70">
            © {new Date().getFullYear()} Siroco des Abymes — Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}
