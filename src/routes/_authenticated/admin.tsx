import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";
import {
  CLES_REGLAGES,
  useActualites,
  useClassement,
  useGalerie,
  useMatchs,
  useReglages,
} from "@/lib/site-content";
import logoAsset from "@/assets/siroco-logo.png.asset.json";

export const Route = createFileRoute("/_authenticated/admin")({
  component: PageAdmin,
  head: () => ({
    meta: [
      { title: "Administration — Siroco Abymes" },
      { name: "description", content: "Espace d’administration du site du Siroco des Abymes." },
      { property: "og:title", content: "Administration — Siroco Abymes" },
      { property: "og:description", content: "Gestion des contenus du site du club." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function useEstAdmin() {
  return useQuery({
    queryKey: ["is_admin"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getUser();
      if (!session.user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return Boolean(data);
    },
  });
}

function Champ({ label, value, onChange, multiligne }: { label: string; value: string; onChange: (v: string) => void; multiligne?: boolean }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</Label>
      {multiligne ? (
        <Textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function Carte({ titre, action, children }: { titre: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-impact text-lg uppercase">{titre}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function PageAdmin() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { data: estAdmin, isLoading } = useEstAdmin();

  async function deconnexion() {
    await client.cancelQueries();
    client.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isLoading) return <main className="p-10 text-sm text-muted-foreground">Chargement…</main>;

  if (!estAdmin) {
    return (
      <main className="mx-auto max-w-lg p-10 text-center">
        <h1 className="font-impact text-2xl uppercase">Accès réservé</h1>
        <p className="mt-3 text-sm text-muted-foreground">Votre compte n’a pas les droits d’administration du site.</p>
        <Button className="mt-6 rounded-md" onClick={deconnexion}>Se déconnecter</Button>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Toaster />
      <header className="flex flex-wrap items-center justify-between gap-4 bg-foreground px-6 py-4 text-primary-foreground">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-12 w-12 object-contain" />
          <div>
            <strong className="font-impact text-xl uppercase leading-none">Administration</strong>
            <span className="block text-[10px] uppercase tracking-[0.25em] opacity-70">Siroco Abymes</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-md border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate({ to: "/" })}>Voir le site</Button>
          <Button className="btn-3d rounded-md" onClick={deconnexion}>Déconnexion</Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <Tabs defaultValue="reglages">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="reglages">Textes du site</TabsTrigger>
            <TabsTrigger value="actualites">Actualités</TabsTrigger>
            <TabsTrigger value="matchs">Matchs</TabsTrigger>
            <TabsTrigger value="classement">Classement</TabsTrigger>
            <TabsTrigger value="galerie">Galerie</TabsTrigger>
          </TabsList>

          <TabsContent value="reglages" className="mt-5"><OngletReglages /></TabsContent>
          <TabsContent value="actualites" className="mt-5"><OngletActualites /></TabsContent>
          <TabsContent value="matchs" className="mt-5"><OngletMatchs /></TabsContent>
          <TabsContent value="classement" className="mt-5"><OngletClassement /></TabsContent>
          <TabsContent value="galerie" className="mt-5"><OngletGalerie /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function OngletReglages() {
  const client = useQueryClient();
  const { data } = useReglages();
  const [valeurs, setValeurs] = useState<Record<string, string>>({});
  const [envoi, setEnvoi] = useState(false);

  useEffect(() => { if (data) setValeurs(data); }, [data]);

  const groupes = Array.from(new Set(CLES_REGLAGES.map((c) => c.groupe)));

  async function enregistrer() {
    setEnvoi(true);
    const lignes = CLES_REGLAGES.map((c) => ({ key: c.key, value: valeurs[c.key] ?? "" }));
    const { error } = await supabase.from("site_settings").upsert(lignes, { onConflict: "key" });
    setEnvoi(false);
    if (error) return toast.error("Enregistrement impossible");
    toast.success("Textes enregistrés");
    client.invalidateQueries({ queryKey: ["site_settings"] });
  }

  return (
    <div className="grid gap-5">
      {groupes.map((groupe) => (
        <Carte key={groupe} titre={groupe}>
          <div className="grid gap-4 sm:grid-cols-2">
            {CLES_REGLAGES.filter((c) => c.groupe === groupe).map((champ) => (
              <div key={champ.key} className={champ.multiligne ? "sm:col-span-2" : ""}>
                <Champ
                  label={champ.label}
                  multiligne={champ.multiligne}
                  value={valeurs[champ.key] ?? ""}
                  onChange={(v) => setValeurs((etat) => ({ ...etat, [champ.key]: v }))}
                />
              </div>
            ))}
          </div>
        </Carte>
      ))}
      <Button className="btn-3d h-11 w-full rounded-md uppercase" onClick={enregistrer} disabled={envoi}>
        <Save /> Enregistrer les textes
      </Button>
    </div>
  );
}

type LigneQuelconque = Record<string, unknown> & { id: string };

function useTable(table: "news" | "matches" | "standings" | "gallery", cleCache: string) {
  const client = useQueryClient();
  async function sauvegarder(ligne: LigneQuelconque) {
    const { id, ...reste } = ligne;
    const { error } = await supabase.from(table).update(reste).eq("id", id);
    if (error) return toast.error("Enregistrement impossible");
    toast.success("Modification enregistrée");
    client.invalidateQueries({ queryKey: [cleCache] });
  }
  async function supprimer(id: string) {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error("Suppression impossible");
    toast.success("Élément supprimé");
    client.invalidateQueries({ queryKey: [cleCache] });
  }
  async function ajouter(valeurs: Record<string, unknown>) {
    const { error } = await supabase.from(table).insert(valeurs);
    if (error) return toast.error("Ajout impossible");
    toast.success("Élément ajouté");
    client.invalidateQueries({ queryKey: [cleCache] });
  }
  return { sauvegarder, supprimer, ajouter };
}

function LigneEditable({ children, onSave, onDelete }: { children: React.ReactNode; onSave: () => void; onDelete: () => void }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
      <div className="mt-3 flex gap-2">
        <Button size="sm" className="rounded-md" onClick={onSave}><Save /> Enregistrer</Button>
        <Button size="sm" variant="destructive" className="rounded-md" onClick={onDelete}><Trash2 /> Supprimer</Button>
      </div>
    </div>
  );
}

function OngletActualites() {
  const { data } = useActualites();
  const { sauvegarder, supprimer, ajouter } = useTable("news", "news");
  const [brouillons, setBrouillons] = useState<Record<string, Record<string, string | number>>>({});
  useEffect(() => {
    if (data) setBrouillons(Object.fromEntries(data.map((a) => [a.id, { ...a }])) as typeof brouillons);
  }, [data]);

  return (
    <Carte
      titre="Actualités"
      action={<Button size="sm" className="rounded-md" onClick={() => ajouter({ title: "Nouvelle actualité", excerpt: "", category: "Actualité", image_url: "" })}><Plus /> Ajouter</Button>}
    >
      <div className="grid gap-4">
        {(data ?? []).map((item) => {
          const b = brouillons[item.id] ?? {};
          const maj = (cle: string, v: string | number) => setBrouillons((e) => ({ ...e, [item.id]: { ...e[item.id], [cle]: v } }));
          return (
            <LigneEditable key={item.id} onSave={() => sauvegarder(b as LigneQuelconque)} onDelete={() => supprimer(item.id)}>
              <Champ label="Titre" value={String(b["title"] ?? "")} onChange={(v) => maj("title", v)} />
              <Champ label="Catégorie" value={String(b["category"] ?? "")} onChange={(v) => maj("category", v)} />
              <Champ label="Date (AAAA-MM-JJ)" value={String(b["published_on"] ?? "")} onChange={(v) => maj("published_on", v)} />
              <Champ label="Adresse de l’image" value={String(b["image_url"] ?? "")} onChange={(v) => maj("image_url", v)} />
              <div className="sm:col-span-2">
                <Champ label="Résumé" multiligne value={String(b["excerpt"] ?? "")} onChange={(v) => maj("excerpt", v)} />
              </div>
            </LigneEditable>
          );
        })}
      </div>
    </Carte>
  );
}

function OngletMatchs() {
  const { data } = useMatchs();
  const { sauvegarder, supprimer, ajouter } = useTable("matches", "matches");
  const [brouillons, setBrouillons] = useState<Record<string, Record<string, unknown>>>({});
  useEffect(() => {
    if (data) setBrouillons(Object.fromEntries(data.map((m) => [m.id, { ...m }])));
  }, [data]);

  return (
    <Carte
      titre="Matchs"
      action={<Button size="sm" className="rounded-md" onClick={() => ajouter({ competition: "Championnat régional", away_team: "Adversaire", venue: "" })}><Plus /> Ajouter</Button>}
    >
      <div className="grid gap-4">
        {(data ?? []).map((item) => {
          const b = brouillons[item.id] ?? {};
          const maj = (cle: string, v: unknown) => setBrouillons((e) => ({ ...e, [item.id]: { ...e[item.id], [cle]: v } }));
          const dateLocale = String(b["kickoff"] ?? "").slice(0, 16);
          return (
            <LigneEditable key={item.id} onSave={() => sauvegarder(b as LigneQuelconque)} onDelete={() => supprimer(item.id)}>
              <Champ label="Compétition" value={String(b["competition"] ?? "")} onChange={(v) => maj("competition", v)} />
              <Champ label="Lieu" value={String(b["venue"] ?? "")} onChange={(v) => maj("venue", v)} />
              <Champ label="Équipe à domicile" value={String(b["home_team"] ?? "")} onChange={(v) => maj("home_team", v)} />
              <Champ label="Équipe adverse" value={String(b["away_team"] ?? "")} onChange={(v) => maj("away_team", v)} />
              <div className="grid gap-1.5">
                <Label htmlFor={`date-${item.id}`} className="text-[11px] uppercase tracking-wide text-muted-foreground">Date et heure</Label>
                <Input
                  id={`date-${item.id}`}
                  type="datetime-local"
                  value={dateLocale}
                  onChange={(e) => maj("kickoff", new Date(e.target.value).toISOString())}
                />
              </div>
              <Champ label="Score (domicile / extérieur)" value={`${b["home_score"] ?? ""} - ${b["away_score"] ?? ""}`} onChange={(v) => {
                const [d, ext] = v.split("-").map((p) => p.trim());
                maj("home_score", d === "" || d === undefined ? null : Number(d));
                maj("away_score", ext === "" || ext === undefined ? null : Number(ext));
              }} />
            </LigneEditable>
          );
        })}
      </div>
    </Carte>
  );
}

function OngletClassement() {
  const { data } = useClassement();
  const { sauvegarder, supprimer, ajouter } = useTable("standings", "standings");
  const [brouillons, setBrouillons] = useState<Record<string, Record<string, unknown>>>({});
  useEffect(() => {
    if (data) setBrouillons(Object.fromEntries(data.map((c) => [c.id, { ...c }])));
  }, [data]);

  return (
    <Carte
      titre="Classement"
      action={<Button size="sm" className="rounded-md" onClick={() => ajouter({ team: "Nouvelle équipe", position: (data?.length ?? 0) + 1 })}><Plus /> Ajouter</Button>}
    >
      <div className="grid gap-4">
        {(data ?? []).map((item) => {
          const b = brouillons[item.id] ?? {};
          const maj = (cle: string, v: unknown) => setBrouillons((e) => ({ ...e, [item.id]: { ...e[item.id], [cle]: v } }));
          return (
            <LigneEditable key={item.id} onSave={() => sauvegarder(b as LigneQuelconque)} onDelete={() => supprimer(item.id)}>
              <Champ label="Place" value={String(b["position"] ?? "")} onChange={(v) => maj("position", Number(v) || 1)} />
              <Champ label="Équipe" value={String(b["team"] ?? "")} onChange={(v) => maj("team", v)} />
              <Champ label="Points" value={String(b["points"] ?? "")} onChange={(v) => maj("points", Number(v) || 0)} />
              <Champ label="Matchs joués" value={String(b["played"] ?? "")} onChange={(v) => maj("played", Number(v) || 0)} />
              <Champ label="Différence de buts" value={String(b["goal_diff"] ?? "")} onChange={(v) => maj("goal_diff", v)} />
            </LigneEditable>
          );
        })}
      </div>
    </Carte>
  );
}

function OngletGalerie() {
  const { data } = useGalerie();
  const { sauvegarder, supprimer, ajouter } = useTable("gallery", "gallery");
  const [brouillons, setBrouillons] = useState<Record<string, Record<string, unknown>>>({});
  useEffect(() => {
    if (data) setBrouillons(Object.fromEntries(data.map((p) => [p.id, { ...p }])));
  }, [data]);

  return (
    <Carte
      titre="Galerie photos"
      action={<Button size="sm" className="rounded-md" onClick={() => ajouter({ image_url: "", caption: "", sort_order: (data?.length ?? 0) + 1 })}><Plus /> Ajouter</Button>}
    >
      <div className="grid gap-4">
        {(data ?? []).map((item) => {
          const b = brouillons[item.id] ?? {};
          const maj = (cle: string, v: unknown) => setBrouillons((e) => ({ ...e, [item.id]: { ...e[item.id], [cle]: v } }));
          return (
            <LigneEditable key={item.id} onSave={() => sauvegarder(b as LigneQuelconque)} onDelete={() => supprimer(item.id)}>
              <Champ label="Adresse de l’image" value={String(b["image_url"] ?? "")} onChange={(v) => maj("image_url", v)} />
              <Champ label="Légende" value={String(b["caption"] ?? "")} onChange={(v) => maj("caption", v)} />
              <Champ label="Ordre d’affichage" value={String(b["sort_order"] ?? "")} onChange={(v) => maj("sort_order", Number(v) || 0)} />
              {String(b["image_url"] ?? "") && <img src={String(b["image_url"])} alt={String(b["caption"] ?? "Photo du club")} className="h-24 w-full rounded-md object-cover" />}
            </LigneEditable>
          );
        })}
      </div>
    </Carte>
  );
}
