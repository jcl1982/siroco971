import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { reglagesParDefaut, useReglages } from "@/lib/site-content";
import { navigation } from "@/components/site-header";
import logoAsset from "@/assets/siroco-logo.png.asset.json";

export function SiteFooter() {
  const { data: reglages = reglagesParDefaut } = useReglages();
  const [email, setEmail] = useState("");
  const [envoi, setEnvoi] = useState(false);

  async function inscrire(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setEnvoi(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim().toLowerCase() });
    setEnvoi(false);
    if (error) {
      toast.error(error.code === "23505" ? "Cette adresse est déjà inscrite." : "Inscription impossible pour le moment.");
      return;
    }
    setEmail("");
    toast.success("Merci ! Vous êtes inscrit à la newsletter du club.");
  }

  return (
    <footer id="contact" className="bg-[color-mix(in_oklab,var(--foreground)_94%,black)] text-primary-foreground">
      <div className="mx-auto grid max-w-[1440px] gap-9 px-7 py-11 md:grid-cols-[1.2fr_.8fr_.8fr_1.2fr_.7fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-20 w-20 object-contain" />
            <div>
              <strong className="font-impact text-2xl uppercase leading-none">{reglages["club_name"]}</strong>
              <span className="block text-[11px] font-black uppercase tracking-[0.3em]">{reglages["club_city"]}</span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.25em] opacity-55">{reglages["club_since"]}</span>
            </div>
          </div>
          <p className="mt-4 font-hand -rotate-2 text-2xl text-primary-foreground">{reglages["footer_signature"]}</p>
          <div className="mt-1 h-1 w-40 -skew-x-12 rounded-full bg-primary" />
          <div className="mt-5 grid gap-1 text-[10px] opacity-70">
            <span>{reglages["contact_address"]}</span>
            <a href={`mailto:${reglages["contact_email"]}`}>{reglages["contact_email"]}</a>
            <a href={`tel:${(reglages["contact_phone"] ?? "").replace(/\s/g, "")}`}>{reglages["contact_phone"]}</a>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.15em]">Liens utiles</h2>
          <div className="mt-4 grid gap-1.5 text-[11px] opacity-75">
            {navigation.slice(1).map(({ to, label }) => <Link key={to} to={to} className="hover:text-primary">{label}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.15em]">Suivez-nous</h2>
          <div className="mt-4 flex gap-3">
            {([[Facebook, reglages["social_facebook"], "Facebook"], [Instagram, reglages["social_instagram"], "Instagram"], [Youtube, reglages["social_youtube"], "YouTube"]] as const).map(([Icon, lien, nom]) => (
              <a key={nom} href={lien || "/contact"} target={lien ? "_blank" : undefined} rel="noreferrer" aria-label={nom} className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.15em]">Newsletter</h2>
          <p className="mt-4 text-[10px] opacity-70">{reglages["newsletter_text"]}</p>
          <form onSubmit={inscrire} className="mt-3 flex h-10 gap-2">
            <label htmlFor="email-newsletter" className="sr-only">Votre email</label>
            <input id="email-newsletter" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Votre email" className="min-w-0 flex-1 rounded-lg bg-primary-foreground/10 px-3 text-xs outline-none placeholder:opacity-50" />
            <Button type="submit" size="icon" disabled={envoi} className="btn-3d h-10 w-12 rounded-lg" aria-label="S’inscrire à la newsletter"><ArrowRight /></Button>
          </form>
        </div>
        <div className="border-l-2 border-primary/70 pl-6 font-impact text-lg uppercase leading-tight tracking-[0.2em]">Passion<br />Respect<br />Formation<br />Solidarité</div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-7 py-5 text-[9px] opacity-60 sm:flex-row">
          <span>© {new Date().getFullYear()} {reglages["club_name"]} {reglages["club_city"]} — Tous droits réservés</span>
          <Link to="/auth">Espace administrateur</Link>
        </div>
      </div>
    </footer>
  );
}
