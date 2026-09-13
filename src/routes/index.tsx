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
  { href: "#avenir", label: "Matchs à venir" },
  { href: "#actualites", label: "Actualités" },
  { href: "#club", label: "Le club" },
  { href: "#equipes", label: "Équipes" },
  { href: "#calendrier", label: "Calendrier" },
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
        {/* Bandeau d'accueil — NFL Impact Broadcast */}
        <section className="relative flex min-h-[38rem] flex-col justify-end overflow-hidden bg-primary-deep md:min-h-[42rem]">
          <img
            src={heroMatch}
            alt="Match de football du Siroco des Abymes au coucher du soleil"
            width={1920}
            height={1200}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/70 to-transparent" />
          {/* Texture broadcast */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              background:
                "linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%), linear-gradient(90deg, rgba(255,0,0,0.05), rgba(0,255,0,0.02), rgba(0,0,255,0.05))",
              backgroundSize: "100% 4px, 3px 100%",
            }}
          />

          {/* Marque en haut */}
          <div className="absolute left-6 right-6 top-24 z-20 flex items-start justify-between md:left-12 md:right-12">
            <div className="h-16 w-16 rounded-full border-2 border-accent bg-background p-1 md:h-20 md:w-20">
              <img
                src={logoAsset.url}
                alt="Logo du Siroco des Abymes"
                className="h-full w-full rounded-full object-contain"
              />
            </div>
            <span className="-skew-x-12 bg-accent px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-accent-foreground">
              <span className="block skew-x-12">Saison 2026</span>
            </span>
          </div>

          {/* Contenu principal */}
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 md:px-12 md:pb-20">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-accent" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-foreground">
                Les Abymes · Guadeloupe · Depuis 1962
              </span>
            </div>

            <div className="relative mb-8">
              <span
                aria-hidden
                className="absolute -left-4 -top-10 select-none font-[family-name:var(--font-impact)] text-8xl uppercase italic leading-none text-primary-foreground/5 md:text-[10rem]"
              >
                Siroco
              </span>
              <h1 className="font-[family-name:var(--font-impact)] text-6xl uppercase italic leading-[0.9] tracking-tighter text-primary-foreground drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] sm:text-8xl md:text-9xl">
                Siroco
                <br />
                <span className="text-accent">des Abymes</span>
              </h1>
            </div>

            <p className="mb-10 max-w-md border-l-4 border-accent pl-5 text-base font-medium leading-snug text-primary-foreground/90 sm:text-lg">
              L'élite du football guadeloupéen. Forgés dans l'effort, unis pour la victoire.
            </p>

            <div className="flex max-w-xl flex-col gap-4 sm:flex-row">
              <a
                href="#rejoindre"
                className="group flex flex-1 -skew-x-12 items-center justify-center bg-primary-foreground py-4 transition-colors hover:bg-accent"
              >
                <span className="flex skew-x-12 items-center gap-2 font-[family-name:var(--font-impact)] text-xl uppercase text-primary-deep">
                  Nous rejoindre
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a
                href="#calendrier"
                className="flex flex-1 -skew-x-12 items-center justify-center border-2 border-primary-foreground/30 bg-primary-deep/40 py-4 backdrop-blur-sm transition-colors hover:bg-primary-foreground/10"
              >
                <span className="skew-x-12 font-[family-name:var(--font-impact)] text-xl uppercase text-primary-foreground">
                  Voir le calendrier
                </span>
              </a>
            </div>
          </div>

          {/* Bandeau bas */}
          <div className="absolute bottom-0 left-0 z-10 flex h-1.5 w-full">
            <span className="h-full flex-1 bg-accent" />
            <span className="h-full flex-1 bg-primary-foreground" />
            <span className="h-full flex-1 bg-primary" />
          </div>
        </section>

        {/* Prochain match & matchs à venir — mis en avant */}
        <section id="avenir" className="border-b border-border bg-primary-deep">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-accent" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
                Matchs à venir
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              {/* Prochain match — bloc vedette */}
              <article className="relative overflow-hidden rounded-sm border-2 border-accent bg-primary p-8 md:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-12 select-none font-[family-name:var(--font-impact)] text-[8rem] uppercase italic leading-none text-primary-foreground/5"
                >
                  VS
                </div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-accent">
                  Prochain match · {prochain.competition}
                </p>
                <p className="mt-3 font-[family-name:var(--font-impact)] text-2xl uppercase italic text-primary-foreground/80">
                  {prochain.date}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex-1 text-right">
                    <p className="font-[family-name:var(--font-impact)] text-3xl uppercase italic leading-none text-primary-foreground sm:text-4xl">
                      Siroco
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wide text-primary-foreground/60">
                      Les Abymes
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-impact)] text-3xl italic text-accent sm:text-4xl">
                    VS
                  </span>
                  <div className="flex-1">
                    <p className="font-[family-name:var(--font-impact)] text-3xl uppercase italic leading-none text-primary-foreground sm:text-4xl">
                      {prochain.adversaire}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wide text-primary-foreground/60">
                      {prochain.lieu}
                    </p>
                  </div>
                </div>
                <a
                  href="#calendrier"
                  className="mt-8 inline-flex -skew-x-12 bg-accent px-6 py-3 transition-opacity hover:opacity-90"
                >
                  <span className="skew-x-12 font-[family-name:var(--font-impact)] text-sm uppercase tracking-wide text-accent-foreground">
                    Voir le calendrier
                  </span>
                </a>
              </article>

              {/* Autres matchs à venir */}
              <div className="rounded-sm border border-primary-foreground/15 bg-primary/40 p-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground/70">
                  À suivre
                </h3>
                <ul className="mt-5 space-y-5">
                  {matchs.slice(1).map((m) => (
                    <li key={m.date} className="border-l-2 border-accent/60 pl-4">
                      <p className="text-[11px] font-black uppercase tracking-wide text-accent">
                        {m.date}
                      </p>
                      <p className="mt-1 font-[family-name:var(--font-impact)] text-lg uppercase italic text-primary-foreground">
                        {m.adversaire}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-primary-foreground/60">
                        {m.lieu} · {m.competition}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Actualités — mise en avant */}
        <section id="actualites" className="border-b border-border bg-secondary py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-accent" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
                Dernières actus
              </span>
            </div>
            <h2 className="section-title text-3xl text-primary sm:text-4xl">Actualités</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {actus.map((a) => (
                <article key={a.titre} className="overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-lg">
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
