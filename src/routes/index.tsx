import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  ChevronDown,
  Clock3,
  Facebook,
  GraduationCap,
  Handshake,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Play,
  Search,
  Shirt,
  Trophy,
  UserRound,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/siroco-logo.png.asset.json";
import heroMatch from "@/assets/hero-match.jpg";
import newsAcademy from "@/assets/news-academy.jpg";
import newsSupporters from "@/assets/news-supporters.jpg";
import newsTeam from "@/assets/news-team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Siroco Abymes — Club de football en Guadeloupe" },
      { name: "description", content: "Le Siroco des Abymes : équipes, calendrier, actualités, galerie et inscriptions du club de football guadeloupéen." },
      { property: "og:title", content: "Siroco Abymes — Club de football" },
      { property: "og:description", content: "Toute l’actualité du Siroco des Abymes, club de football en Guadeloupe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Accueil,
});

const navigation = [
  ["#accueil", "Accueil"], ["#club", "Le club"], ["#equipes", "Équipes"],
  ["#actualites", "Actualités"], ["#calendrier", "Calendrier"], ["#galerie", "Médias"],
  ["#partenaires", "Partenaires"], ["#contact", "Contact"],
];

const raccourcis = [
  { href: "#club", label: "Le club", detail: "Notre histoire", icon: Users },
  { href: "#equipes", label: "Équipes", detail: "Des U6 aux seniors", icon: Shirt },
  { href: "#formation", label: "Formation", detail: "Préparer demain", icon: GraduationCap },
  { href: "#calendrier", label: "Calendrier", detail: "Prochains matchs", icon: CalendarDays },
  { href: "#galerie", label: "Photos / vidéos", detail: "Revivez nos moments", icon: Play },
  { href: "#partenaires", label: "Soutenir", detail: "Devenez partenaire", icon: Handshake },
];

const actualites = [
  { image: newsAcademy, date: "12 sept. 2025", titre: "Reprise des entraînements", texte: "Les équipes du Siroco ont repris le chemin des terrains pour la nouvelle saison !" },
  { image: newsTeam, date: "5 sept. 2025", titre: "Inscriptions saison 2025–2026", texte: "Les inscriptions sont ouvertes. Rejoignez la famille Siroco !" },
  { image: newsSupporters, date: "1 sept. 2025", titre: "Stage jeunes pendant les vacances", texte: "Un stage de perfectionnement est organisé du 20 au 24 octobre." },
];

const classement = [
  ["1", "Siroco Abymes", "9", "3", "+6"], ["2", "A.S. Rivière-Salée", "7", "3", "+4"],
  ["3", "C.S. Baie-Mahault", "6", "3", "+2"], ["4", "A.S. Gosier", "4", "3", "0"],
  ["5", "U.S. Sainte-Anne", "3", "3", "-1"],
];

const galerie = [heroMatch, newsTeam, newsAcademy, newsSupporters, heroMatch, newsTeam];

function TitreSection({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2.5"><span className="h-7 w-1.5 shrink-0 bg-primary" /><h2 className="font-impact text-[1.65rem] font-bold uppercase leading-none text-foreground">{children}</h2></div>;
}

function Accueil() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="bg-foreground text-primary-foreground">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-5 text-[10px]">
          <div className="flex items-center gap-5"><span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />Les Abymes, Guadeloupe</span><span className="hidden border-l border-primary-foreground/30 pl-5 sm:block">Plus qu’un club, une famille</span></div>
          <div className="flex h-full items-center gap-3"><Facebook className="hidden h-3.5 w-3.5 sm:block" /><Instagram className="hidden h-3.5 w-3.5 sm:block" /><Youtube className="hidden h-4 w-4 sm:block" /><Search className="h-3.5 w-3.5" /><a href="#contact" className="flex h-full items-center gap-2 bg-primary px-3 font-bold uppercase sm:px-4"><UserRound className="h-3.5 w-3.5" />Espace membre</a></div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[84px] max-w-[1440px] items-center px-5">
          <a href="#accueil" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-[68px] w-[68px] object-contain" />
            <div className="leading-none"><strong className="block font-impact text-[2rem] font-bold uppercase text-primary">Siroco</strong><span className="block text-center text-[9px] font-black uppercase tracking-[0.28em]">Abymes</span><span className="block text-center text-[6px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Depuis 1979</span></div>
          </a>
          <nav className="ml-auto hidden items-center gap-8 lg:flex">{navigation.map(([href, label], index) => <a key={href} href={href} className={`flex items-center gap-1 border-b-2 py-8 text-[11px] font-black uppercase transition-colors hover:text-primary ${index === 0 ? "border-primary text-primary" : "border-transparent"}`}>{label}{[1,2,5].includes(index) && <ChevronDown className="h-3 w-3" />}</a>)}</nav>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setMenuOuvert((value) => !value)} aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}>{menuOuvert ? <X /> : <Menu />}</Button>
        </div>
        {menuOuvert && <nav className="grid grid-cols-2 border-t border-border bg-background p-4 lg:hidden">{navigation.map(([href,label]) => <a key={href} href={href} onClick={() => setMenuOuvert(false)} className="py-3 text-xs font-bold uppercase">{label}</a>)}</nav>}
      </header>

      <main id="accueil">
        <section className="relative min-h-[510px] overflow-hidden bg-foreground lg:min-h-[590px]">
          <img src={heroMatch} alt="Joueurs du Siroco sur le terrain" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--foreground)_0%,color-mix(in_oklab,var(--foreground)_90%,transparent)_35%,color-mix(in_oklab,var(--foreground)_16%,transparent)_76%,color-mix(in_oklab,var(--foreground)_30%,transparent)_100%)]" />
          <div className="absolute inset-y-0 left-[43%] hidden w-24 -skew-x-12 bg-primary/55 mix-blend-multiply lg:block" />
          <div className="relative mx-auto flex min-h-[510px] max-w-[1440px] items-center px-6 lg:min-h-[590px] lg:px-12">
            <div className="w-full max-w-[660px] text-primary-foreground">
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.55em]">Club de football</p>
              <h1 className="font-brush text-[5.3rem] uppercase italic leading-[0.72] sm:text-[7rem] lg:text-[9.5rem]">Siroco<br /><span className="text-primary">Abymes</span></h1>
              <p className="mt-7 text-[11px] font-black uppercase tracking-[0.42em]">Passion · Respect · Formation</p>
              <div className="mt-7 h-1 w-40 -skew-x-12 bg-primary" />
              <div className="mt-7 flex gap-3">
                <Button asChild size="lg" className="h-12 min-w-44 skew-x-[-8deg] rounded-none uppercase"><a href="#club"><span className="skew-x-[8deg]">Notre club →</span></a></Button>
                <Button asChild variant="outline" size="lg" className="h-12 min-w-44 skew-x-[-8deg] rounded-none border-primary-foreground/60 bg-foreground/25 text-primary-foreground uppercase hover:bg-primary-foreground hover:text-foreground"><a href="#equipes"><span className="skew-x-[8deg]">Nos équipes →</span></a></Button>
              </div>
            </div>
            <p className="absolute right-8 top-12 hidden max-w-[250px] rotate-[-8deg] text-center font-hand text-4xl leading-tight text-foreground lg:block">« Fiers<br />de nos couleurs »<span className="mx-auto mt-2 block h-1 w-36 -skew-x-12 bg-primary" /></p>
            <p className="absolute bottom-12 right-8 hidden text-right text-[14px] font-black uppercase tracking-[0.35em] text-primary-foreground lg:block">Abymes<br />Territoire<br />Football<br />Passion</p>
          </div>
        </section>

        <nav className="bg-foreground text-primary-foreground"><div className="mx-auto grid max-w-[1440px] grid-cols-3 md:grid-cols-6">{raccourcis.map(({href,label,detail,icon:Icon}) => <a key={label} href={href} className="group flex min-h-28 skew-x-[-9deg] flex-col items-center justify-center border-r border-primary-foreground/20 px-2 text-center transition-colors hover:bg-primary"><div className="skew-x-[9deg]"><Icon className="mx-auto mb-2 h-7 w-7" /><span className="block text-xs font-black uppercase">{label}</span><span className="mt-1 hidden text-[9px] opacity-70 sm:block">{detail}</span></div></a>)}</div></nav>

        <section id="calendrier" className="relative border-b border-border py-7 lg:py-8">
          <div className="mx-auto grid max-w-[1440px] gap-7 px-5 lg:grid-cols-[1fr_1.02fr_0.88fr]">
            <article><TitreSection>Prochain match</TitreSection><div className="mt-4 bg-foreground p-6 text-primary-foreground shadow-lg"><p className="text-center text-[10px] font-bold uppercase tracking-wide text-primary">Championnat régional — Journée 3</p><div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center"><div><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-background p-1"><img src={logoAsset.url} alt="Siroco Abymes" className="h-full w-full object-contain" /></div><p className="mt-2 text-[11px] font-black uppercase">Siroco<br />Abymes</p></div><span className="font-impact text-3xl font-bold">VS</span><div><div className="mx-auto grid h-20 w-20 place-items-center border-2 border-primary bg-primary-deep font-impact text-xl font-bold">ASR</div><p className="mt-2 text-[11px] font-black uppercase">A.S. Rivière-<br />Salée</p></div></div><div className="space-y-2 border-t border-primary-foreground/15 pt-4 text-xs"><p className="flex items-center gap-3"><CalendarDays className="h-4 w-4" />Samedi 20 septembre 2025</p><p className="flex items-center gap-3"><Clock3 className="h-4 w-4" />16h00</p><p className="flex items-center gap-3"><MapPin className="h-4 w-4" />Stade municipal des Abymes</p></div><Button asChild className="mt-5 h-11 w-full rounded-full uppercase"><a href="#calendrier">Voir le calendrier <ArrowRight /></a></Button></div></article>
            <section id="actualites"><div className="flex items-center justify-between gap-3"><TitreSection>Dernières actualités</TitreSection><a href="#actualites" className="text-[9px] font-bold text-primary underline">Voir toutes les actualités →</a></div><div className="mt-4 space-y-3">{actualites.map((actu) => <article key={actu.titre} className="grid grid-cols-[132px_minmax(0,1fr)] gap-4 border-b border-border pb-3"><img src={actu.image} alt={actu.titre} loading="lazy" className="h-[88px] w-full object-cover" /><div className="self-center"><p className="text-[9px] text-muted-foreground">{actu.date}</p><h3 className="font-impact text-[15px] font-bold leading-tight">{actu.titre}</h3><p className="mt-1 text-[11px] leading-tight text-muted-foreground">{actu.texte}</p></div></article>)}</div></section>
            <section><div className="flex items-center justify-between"><TitreSection>Classement</TitreSection><a href="#calendrier" className="text-[9px] font-bold text-primary underline">Voir le classement →</a></div><table className="mt-4 w-full text-left text-[11px]"><thead className="bg-muted uppercase"><tr><th className="p-2">#</th><th className="p-2">Équipe</th><th className="p-2 text-center">Pts</th><th className="p-2 text-center">J</th><th className="p-2 text-center">Diff</th></tr></thead><tbody>{classement.map((ligne,index) => <tr key={ligne[1]} className={index === 0 ? "bg-secondary font-black text-primary" : "border-b border-border"}>{ligne.map((cell,i) => <td key={`${cell}-${i}`} className={`p-2 ${i > 1 ? "text-center" : ""}`}>{cell}</td>)}</tr>)}</tbody></table><blockquote className="mt-7 flex gap-3 text-xs leading-relaxed text-muted-foreground"><span className="font-display text-5xl font-black leading-none text-primary">“</span><span>Le football est un jeu simple :<br />22 joueurs, un ballon, et tout un peuple<br />derrière son équipe.</span></blockquote></section>
          </div>
        </section>

        <section id="club" className="relative overflow-hidden bg-foreground py-12 text-primary-foreground"><img src={newsTeam} alt="Les joueurs du Siroco réunis" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35" /><div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60" /><div className="relative mx-auto grid max-w-[1440px] gap-10 px-8 lg:grid-cols-[1fr_1.15fr] lg:items-center"><div><p className="font-hand -rotate-3 text-5xl leading-[0.9] sm:text-6xl">Ensemble,<br />toujours plus loin !</p><div className="mt-5 h-1 w-56 -skew-x-12 bg-primary" /></div><div className="grid grid-cols-3 gap-6">{[[Users,"200+","Licenciés"],[Trophy,"46","Années d’histoire"],[Heart,"1","Grande famille"]].map(([Icon,valeur,label]) => { const StatIcon = Icon as typeof Users; return <div key={String(label)} className="flex items-center gap-3"><StatIcon className="h-8 w-8 shrink-0 text-primary" /><div><strong className="font-impact text-3xl">{String(valeur)}</strong><span className="block text-[9px]">{String(label)}</span></div></div>; })}</div></div></section>

        <section id="galerie" className="py-7"><div className="mx-auto max-w-[1440px] px-5"><div className="flex items-center justify-between"><TitreSection>Galerie</TitreSection><div className="flex gap-7 text-[10px] font-black uppercase"><span className="border-b-2 border-primary pb-1 text-primary">Photos</span><span>Vidéos</span></div><a href="#galerie" className="hidden text-[9px] font-bold text-primary md:block">Voir toute la galerie →</a></div><div className="relative mt-4 grid grid-cols-2 gap-1.5 md:grid-cols-6"><Button variant="default" size="icon" className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full" aria-label="Images précédentes"><ArrowLeft /></Button>{galerie.map((image,index) => <img key={`${image}-${index}`} src={image} alt={`Galerie Siroco ${index + 1}`} loading="lazy" className="aspect-[1.45/1] h-full w-full object-cover" />)}<Button variant="default" size="icon" className="absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full" aria-label="Images suivantes"><ArrowRight /></Button></div></div></section>
      </main>

      <footer id="contact" className="bg-foreground text-primary-foreground"><div className="mx-auto grid max-w-[1440px] gap-8 px-7 py-10 md:grid-cols-[1.15fr_.8fr_.8fr_1.1fr_.7fr]"><div><div className="flex items-center gap-3"><img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-20 w-20 object-contain" /><div><strong className="font-impact text-2xl uppercase">Siroco</strong><span className="block text-[10px] font-black uppercase tracking-[0.25em]">Abymes</span></div></div><p className="mt-2 font-hand text-xl">Passionnément Siroco !</p></div><div><h2 className="text-xs font-black uppercase">Liens utiles</h2><div className="mt-4 grid text-[11px] opacity-75">{navigation.slice(1,7).map(([href,label]) => <a key={href} href={href}>{label}</a>)}</div></div><div><h2 className="text-xs font-black uppercase">Suivez-nous</h2><div className="mt-5 flex gap-5"><Facebook className="h-5 w-5" /><Instagram className="h-5 w-5" /><Youtube className="h-5 w-5" /></div></div><div><h2 className="text-xs font-black uppercase">Newsletter</h2><p className="mt-4 text-[10px] opacity-70">Restez informé de toute l’actualité du club !</p><div className="mt-3 flex h-10 border border-primary-foreground/15"><label htmlFor="email" className="sr-only">Votre email</label><input id="email" type="email" placeholder="Votre email" className="min-w-0 flex-1 bg-primary-foreground/10 px-3 text-xs outline-none" /><Button size="icon" className="h-full rounded-none" aria-label="S’inscrire à la newsletter"><Mail /></Button></div></div><div className="border-l border-primary-foreground/20 pl-6 font-impact text-lg uppercase tracking-[0.2em]">Passion<br />Respect<br />Formation<br />Solidarité<div className="mt-3 h-1 w-20 -skew-x-12 bg-primary" /></div></div><div className="border-t border-primary-foreground/15"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-7 py-5 text-[9px] opacity-60 sm:flex-row"><span>© {new Date().getFullYear()} Siroco Abymes — Tous droits réservés</span><span>Conçu aux Abymes, en Guadeloupe ♥</span></div></div></footer>
    </div>
  );
}