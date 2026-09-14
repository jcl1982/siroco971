import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoAsset from "@/assets/siroco-logo.png.asset.json";

export const Route = createFileRoute("/auth")({
  component: PageAuth,
  head: () => ({
    meta: [
      { title: "Espace membre — Siroco Abymes" },
      { name: "description", content: "Connexion à l’espace d’administration du Siroco des Abymes." },
      { property: "og:title", content: "Espace membre — Siroco Abymes" },
      { property: "og:description", content: "Connexion à l’espace d’administration du club." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Mode = "connexion" | "inscription" | "oubli";

function PageAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("connexion");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  async function envoyer(event: React.FormEvent) {
    event.preventDefault();
    setChargement(true);
    setMessage(null);
    if (mode === "oubli") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setChargement(false);
      if (error) return setMessage("Envoi impossible : " + error.message);
      setMessage("Un lien de réinitialisation a été envoyé à votre adresse email. Vérifiez votre boîte de réception.");
      setMode("connexion");
      return;
    }
    if (mode === "connexion") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
      setChargement(false);
      if (error) return setMessage("Connexion impossible : vérifiez l’email et le mot de passe.");
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password: motDePasse,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setChargement(false);
      if (error) return setMessage("Création impossible : " + error.message);
      setMessage("Compte créé. Vérifiez votre boîte mail pour confirmer, puis connectez-vous.");
      setMode("connexion");
    }
  }

  async function google() {
    const resultat = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (resultat.error) return setMessage("Connexion Google impossible.");
    if (resultat.redirected) return;
    navigate({ to: "/admin" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-5 py-12">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-14 w-14 object-contain" />
          <div>
            <h1 className="font-impact text-2xl uppercase leading-none">Espace membre</h1>
            <p className="text-xs text-muted-foreground">
              {mode === "oubli" ? "Réinitialisation du mot de passe" : "Administration du site"}
            </p>
          </div>
        </div>

        <form onSubmit={envoyer} className="mt-7 grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {mode !== "oubli" && (
            <div className="grid gap-1.5">
              <Label htmlFor="mdp">Mot de passe</Label>
              <Input
                id="mdp"
                type="password"
                required
                minLength={6}
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
              />
            </div>
          )}
          <Button type="submit" className="btn-3d h-11 rounded-md uppercase" disabled={chargement}>
            {mode === "connexion" && "Se connecter"}
            {mode === "inscription" && "Créer le compte"}
            {mode === "oubli" && "Envoyer le lien de réinitialisation"}
          </Button>
        </form>

        {mode === "connexion" && (
          <>
            <Button variant="outline" className="mt-3 h-11 w-full rounded-md" onClick={google}>
              Continuer avec Google
            </Button>
            <button
              type="button"
              className="mt-4 w-full text-xs text-muted-foreground hover:text-primary"
              onClick={() => { setMode("oubli"); setMessage(null); }}
            >
              Mot de passe oublié&nbsp;?
            </button>
          </>
        )}

        {mode === "oubli" && (
          <button
            type="button"
            className="mt-4 w-full text-xs text-primary underline"
            onClick={() => { setMode("connexion"); setMessage(null); }}
          >
            Retour à la connexion
          </button>
        )}

        {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}

        {(mode === "connexion" || mode === "inscription") && (
          <button
            type="button"
            className="mt-5 w-full text-xs text-primary underline"
            onClick={() => setMode(mode === "connexion" ? "inscription" : "connexion")}
          >
            {mode === "connexion" ? "Créer le premier compte administrateur" : "J’ai déjà un compte"}
          </button>
        )}
      </div>
    </main>
  );
}
