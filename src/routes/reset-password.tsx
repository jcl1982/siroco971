import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoAsset from "@/assets/siroco-logo.png.asset.json";

export const Route = createFileRoute("/reset-password")({
  component: PageResetPassword,
  head: () => ({
    meta: [
      { title: "Réinitialiser le mot de passe — Siroco Abymes" },
      { name: "description", content: "Définissez un nouveau mot de passe pour votre compte Siroco." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function PageResetPassword() {
  const navigate = useNavigate();
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [chargement, setChargement] = useState(false);

  useEffect(() => {
    // Le lien de réinitialisation arrive avec type=recovery dans l'ancre.
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      // Pas un flux de réinitialisation — rediriger vers l'auth.
      navigate({ to: "/auth" });
    }
  }, [navigate]);

  async function envoyer(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);
    if (motDePasse.length < 6) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (motDePasse !== confirmation) {
      setMessage("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setChargement(true);
    const { error } = await supabase.auth.updateUser({ password: motDePasse });
    setChargement(false);
    if (error) {
      setMessage("Réinitialisation impossible : " + error.message);
      return;
    }
    setOk(true);
    setMessage("Votre mot de passe a été mis à jour. Vous pouvez vous connecter.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-5 py-12">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Logo du Siroco des Abymes" className="h-14 w-14 object-contain" />
          <div>
            <h1 className="font-impact text-2xl uppercase leading-none">Nouveau mot de passe</h1>
            <p className="text-xs text-muted-foreground">Réinitialisation du compte</p>
          </div>
        </div>

        {ok ? (
          <div className="mt-7 grid gap-4 text-center">
            <p className="text-sm text-muted-foreground">{message}</p>
            <Button className="btn-3d h-11 rounded-md uppercase" onClick={() => navigate({ to: "/auth" })}>
              Aller à la connexion
            </Button>
          </div>
        ) : (
          <form onSubmit={envoyer} className="mt-7 grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="mdp">Nouveau mot de passe</Label>
              <Input
                id="mdp"
                type="password"
                required
                minLength={6}
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="confirm">Confirmer le mot de passe</Label>
              <Input
                id="confirm"
                type="password"
                required
                minLength={6}
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </div>
            <Button type="submit" className="btn-3d h-11 rounded-md uppercase" disabled={chargement}>
              Réinitialiser le mot de passe
            </Button>
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
