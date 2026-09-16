import { useEffect, useRef, useState } from "react";
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
import { Plus, Save, Trash2, Upload, Loader2, Newspaper, CalendarDays, Images, Users, Mail, Handshake, Shirt, Trophy } from "lucide-react";
import {
  CLES_REGLAGES,
  useActualites,
  useClassement,
  useGalerie,
  useMatchs,
  useReglages,
  useEquipes,
  useJoueurs,
  usePartenaires,
  formatDateFr,
  formatHeureFr,
} from "@/lib/site-content";
import { ImageSite } from "@/lib/image-stockage";
import logoAsset from "@/assets/siroco-logo.png.asset.json";

/** Téléverse un fichier dans le bucket site-images et renvoie l'URL publique. */
async function televerserImage(fichier: File): Promise<string> {
  const ext = fichier.name.split(".").pop() ?? "jpg";
  const nom = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(nom, fichier, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("site-images").getPublicUrl(nom);
  return data.publicUrl;
}

/** Champ image : saisie d'URL + bouton de téléversement + aperçu. */
function ChampImage({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [envoi, setEnvoi] = useState(false);
  const id = label.replace(/\s+/g, "-").toLowerCase();

  async function surFichier(e: React.ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    if (!fichier) return;
    setEnvoi(true);
    try {
      const url = await televerserImage(fichier);
      onChange(url);
      toast.success("Image téléversée");
    } catch {
      toast.error("Téléversement impossible");
    } finally {
      setEnvoi(false);
      if (ref.current) ref.current.value = "";
    }
  }

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="flex gap-2">
        <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Collez une adresse ou téléversez un fichier" />
        <Button type="button" variant="outline" size="sm" className="shrink-0 rounded-md" disabled={envoi} onClick={() => ref.current?.click()}>
          {envoi ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span className="hidden sm:inline">Téléverser</span>
        </Button>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={surFichier} />
      </div>
      {value && <ImageSite src={value} alt="" className="h-24 w-full rounded-md object-cover" />}
    </div>
  );
}

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
        <Tabs defaultValue="tableau">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="tableau">Tableau de bord</TabsTrigger>
            <TabsTrigger value="reglages">Textes du site</TabsTrigger>
            <TabsTrigger value="actualites">Actualités</TabsTrigger>
            <TabsTrigger value="matchs">Matchs</TabsTrigger>
            <TabsTrigger value="classement">Classement</TabsTrigger>
            <TabsTrigger value="galerie">Galerie</TabsTrigger>
            <TabsTrigger value="equipes">Équipes</TabsTrigger>
            <TabsTrigger value="joueurs">Joueurs</TabsTrigger>
            <TabsTrigger value="partenaires">Partenaires</TabsTrigger>
          </TabsList>

          <TabsContent value="tableau" className="mt-5"><OngletTableauDeBord /></TabsContent>
          <TabsContent value="reglages" className="mt-5"><OngletReglages /></TabsContent>
          <TabsContent value="actualites" className="mt-5"><OngletActualites /></TabsContent>
          <TabsContent value="matchs" className="mt-5"><OngletMatchs /></TabsContent>
          <TabsContent value="classement" className="mt-5"><OngletClassement /></TabsContent>
          <TabsContent value="galerie" className="mt-5"><OngletGalerie /></TabsContent>
          <TabsContent value="equipes" className="mt-5"><OngletEquipes /></TabsContent>
          <TabsContent value="joueurs" className="mt-5"><OngletJoueurs /></TabsContent>
          <TabsContent value="partenaires" className="mt-5"><OngletPartenaires /></TabsContent>
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
    if (error) { toast.error("Enregistrement impossible"); return; }
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
                  multiligne={champ.multiligne ?? false}
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

function useTable(
  table: "news" | "matches" | "standings" | "gallery" | "teams" | "players" | "partners",
  cleCache: string,
) {
  const client = useQueryClient();
  async function sauvegarder(ligne: LigneQuelconque) {
    const { id, ...reste } = ligne;
    const requete = supabase.from(table) as unknown as { update: (v: Record<string, unknown>) => { eq: (c: string, v: string) => Promise<{ error: unknown }> } };
    const { error } = await requete.update(reste).eq("id", id);
    if (error) { toast.error("Enregistrement impossible"); return; }
    toast.success("Modification enregistrée");
    client.invalidateQueries({ queryKey: [cleCache] });
  }
  async function supprimer(id: string) {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) { toast.error("Suppression impossible"); return; }
    toast.success("Élément supprimé");
    client.invalidateQueries({ queryKey: [cleCache] });
  }
  async function ajouter(valeurs: Record<string, unknown>) {
    const requete = supabase.from(table) as unknown as { insert: (v: Record<string, unknown>) => Promise<{ error: unknown }> };
    const { error } = await requete.insert(valeurs);
    if (error) { toast.error("Ajout impossible"); return; }
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
              <ChampImage label="Image de l’actualité" value={String(b["image_url"] ?? "")} onChange={(v) => maj("image_url", v)} />
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
              <Champ label="Journée / tour" value={String(b["matchday"] ?? "")} onChange={(v) => maj("matchday", v)} />
              <Champ label="Lien de la vidéo (YouTube, Vimeo…)" value={String(b["video_url"] ?? "")} onChange={(v) => maj("video_url", v)} />
              <Champ label="Buteurs" value={String(b["scorers"] ?? "")} onChange={(v) => maj("scorers", v)} />
              <Champ label="Arbitrage" value={String(b["referee"] ?? "")} onChange={(v) => maj("referee", v)} />
              <Champ label="Affluence" value={String(b["attendance"] ?? "")} onChange={(v) => maj("attendance", v)} />
              <ChampImage label="Photo du match" value={String(b["image_url"] ?? "")} onChange={(v) => maj("image_url", v)} />
              <div className="sm:col-span-2">
                <Champ label="Résumé (une phrase)" multiligne value={String(b["summary"] ?? "")} onChange={(v) => maj("summary", v)} />
              </div>
              <div className="sm:col-span-2">
                <Champ label="Compte-rendu du match" multiligne value={String(b["report"] ?? "")} onChange={(v) => maj("report", v)} />
              </div>
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
              <ChampImage label="Photo de la galerie" value={String(b["image_url"] ?? "")} onChange={(v) => maj("image_url", v)} />
              <Champ label="Légende" value={String(b["caption"] ?? "")} onChange={(v) => maj("caption", v)} />
              <Champ label="Ordre d'affichage" value={String(b["sort_order"] ?? "")} onChange={(v) => maj("sort_order", Number(v) || 0)} />
            </LigneEditable>
          );
        })}
      </div>
    </Carte>
  );
}

function useMessages() {
  return useQuery({
    queryKey: ["contact_messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data ?? [];
    },
  });
}

function useAbonnes() {
  return useQuery({
    queryKey: ["newsletter_subscribers"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("newsletter_subscribers")
        .select("id", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });
}

function Chiffre({ icone: Icone, valeur, libelle }: { icone: typeof Newspaper; valeur: number | string; libelle: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <Icone className="h-5 w-5 text-primary" />
      <strong className="mt-2 block font-impact text-3xl leading-none">{valeur}</strong>
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{libelle}</span>
    </div>
  );
}

function OngletTableauDeBord() {
  const { data: actualites } = useActualites();
  const { data: matchs } = useMatchs();
  const { data: galerie } = useGalerie();
  const { data: equipes } = useEquipes();
  const { data: joueurs } = useJoueurs();
  const { data: partenaires } = usePartenaires();
  const { data: messages } = useMessages();
  const { data: abonnes } = useAbonnes();

  const maintenant = Date.now();
  const aVenir = (matchs ?? []).filter((m) => new Date(m.kickoff).getTime() >= maintenant).slice(0, 3);
  const aCompleter = (matchs ?? []).filter(
    (m) => new Date(m.kickoff).getTime() < maintenant && (m.home_score === null || m.away_score === null),
  );

  return (
    <div className="grid gap-5">
      <Carte titre="En un coup d’œil">
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Chiffre icone={Newspaper} valeur={actualites?.length ?? 0} libelle="Actualités" />
          <Chiffre icone={CalendarDays} valeur={matchs?.length ?? 0} libelle="Matchs" />
          <Chiffre icone={Images} valeur={galerie?.length ?? 0} libelle="Photos" />
          <Chiffre icone={Shirt} valeur={equipes?.length ?? 0} libelle="Équipes" />
          <Chiffre icone={Users} valeur={joueurs?.length ?? 0} libelle="Joueurs" />
          <Chiffre icone={Handshake} valeur={partenaires?.length ?? 0} libelle="Partenaires" />
          <Chiffre icone={Mail} valeur={abonnes ?? 0} libelle="Abonnés newsletter" />
          <Chiffre icone={Trophy} valeur={aCompleter.length} libelle="Scores à saisir" />
        </div>
      </Carte>

      <div className="grid gap-5 lg:grid-cols-2">
        <Carte titre="Prochains matchs">
          {aVenir.length === 0 ? (
            <p className="text-xs text-muted-foreground">Aucun match à venir enregistré.</p>
          ) : (
            <ul className="grid gap-3">
              {aVenir.map((m) => (
                <li key={m.id} className="rounded-lg border border-border bg-background p-3">
                  <strong className="font-impact text-sm uppercase">{m.home_team} — {m.away_team}</strong>
                  <p className="text-[11px] text-muted-foreground">
                    {formatDateFr(m.kickoff)} à {formatHeureFr(m.kickoff)} · {m.venue || "Lieu à préciser"}
                  </p>
                </li>
              ))}
            </ul>
          )}
          {aCompleter.length > 0 && (
            <p className="mt-4 rounded-lg bg-secondary p-3 text-[11px] text-muted-foreground">
              {aCompleter.length} match(s) déjà joué(s) sans score enregistré. Onglet « Matchs » pour les compléter.
            </p>
          )}
        </Carte>

        <Carte titre="Derniers messages reçus">
          {(messages ?? []).length === 0 ? (
            <p className="text-xs text-muted-foreground">Aucun message pour le moment.</p>
          ) : (
            <ul className="grid gap-3">
              {(messages ?? []).map((m) => (
                <li key={String(m.id)} className="rounded-lg border border-border bg-background p-3">
                  <strong className="text-sm">{m.name}</strong>
                  <span className="ml-2 text-[11px] text-muted-foreground">{m.email}</span>
                  <p className="mt-1 text-[11px] font-bold uppercase text-primary">{m.subject || "Sans objet"}</p>
                  <p className="mt-1 line-clamp-3 text-xs text-muted-foreground">{m.message}</p>
                </li>
              ))}
            </ul>
          )}
        </Carte>
      </div>
    </div>
  );
}

function OngletEquipes() {
  const { data } = useEquipes();
  const { sauvegarder, supprimer, ajouter } = useTable("teams", "teams");
  const [brouillons, setBrouillons] = useState<Record<string, Record<string, unknown>>>({});
  useEffect(() => { if (data) setBrouillons(Object.fromEntries(data.map((t) => [t.id, { ...t }]))); }, [data]);

  return (
    <Carte
      titre="Équipes"
      action={<Button size="sm" className="rounded-md" onClick={() => ajouter({ name: "Nouvelle équipe", sort_order: (data?.length ?? 0) + 1 })}><Plus /> Ajouter</Button>}
    >
      <div className="grid gap-4">
        {(data ?? []).map((item) => {
          const b = brouillons[item.id] ?? {};
          const maj = (cle: string, v: unknown) => setBrouillons((e) => ({ ...e, [item.id]: { ...e[item.id], [cle]: v } }));
          return (
            <LigneEditable key={item.id} onSave={() => sauvegarder(b as LigneQuelconque)} onDelete={() => supprimer(item.id)}>
              <Champ label="Nom de l’équipe" value={String(b["name"] ?? "")} onChange={(v) => maj("name", v)} />
              <Champ label="Championnat / catégorie" value={String(b["category"] ?? "")} onChange={(v) => maj("category", v)} />
              <Champ label="Effectif" value={String(b["squad"] ?? "")} onChange={(v) => maj("squad", v)} />
              <Champ label="Encadrement" value={String(b["coach"] ?? "")} onChange={(v) => maj("coach", v)} />
              <Champ label="Horaires d’entraînement" value={String(b["schedule"] ?? "")} onChange={(v) => maj("schedule", v)} />
              <Champ label="Ordre d’affichage" value={String(b["sort_order"] ?? "")} onChange={(v) => maj("sort_order", Number(v) || 0)} />
              <ChampImage label="Photo de l’équipe" value={String(b["image_url"] ?? "")} onChange={(v) => maj("image_url", v)} />
              <div className="sm:col-span-2">
                <Champ label="Objectif de la saison" multiligne value={String(b["goal"] ?? "")} onChange={(v) => maj("goal", v)} />
              </div>
            </LigneEditable>
          );
        })}
      </div>
    </Carte>
  );
}

function OngletJoueurs() {
  const { data } = useJoueurs();
  const { data: equipes } = useEquipes();
  const { sauvegarder, supprimer, ajouter } = useTable("players", "players");
  const [brouillons, setBrouillons] = useState<Record<string, Record<string, unknown>>>({});
  useEffect(() => { if (data) setBrouillons(Object.fromEntries(data.map((j) => [j.id, { ...j }]))); }, [data]);

  return (
    <Carte
      titre="Joueurs"
      action={<Button size="sm" className="rounded-md" onClick={() => ajouter({ name: "Nouveau joueur", team: equipes?.[0]?.name ?? "", sort_order: (data?.length ?? 0) + 1 })}><Plus /> Ajouter</Button>}
    >
      {(data ?? []).length === 0 && (
        <p className="mb-4 text-xs text-muted-foreground">Aucun joueur enregistré. Ajoutez-en pour afficher l’effectif sur la page Équipes.</p>
      )}
      <div className="grid gap-4">
        {(data ?? []).map((item) => {
          const b = brouillons[item.id] ?? {};
          const maj = (cle: string, v: unknown) => setBrouillons((e) => ({ ...e, [item.id]: { ...e[item.id], [cle]: v } }));
          return (
            <LigneEditable key={item.id} onSave={() => sauvegarder(b as LigneQuelconque)} onDelete={() => supprimer(item.id)}>
              <Champ label="Nom du joueur" value={String(b["name"] ?? "")} onChange={(v) => maj("name", v)} />
              <Champ label="Poste" value={String(b["position"] ?? "")} onChange={(v) => maj("position", v)} />
              <Champ label="Numéro" value={String(b["number"] ?? "")} onChange={(v) => maj("number", v)} />
              <Champ label="Équipe" value={String(b["team"] ?? "")} onChange={(v) => maj("team", v)} />
              <Champ label="Ordre d’affichage" value={String(b["sort_order"] ?? "")} onChange={(v) => maj("sort_order", Number(v) || 0)} />
              <ChampImage label="Photo du joueur" value={String(b["image_url"] ?? "")} onChange={(v) => maj("image_url", v)} />
            </LigneEditable>
          );
        })}
      </div>
    </Carte>
  );
}

function OngletPartenaires() {
  const { data } = usePartenaires();
  const { sauvegarder, supprimer, ajouter } = useTable("partners", "partners");
  const [brouillons, setBrouillons] = useState<Record<string, Record<string, unknown>>>({});
  useEffect(() => { if (data) setBrouillons(Object.fromEntries(data.map((p) => [p.id, { ...p }]))); }, [data]);

  return (
    <Carte
      titre="Partenaires"
      action={<Button size="sm" className="rounded-md" onClick={() => ajouter({ name: "Nouveau partenaire", sort_order: (data?.length ?? 0) + 1 })}><Plus /> Ajouter</Button>}
    >
      {(data ?? []).length === 0 && (
        <p className="mb-4 text-xs text-muted-foreground">Aucun partenaire enregistré. Ajoutez-en pour les afficher sur la page Partenaires.</p>
      )}
      <div className="grid gap-4">
        {(data ?? []).map((item) => {
          const b = brouillons[item.id] ?? {};
          const maj = (cle: string, v: unknown) => setBrouillons((e) => ({ ...e, [item.id]: { ...e[item.id], [cle]: v } }));
          return (
            <LigneEditable key={item.id} onSave={() => sauvegarder(b as LigneQuelconque)} onDelete={() => supprimer(item.id)}>
              <Champ label="Nom du partenaire" value={String(b["name"] ?? "")} onChange={(v) => maj("name", v)} />
              <Champ label="Formule (Supporter, Partenaire…)" value={String(b["tier"] ?? "")} onChange={(v) => maj("tier", v)} />
              <Champ label="Site internet" value={String(b["website"] ?? "")} onChange={(v) => maj("website", v)} />
              <Champ label="Ordre d’affichage" value={String(b["sort_order"] ?? "")} onChange={(v) => maj("sort_order", Number(v) || 0)} />
              <ChampImage label="Logo du partenaire" value={String(b["logo_url"] ?? "")} onChange={(v) => maj("logo_url", v)} />
              <div className="sm:col-span-2">
                <Champ label="Description" multiligne value={String(b["description"] ?? "")} onChange={(v) => maj("description", v)} />
              </div>
            </LigneEditable>
          );
        })}
      </div>
    </Carte>
  );
}
