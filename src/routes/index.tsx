import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CalendarDays, Camera, Clock3, GraduationCap, Heart, MapPin, Menu, Search, Shield, Shirt, Trophy, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const navigation = [
  ["#accueil", "Accueil"], ["#club", "Le club"], ["#equipes", "Équipes"],
  ["#actualites", "Actualités"], ["#calendrier", "Calendrier"], ["#galerie", "Médias"], ["#contact", "Contact"],
];

const raccourcis = [
  { href: "#club", label: "Le club", detail: "Notre histoire", icon: Users },
  { href: "#equipes", label: "Équipes", detail: "Du U6 aux seniors", icon: Shirt },
  { href: "#rejoindre", label: "Formation", detail: "Préparer demain", icon: GraduationCap },
  { href: "#calendrier", label: "Calendrier", detail: "Prochains matchs", icon: CalendarDays },
  { href: "#galerie", label: "Photos / vidéos", detail: "Revivez nos moments", icon: Camera },
  { href: "#contact", label: "Nous soutenir", detail: "Devenez partenaire", icon: Heart },
];

const actualites = [
  { image: newsAcademy, date: "10 septembre", titre: "Reprise des entraînements", texte: "Les jeunes ont retrouvé le terrain pour lancer une nouvelle saison." },
  { image: newsTeam, date: "5 septembre", titre: "Inscriptions saison 2025–2026", texte: "Les inscriptions sont ouvertes dans toutes les catégories." },
  { image: newsSupporters, date: "2 septembre", titre: "Le public prêt pour le derby", texte: "Une grande soirée de football se prépare aux Abymes." },
];

const classement = [
  ["1", "Siroco Abymes", "9", "+6"], ["2", "A.S. Rivière-Salée", "7", "+4"],
  ["3", "C.S. Baie-Mahault", "6", "+2"], ["4", "A.S. Gosier", "4", "0"], ["5", "U.S. Sainte-Anne", "3", "-1"],
];

const equipes = ["Seniors A", "Seniors B", "Féminines", "U17", "U15", "École de foot U7–U13"];

function TitreSection({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3"><span className="h-7 w-1.5 bg-accent" /><h2 className="font-impact text-2xl uppercase text-foreground sm:text-3xl">{children}</h2></div>;
}

function Accueil() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-foreground text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 text-[10px] sm:text-xs">
          <span className="flex min-w-0 items-center gap-1.5 truncate"><MapPin className="h-3 w-3 shrink-0 text-accent" /> Les Abymes, Guadeloupe</span>
          <span className="hidden italic opacity-75 sm:block">Plus qu'un club, une famille</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:flex">
          <a href="#accueil" className="flex min-w-0 items-center gap-3 lg:mr-8">
            <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-12 w-12 shrink-0 object-contain" />
            <span className="min-w-0 leading-none"><strong className="block truncate font-display text-xl font-black uppercase text-primary">Siroco</strong><span className="text-[9px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Abymes</span></span>
          </a>
          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">{navigation.map(([href,label]) => <a key={href} href={href} className="text-xs font-bold uppercase transition-colors hover:text-primary">{label}</a>)}</nav>
          <div className="flex shrink-0 items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Rechercher"><Search /></Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOuvert(v => !v)} aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOuvert}>{menuOuvert ? <X /> : <Menu />}</Button>
            <Button asChild className="hidden uppercase sm:inline-flex"><a href="#rejoindre">Nous rejoindre</a></Button>
          </div>
        </div>
        {menuOuvert && <nav className="grid grid-cols-2 border-t border-border bg-background p-4 lg:hidden">{navigation.map(([href,label]) => <a key={href} href={href} onClick={() => setMenuOuvert(false)} className="py-3 text-xs font-bold uppercase">{label}</a>)}</nav>}
      </header>

      <main id="accueil">
        <section className="relative min-h-[34rem] overflow-hidden bg-foreground lg:min-h-[37rem]">
          <img src={heroMatch} alt="Match de football aux Antilles" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/70 to-transparent" /><div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-foreground/90 to-transparent" />
          <div className="relative mx-auto flex min-h-[34rem] max-w-7xl items-end px-5 pb-12 pt-20 lg:min-h-[37rem] lg:items-center lg:pb-0">
            <div className="max-w-2xl text-primary-foreground">
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.42em]">Club de football · Les Abymes</p>
              <h1 className="font-impact text-7xl uppercase italic leading-[0.78] sm:text-8xl lg:text-[8rem]">Siroco<br /><span className="text-accent">Abymes</span></h1>
              <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] sm:text-xs">Passion · Respect · Formation</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-sm uppercase"><a href="#club">Notre club <ArrowRight /></a></Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-sm border-primary-foreground/50 bg-foreground/20 text-primary-foreground uppercase hover:bg-primary-foreground hover:text-foreground"><a href="#equipes">Nos équipes <ArrowRight /></a></Button>
              </div>
            </div>
            <p className="absolute right-5 top-20 hidden rotate-[-7deg] font-impact text-2xl italic text-primary-foreground lg:block">« Fiers de nos couleurs »</p>
          </div>
        </section>

        <nav className="bg-foreground text-primary-foreground"><div className="mx-auto grid max-w-7xl grid-cols-3 md:grid-cols-6">{raccourcis.map(({href,label,detail,icon:Icon}) => <a key={label} href={href} className="group flex min-h-28 flex-col items-center justify-center border-b border-r border-primary-foreground/10 px-2 text-center transition-colors hover:bg-primary"><Icon className="mb-2 h-6 w-6 text-accent transition-transform group-hover:-translate-y-1" /><span className="text-[10px] font-black uppercase sm:text-xs">{label}</span><span className="mt-1 hidden text-[9px] opacity-60 sm:block">{detail}</span></a>)}</div></nav>

        <section id="calendrier" className="border-b border-border py-14 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:gap-8">
            <article>
              <TitreSection>Prochain match</TitreSection>
              <div className="mt-5 rounded-md bg-foreground p-6 text-primary-foreground shadow-xl">
                <p className="text-center text-[10px] font-bold uppercase tracking-widest text-accent">Championnat régional · Journée 3</p>
                <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                  <div><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-background p-1"><img src={logoAsset.url} alt="Siroco" className="h-full w-full object-contain" /></div><p className="mt-3 text-[10px] font-black uppercase">Siroco<br />Abymes</p></div>
                  <span className="font-impact text-3xl italic text-accent">VS</span>
                  <div><div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-primary-foreground/20 bg-primary-deep"><Shield className="h-8 w-8 opacity-75" /></div><p className="mt-3 text-[10px] font-black uppercase">JS<br />Vieux-Habitants</p></div>
                </div>
                <div className="space-y-3 border-t border-primary-foreground/10 pt-5 text-xs"><p className="flex items-center gap-3"><CalendarDays className="text-accent" /> Samedi 20 septembre 2025</p><p className="flex items-center gap-3"><Clock3 className="text-accent" /> 17h00</p><p className="flex items-center gap-3"><MapPin className="text-accent" /> Stade municipal des Abymes</p></div>
                <Button asChild className="mt-6 h-11 w-full rounded-sm uppercase"><a href="#matchs">Voir le calendrier <ArrowRight /></a></Button>
              </div>
            </article>
            <section id="actualites">
              <div className="flex items-center justify-between gap-4"><TitreSection>Dernières actualités</TitreSection><a href="#actualites" className="shrink-0 text-[10px] font-black uppercase text-primary">Tout voir →</a></div>
              <div className="mt-5 divide-y divide-border">{actualites.map(actu => <article key={actu.titre} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 py-4 first:pt-0"><img src={actu.image} alt={actu.titre} loading="lazy" className="h-24 w-28 rounded-sm object-cover" /><div className="min-w-0 self-center"><p className="text-[9px] font-bold uppercase text-muted-foreground">{actu.date}</p><h3 className="mt-1 font-display text-sm font-black leading-tight">{actu.titre}</h3><p className="mt-1 text-xs leading-snug text-muted-foreground">{actu.texte}</p></div></article>)}</div>
            </section>
            <section><TitreSection>Classement</TitreSection><div className="mt-5 overflow-hidden rounded-md border border-border"><table className="w-full text-left text-[11px]"><thead className="bg-muted"><tr><th className="p-3">#</th><th className="p-3">Équipe</th><th className="p-3 text-center">Pts</th><th className="p-3 text-center">Diff</th></tr></thead><tbody className="divide-y divide-border">{classement.map((ligne,index) => <tr key={ligne[1]} className={index === 0 ? "bg-secondary font-black" : "bg-card"}><td className="p-3 text-primary">{ligne[0]}</td><td className="p-3">{ligne[1]}</td><td className="p-3 text-center">{ligne[2]}</td><td className="p-3 text-center">{ligne[3]}</td></tr>)}</tbody></table></div><blockquote className="mt-5 border-l-4 border-accent bg-muted p-4 text-sm italic text-muted-foreground">« Un ballon, onze joueurs et tout un peuple derrière son équipe. »</blockquote></section>
          </div>
        </section>

        <section id="club" className="relative overflow-hidden bg-foreground py-14 text-primary-foreground">
          <img src={newsTeam} alt="Les joueurs du Siroco réunis" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" /><div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.4fr_1fr] lg:items-center"><div><p className="font-impact text-4xl italic leading-tight sm:text-5xl">Ensemble,<br />toujours plus loin.</p><p className="mt-4 max-w-xl text-sm leading-relaxed opacity-75">Depuis 1962, le Siroco forme les jeunes, rassemble les familles et porte fièrement les couleurs des Abymes.</p></div><div className="grid grid-cols-3 gap-4">{[[Users,"380","Licenciés"],[Trophy,"62","Années"],[Heart,"1","Famille"]].map(([Icon,valeur,label]) => { const StatIcon=Icon as typeof Users; return <div key={String(label)} className="text-center"><StatIcon className="mx-auto h-6 w-6 text-accent" /><strong className="mt-2 block font-impact text-3xl">{String(valeur)}</strong><span className="text-[9px] uppercase opacity-60">{String(label)}</span></div>; })}</div></div>
        </section>

        <section id="equipes" className="bg-secondary py-14 lg:py-16"><div className="mx-auto max-w-7xl px-4"><TitreSection>Nos équipes</TitreSection><div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">{equipes.map(e => <div key={e} className="rounded-md border border-border bg-card p-5 text-center font-display text-xs font-black uppercase shadow-sm">{e}</div>)}</div></div></section>
        <section id="galerie" className="py-14 lg:py-16"><div className="mx-auto max-w-7xl px-4"><div className="flex items-end justify-between gap-4"><TitreSection>Galerie</TitreSection><span className="text-[10px] font-black uppercase text-primary">Photos · Vidéos</span></div><div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">{[heroMatch,newsAcademy,newsTeam,newsSupporters].map((image,index) => <img key={image} src={image} alt={["Match du Siroco","École de football","Équipe du Siroco","Supporters du Siroco"][index]} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover transition-transform hover:-translate-y-1" />)}</div></div></section>
        <section id="rejoindre" className="border-y border-border bg-muted py-14"><div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_auto] lg:items-center"><div><TitreSection>Rejoignez la famille</TitreSection><p className="mt-4 max-w-2xl text-sm text-muted-foreground">Les inscriptions sont ouvertes pour les jeunes, les seniors et les féminines. Venez rencontrer nos éducateurs au stade.</p></div><Button asChild size="lg" className="h-12 rounded-sm uppercase"><a href="#contact">Demander les informations <ArrowRight /></a></Button></div></section>
      </main>
      <footer id="contact" className="bg-foreground px-4 py-12 text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3"><div><img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-20 w-20 object-contain" /><p className="mt-3 font-impact text-2xl uppercase">Siroco Abymes</p><p className="mt-2 text-xs italic opacity-60">Passionnément Siroco.</p></div><div><h2 className="text-xs font-black uppercase text-accent">Contact</h2><p className="mt-4 text-sm opacity-70">Stade municipal des Abymes<br />97139 Les Abymes, Guadeloupe<br />0590 00 00 00<br />contact@siroco-abymes.fr</p></div><div><h2 className="text-xs font-black uppercase text-accent">Liens utiles</h2><div className="mt-4 grid grid-cols-2 gap-3 text-xs opacity-70">{navigation.slice(1).map(([href,label]) => <a key={href} href={href}>{label}</a>)}</div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-primary-foreground/10 pt-5 text-[10px] opacity-50">© {new Date().getFullYear()} Siroco des Abymes — Tous droits réservés</div></footer>
    </div>
  );
}
