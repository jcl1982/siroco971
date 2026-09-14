import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import { supabase } from "@/integrations/supabase/client";
import { reglagesParDefaut, useReglages } from "@/lib/site-content";
import newsTeam from "@/assets/news-team.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & inscriptions — Siroco Abymes" },
      { name: "description", content: "Contactez le Siroco des Abymes : adresse du stade, téléphone, email et formulaire d’inscription au club." },
      { property: "og:title", content: "Contact — Siroco Abymes" },
      { property: "og:description", content: "Écrivez au Siroco des Abymes pour une inscription ou un partenariat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageContact,
});

function PageContact() {
  const { data: reglages = reglagesParDefaut } = useReglages();
  const [formulaire, setFormulaire] = useState({ name: "", email: "", subject: "", message: "" });
  const [envoi, setEnvoi] = useState(false);

  async function envoyer(event: React.FormEvent) {
    event.preventDefault();
    setEnvoi(true);
    const { error } = await supabase.from("contact_messages").insert(formulaire);
    setEnvoi(false);
    if (error) {
      toast.error("Votre message n’a pas pu être envoyé. Réessayez dans un instant.");
      return;
    }
    setFormulaire({ name: "", email: "", subject: "", message: "" });
    toast.success("Message envoyé ! Le club vous répondra rapidement.");
  }

  const champ = "h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary";

  return (
    <SiteShell>
      <EnTetePage titre="Contact" sousTitre="Une question, une inscription, un partenariat ? Écrivez-nous, le club vous répond." image={newsTeam} />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <TitreSection>Nous écrire</TitreSection>
          <form onSubmit={envoyer} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="nom" className="mb-1 block text-[11px] font-bold uppercase">Nom</label><input id="nom" required value={formulaire.name} onChange={(e) => setFormulaire({ ...formulaire, name: e.target.value })} className={champ} /></div>
              <div><label htmlFor="mail" className="mb-1 block text-[11px] font-bold uppercase">Email</label><input id="mail" type="email" required value={formulaire.email} onChange={(e) => setFormulaire({ ...formulaire, email: e.target.value })} className={champ} /></div>
            </div>
            <div><label htmlFor="sujet" className="mb-1 block text-[11px] font-bold uppercase">Sujet</label><input id="sujet" value={formulaire.subject} onChange={(e) => setFormulaire({ ...formulaire, subject: e.target.value })} className={champ} /></div>
            <div><label htmlFor="message" className="mb-1 block text-[11px] font-bold uppercase">Message</label><textarea id="message" required rows={6} value={formulaire.message} onChange={(e) => setFormulaire({ ...formulaire, message: e.target.value })} className="w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-primary" /></div>
            <Button type="submit" disabled={envoi} className="btn-3d h-12 rounded-md text-xs font-black uppercase">{envoi ? "Envoi…" : "Envoyer le message →"}</Button>
          </form>
        </div>
        <div className="grid content-start gap-4">
          <TitreSection>Coordonnées</TitreSection>
          <div className="grid gap-3 text-sm">
            <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" />{reglages["contact_address"]}</p>
            <a href={`mailto:${reglages["contact_email"]}`} className="flex items-center gap-3 hover:text-primary"><Mail className="h-4 w-4 text-primary" />{reglages["contact_email"]}</a>
            <a href={`tel:${(reglages["contact_phone"] ?? "").replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-primary"><Phone className="h-4 w-4 text-primary" />{reglages["contact_phone"]}</a>
          </div>
          <iframe
            title="Carte des Abymes"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-61.55%2C16.25%2C-61.47%2C16.30&layer=mapnik"
            className="mt-3 h-72 w-full rounded-xl border border-border"
            loading="lazy"
          />
        </div>
      </section>
    </SiteShell>
  );
}
