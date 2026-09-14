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
import {
  reglagesParDefaut,
  useActualites,
  useClassement,
  useGalerie,
  useMatchs,
  useReglages,
  formatDateFr,
  formatHeureFr,
} from "@/lib/site-content";
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
  const { data: reglages = reglagesParDefaut } = useReglages();
  const { data: actualitesDb } = useActualites();
  const { data: matchsDb } = useMatchs();
  const { data: classementDb } = useClassement();
  const { data: galerieDb } = useGalerie();

  const imagesDefaut = [newsAcademy, newsTeam, newsSupporters];
  const listeActualites = (actualitesDb ?? []).length
    ? (actualitesDb ?? []).slice(0, 3).map((actu, index) => ({
        image: actu.image_url || imagesDefaut[index % imagesDefaut.length]!,
        date: new Date(actu.published_on).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }),
        titre: actu.title,
        texte: actu.excerpt,
      }))
    : actualites;

  const maintenant = Date.now();
  const prochainMatch =
    (matchsDb ?? []).find((match) => new Date(match.kickoff).getTime() >= maintenant) ?? (matchsDb ?? [])[0];

  const listeClassement = (classementDb ?? []).length
    ? (classementDb ?? []).map((ligne) => [String(ligne.position), ligne.team, String(ligne.points), String(ligne.played), ligne.goal_diff])
    : classement;

  const listeGalerie = (galerieDb ?? []).filter((photo) => photo.image_url).length
    ? (galerieDb ?? []).filter((photo) => photo.image_url).map((photo) => photo.image_url)
    : galerie;

  const [heroLigne1, ...heroReste] = (reglages["hero_title"] ?? "Siroco Abymes").split(" ");
  const heroLigne2 = heroReste.join(" ");


  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="bg-foreground text-primary-foreground">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-5 text-[10px]">
          <div className="flex items-center gap-5"><span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{reglages["topbar_location"]}</span><span className="hidden border-l border-primary-foreground/30 pl-5 sm:block">{reglages["topbar_slogan"]}</span></div>
          <div className="flex h-full items-center gap-3"><a href={reglages["social_facebook"] || "#contact"} aria-label="Facebook"><Facebook className="hidden h-3.5 w-3.5 sm:block" /></a><a href={reglages["social_instagram"] || "#contact"} aria-label="Instagram"><Instagram className="hidden h-3.5 w-3.5 sm:block" /></a><a href={reglages["social_youtube"] || "#contact"} aria-label="YouTube"><Youtube className="hidden h-4 w-4 sm:block" /></a><Search className="h-3.5 w-3.5" /><a href="/auth" className="flex h-full items-center gap-2 bg-primary px-3 font-bold uppercase shadow-md sm:px-4"><UserRound className="h-3.5 w-3.5" />Espace membre</a></div>
        </div>
      </div>

      <header className="header-shade sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[84px] max-w-[1440px] items-center px-5">
          <a href="#accueil" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-[68px] w-[68px] object-contain" />
            <div className="leading-none"><strong className="block font-impact text-[2rem] font-bold uppercase text-primary">{reglages["club_name"]}</strong><span className="block text-center text-[9px] font-black uppercase tracking-[0.28em]">{reglages["club_city"]}</span><span className="block text-center text-[6px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{reglages["club_since"]}</span></div>
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
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.55em]">{reglages["hero_subtitle"]}</p>
              <h1 className="font-brush text-[5.3rem] uppercase italic leading-[0.72] sm:text-[7rem] lg:text-[9.5rem]">{heroLigne1}<br /><span className="text-primary">{heroLigne2}</span></h1>
              <p className="mt-7 text-[11px] font-black uppercase tracking-[0.42em]">{reglages["hero_tagline"]}</p>
              <div className="mt-7 h-1 w-40 -skew-x-12 bg-primary" />
              <div className="mt-7 flex gap-3">
                <Button asChild size="lg" className="btn-3d h-12 min-w-44 skew-x-[-8deg] rounded-md uppercase"><a href="#club"><span className="skew-x-[8deg]">Notre club →</span></a></Button>
                <Button asChild variant="outline" size="lg" className="h-12 min-w-44 skew-x-[-8deg] rounded-md border-primary-foreground/60 bg-foreground/25 text-primary-foreground uppercase hover:bg-primary-foreground hover:text-foreground"><a href="#equipes"><span className="skew-x-[8deg]">Nos équipes →</span></a></Button>
              </div>
            </div>
            <p className="absolute right-8 top-12 hidden max-w-[250px] rotate-[-8deg] text-center font-hand text-4xl leading-tight text-foreground lg:block">« {reglages["hero_quote"]} »<span className="mx-auto mt-2 block h-1 w-36 -skew-x-12 bg-primary" /></p>
            <p className="absolute bottom-12 right-8 hidden text-right text-[14px] font-black uppercase tracking-[0.35em] text-primary-foreground lg:block">Abymes<br />Territoire<br />Football<br />Passion</p>
          </div>
        </section>

        <nav className="bg-foreground text-primary-foreground"><div className="mx-auto grid max-w-[1440px] grid-cols-3 md:grid-cols-6">{raccourcis.map(({href,label,detail,icon:Icon}) => <a key={label} href={href} className="group flex min-h-28 skew-x-[-9deg] flex-col items-center justify-center border-r border-primary-foreground/20 px-2 text-center transition-colors hover:bg-primary"><div className="skew-x-[9deg]"><Icon className="mx-auto mb-2 h-7 w-7" /><span className="block text-xs font-black uppercase">{label}</span><span className="mt-1 hidden text-[9px] opacity-70 sm:block">{detail}</span></div></a>)}</div></nav>

        <section id="calendrier" className="relative border-b border-border py-7 lg:py-8">
          <div className="mx-auto grid max-w-[1440px] gap-7 px-5 lg:grid-cols-[1fr_1.02fr_0.88fr]">
            <article>
              <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,color-mix(in_oklab,var(--primary-deep)_88%,black)_0%,color-mix(in_oklab,var(--primary)_42%,black)_55%,color-mix(in_oklab,var(--primary-deep)_92%,black)_100%)] p-6 text-primary-foreground shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)]">
                <div className="crescent-bg pointer-events-none absolute inset-0 opacity-[0.07]" />
                <div className="relative">
                  <div className="flex items-center gap-3 border-b border-primary-foreground/15 pb-4">
                    <span className="h-7 w-1.5 rounded-sm bg-primary" />
                    <h2 className="font-impact text-2xl font-bold uppercase tracking-tight">Prochain match</h2>
                  </div>
                  <p className="mt-5 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-primary">{prochainMatch?.competition ?? "Championnat régional — Journée 3"}</p>
                  <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
                    <div>
                      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-background p-2 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.6)]"><img src={logoAsset.url} alt="Siroco Abymes" className="h-full w-full object-contain" /></div>
                      <p className="mt-3 text-xs font-black uppercase leading-tight">{prochainMatch?.home_team ?? "Siroco Abymes"}</p>
                    </div>
                    <span className="font-impact text-3xl font-bold uppercase">VS</span>
                    <div>
                      <div className="mx-auto grid h-24 w-24 place-items-center rounded-[46%_46%_46%_46%/38%_38%_62%_62%] border-2 border-primary-foreground/80 bg-[linear-gradient(160deg,#c62828,#7f1414)] font-impact text-lg font-bold tracking-wide shadow-[0_8px_18px_-8px_rgba(0,0,0,0.6)]">{(prochainMatch?.away_team ?? "A.S. Rivière-Salée").split(/[\s.-]+/).filter(Boolean).map((mot) => mot[0]).join("").slice(0, 3).toUpperCase()}</div>
                      <p className="mt-3 text-xs font-black uppercase leading-tight">{prochainMatch?.away_team ?? "A.S. Rivière-Salée"}</p>
                    </div>
                  </div>
                  <div className="space-y-3 border-t border-primary-foreground/15 pt-5 text-[13px]">
                    <p className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-primary-foreground/80" />{prochainMatch ? formatDateFr(prochainMatch.kickoff) : "Samedi 20 septembre 2025"}</p>
                    <p className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-primary-foreground/80" />{prochainMatch ? formatHeureFr(prochainMatch.kickoff) : "16h00"}</p>
                    <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary-foreground/80" />{prochainMatch?.venue || "Stade Municipal des Abymes"}</p>
                  </div>
                  <Button asChild className="btn-3d mt-6 h-12 w-full rounded-full text-xs font-black uppercase tracking-[0.14em]"><a href="#calendrier">Voir le calendrier <ArrowRight /></a></Button>
                </div>
              </div>
            </article>
            <section id="actualites"><div className="flex items-center justify-between gap-3"><TitreSection>Dernières actualités</TitreSection><a href="#actualites" className="text-[9px] font-bold text-primary underline">Voir toutes les actualités →</a></div><div className="mt-4 space-y-3">{listeActualites.map((actu) => <article key={actu.titre} className="grid grid-cols-[132px_minmax(0,1fr)] gap-4 border-b border-border pb-3"><img src={actu.image} alt={actu.titre} loading="lazy" className="h-[88px] w-full rounded-md object-cover" /><div className="self-center"><p className="text-[9px] text-muted-foreground">{actu.date}</p><h3 className="font-impact text-[15px] font-bold leading-tight">{actu.titre}</h3><p className="mt-1 text-[11px] leading-tight text-muted-foreground">{actu.texte}</p></div></article>)}</div></section>
            <section><div className="flex items-center justify-between"><TitreSection>Classement</TitreSection><a href="#calendrier" className="text-[9px] font-bold text-primary underline">Voir le classement →</a></div><table className="mt-4 w-full text-left text-[11px]"><thead className="bg-muted uppercase"><tr><th className="p-2">#</th><th className="p-2">Équipe</th><th className="p-2 text-center">Pts</th><th className="p-2 text-center">J</th><th className="p-2 text-center">Diff</th></tr></thead><tbody>{listeClassement.map((ligne,index) => <tr key={ligne[1]} className={index === 0 ? "bg-secondary font-black text-primary" : "border-b border-border"}>{ligne.map((cell,i) => <td key={`${cell}-${i}`} className={`p-2 ${i > 1 ? "text-center" : ""}`}>{cell}</td>)}</tr>)}</tbody></table><blockquote className="mt-7 flex gap-3 text-xs leading-relaxed text-muted-foreground"><span className="font-display text-5xl font-black leading-none text-primary">“</span><span>{reglages["quote_text"]}</span></blockquote></section>
          </div>
        </section>

        <section id="club" className="relative overflow-hidden bg-foreground text-primary-foreground">
          <div className="grid lg:grid-cols-[1.6fr_1fr]">
            <div className="relative min-h-[260px]">
              <img src={newsTeam} alt="Les joueurs du Siroco réunis" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/45 to-foreground/70" />
              <div className="relative px-8 py-12">
                <p className="font-hand -rotate-3 text-5xl leading-[0.9] drop-shadow-lg sm:text-6xl">{reglages["banner_text"]}</p>
                <div className="mt-4 h-1.5 w-64 -skew-x-12 rounded-full bg-primary" />
              </div>
            </div>
            <div className="relative flex items-center gap-8 bg-[color-mix(in_oklab,var(--foreground)_92%,black)] px-8 py-10">
              <div className="grid gap-5">
                {[[Users,reglages["stat_members"],reglages["stat_members_label"]],[Trophy,reglages["stat_years"],reglages["stat_years_label"]],[Heart,reglages["stat_family"],reglages["stat_family_label"]]].map(([Icon,valeur,label]) => { const StatIcon = Icon as typeof Users; return (
                  <div key={String(label)} className="flex items-center gap-3">
                    <StatIcon className="h-7 w-7 shrink-0 text-primary" />
                    <div><strong className="font-impact text-3xl leading-none">{String(valeur)}</strong><span className="block text-[10px] opacity-80">{String(label)}</span></div>
                  </div>
                ); })}
              </div>
              <div className="ml-auto hidden items-center gap-3 sm:flex">
                <svg viewBox="0 0 100 100" className="h-28 w-28 fill-primary/25 stroke-primary/60" aria-hidden="true"><path d="M14 46c6-14 14-22 24-20 7 1 9 8 10 14 5-8 14-14 24-12 12 2 16 14 12 24-4 11-16 16-26 14-8-2-11-8-12-14-6 9-16 14-25 11-8-3-10-11-7-17Z" strokeWidth="1.5" /></svg>
                <div className="text-[10px] font-black uppercase leading-tight tracking-[0.2em]"><MapPin className="mb-1 h-4 w-4 text-primary" />Abymes<br /><span className="opacity-60">Guadeloupe</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="galerie" className="bg-background py-8"><div className="mx-auto max-w-[1440px] px-5"><div className="flex items-center gap-8"><TitreSection>Galerie</TitreSection><div className="flex gap-7 text-[10px] font-black uppercase"><span className="border-b-2 border-primary pb-1 text-primary">Photos</span><span className="text-muted-foreground">Vidéos</span></div><a href="#galerie" className="ml-auto hidden text-[10px] font-bold text-primary md:block">Voir toute la galerie →</a></div><div className="relative mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-6"><Button size="icon" className="absolute left-0 top-1/2 z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground text-primary-foreground hover:bg-foreground/90" aria-label="Images précédentes"><ArrowLeft /></Button>{listeGalerie.map((image,index) => <img key={`${image}-${index}`} src={image} alt={`Galerie Siroco ${index + 1}`} loading="lazy" className="aspect-[1.45/1] h-full w-full rounded-xl object-cover" />)}<Button size="icon" className="absolute right-0 top-1/2 z-10 h-10 w-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground text-primary-foreground hover:bg-foreground/90" aria-label="Images suivantes"><ArrowRight /></Button></div></div></section>

      </main>

      <footer id="contact" className="bg-[color-mix(in_oklab,var(--foreground)_94%,black)] text-primary-foreground"><div className="mx-auto grid max-w-[1440px] gap-9 px-7 py-11 md:grid-cols-[1.2fr_.8fr_.8fr_1.2fr_.7fr]"><div><div className="flex items-center gap-3"><img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-20 w-20 object-contain" /><div><strong className="font-impact text-2xl uppercase leading-none">{reglages["club_name"]}</strong><span className="block text-[11px] font-black uppercase tracking-[0.3em]">{reglages["club_city"]}</span><span className="mt-1 block text-[8px] uppercase tracking-[0.25em] opacity-55">{reglages["club_since"]}</span></div></div><p className="mt-4 font-hand -rotate-2 text-2xl text-primary-foreground">{reglages["footer_signature"]}</p><div className="mt-1 h-1 w-40 -skew-x-12 rounded-full bg-primary" /><div className="mt-5 grid gap-1 text-[10px] opacity-70"><span>{reglages["contact_address"]}</span><a href={`mailto:${reglages["contact_email"]}`}>{reglages["contact_email"]}</a><a href={`tel:${(reglages["contact_phone"] ?? "").replace(/\s/g, "")}`}>{reglages["contact_phone"]}</a></div></div><div><h2 className="text-xs font-black uppercase tracking-[0.15em]">Liens utiles</h2><div className="mt-4 grid gap-1.5 text-[11px] opacity-75">{navigation.slice(1,7).map(([href,label]) => <a key={href} href={href} className="hover:text-primary">{label}</a>)}</div></div><div><h2 className="text-xs font-black uppercase tracking-[0.15em]">Suivez-nous</h2><div className="mt-4 flex gap-3">{([[Facebook,reglages["social_facebook"],"Facebook"],[Instagram,reglages["social_instagram"],"Instagram"],[Youtube,reglages["social_youtube"],"YouTube"]] as const).map(([Icon,lien,nom]) => <a key={nom} href={lien || "#contact"} aria-label={nom} className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10"><Icon className="h-4 w-4" /></a>)}</div></div><div><h2 className="text-xs font-black uppercase tracking-[0.15em]">Newsletter</h2><p className="mt-4 text-[10px] opacity-70">{reglages["newsletter_text"]}</p><div className="mt-3 flex h-10 gap-2"><label htmlFor="email" className="sr-only">Votre email</label><input id="email" type="email" placeholder="Votre email" className="min-w-0 flex-1 rounded-lg bg-primary-foreground/10 px-3 text-xs outline-none placeholder:opacity-50" /><Button size="icon" className="btn-3d h-10 w-12 rounded-lg" aria-label="S’inscrire à la newsletter"><ArrowRight /></Button></div></div><div className="border-l-2 border-primary/70 pl-6 font-impact text-lg uppercase leading-tight tracking-[0.2em]">Passion<br />Respect<br />Formation<br />Solidarité</div></div><div className="border-t border-primary-foreground/15"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-7 py-5 text-[9px] opacity-60 sm:flex-row"><span>© {new Date().getFullYear()} {reglages["club_name"]} {reglages["club_city"]} — Tous droits réservés</span><a href="/auth">Espace administrateur</a></div></div></footer>
    </div>
  );
}