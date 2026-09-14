import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Menu, Search, UserRound, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reglagesParDefaut, useReglages } from "@/lib/site-content";
import logoAsset from "@/assets/siroco-logo.png.asset.json";

export const navigation = [
  { to: "/", label: "Accueil" },
  { to: "/club", label: "Le club" },
  { to: "/equipes", label: "Équipes" },
  { to: "/actualites", label: "Actualités" },
  { to: "/calendrier", label: "Calendrier" },
  { to: "/medias", label: "Médias" },
  { to: "/partenaires", label: "Partenaires" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [rechercheOuverte, setRechercheOuverte] = useState(false);
  const [recherche, setRecherche] = useState("");
  const navigate = useNavigate();
  const { data: reglages = reglagesParDefaut } = useReglages();

  function lancerRecherche(event: React.FormEvent) {
    event.preventDefault();
    setRechercheOuverte(false);
    navigate({ to: "/actualites", search: { q: recherche.trim() } });
  }

  return (
    <>
      <div className="bg-foreground text-primary-foreground">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-5 text-[10px]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{reglages["topbar_location"]}</span>
            <span className="hidden border-l border-primary-foreground/30 pl-5 sm:block">{reglages["topbar_slogan"]}</span>
          </div>
          <div className="flex h-full items-center gap-3">
            <a href={reglages["social_facebook"] || "/contact"} target={reglages["social_facebook"] ? "_blank" : undefined} rel="noreferrer" aria-label="Facebook"><Facebook className="hidden h-3.5 w-3.5 sm:block" /></a>
            <a href={reglages["social_instagram"] || "/contact"} target={reglages["social_instagram"] ? "_blank" : undefined} rel="noreferrer" aria-label="Instagram"><Instagram className="hidden h-3.5 w-3.5 sm:block" /></a>
            <a href={reglages["social_youtube"] || "/contact"} target={reglages["social_youtube"] ? "_blank" : undefined} rel="noreferrer" aria-label="YouTube"><Youtube className="hidden h-4 w-4 sm:block" /></a>
            <button type="button" aria-label="Rechercher" onClick={() => setRechercheOuverte((value) => !value)}><Search className="h-3.5 w-3.5" /></button>
            <Link to="/auth" className="flex h-full items-center gap-2 bg-primary px-3 font-bold uppercase shadow-md sm:px-4"><UserRound className="h-3.5 w-3.5" />Espace membre</Link>
          </div>
        </div>
        {rechercheOuverte && (
          <form onSubmit={lancerRecherche} className="mx-auto flex max-w-[1440px] gap-2 px-5 pb-3">
            <label htmlFor="recherche-site" className="sr-only">Rechercher sur le site</label>
            <input id="recherche-site" autoFocus value={recherche} onChange={(event) => setRecherche(event.target.value)} placeholder="Rechercher une actualité…" className="h-10 min-w-0 flex-1 rounded-md bg-primary-foreground/10 px-3 text-xs outline-none placeholder:opacity-50" />
            <Button type="submit" className="btn-3d h-10 rounded-md text-[11px] font-black uppercase">Rechercher</Button>
          </form>
        )}
      </div>

      <header className="header-shade sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[84px] max-w-[1440px] items-center px-5">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-[68px] w-[68px] object-contain" />
            <div className="leading-none">
              <strong className="block font-impact text-[2rem] font-bold uppercase text-primary">{reglages["club_name"]}</strong>
              <span className="block text-center text-[9px] font-black uppercase tracking-[0.28em]">{reglages["club_city"]}</span>
              <span className="block text-center text-[6px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{reglages["club_since"]}</span>
            </div>
          </Link>
          <nav className="ml-auto hidden items-center gap-8 lg:flex">
            {navigation.map(({ to, label }) => (
              <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="flex items-center gap-1 border-b-2 border-transparent py-8 text-[11px] font-black uppercase transition-colors hover:text-primary data-[status=active]:border-primary data-[status=active]:text-primary">{label}</Link>
            ))}
          </nav>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setMenuOuvert((value) => !value)} aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}>{menuOuvert ? <X /> : <Menu />}</Button>
        </div>
        {menuOuvert && (
          <nav className="grid grid-cols-2 border-t border-border bg-background p-4 lg:hidden">
            {navigation.map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setMenuOuvert(false)} className="py-3 text-xs font-bold uppercase">{label}</Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
