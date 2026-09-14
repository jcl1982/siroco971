import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import { useGalerie } from "@/lib/site-content";
import heroMatch from "@/assets/hero-match.jpg";
import newsAcademy from "@/assets/news-academy.jpg";
import newsSupporters from "@/assets/news-supporters.jpg";
import newsTeam from "@/assets/news-team.jpg";

export const Route = createFileRoute("/medias")({
  head: () => ({
    meta: [
      { title: "Photos & vidéos — Siroco Abymes" },
      { name: "description", content: "La galerie du Siroco des Abymes : photos des matchs, de l’école de foot et de la vie du club." },
      { property: "og:title", content: "Photos & vidéos — Siroco Abymes" },
      { property: "og:description", content: "Revivez les moments forts du Siroco des Abymes en images." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageMedias,
});

const galerieDefaut = [heroMatch, newsTeam, newsAcademy, newsSupporters, heroMatch, newsTeam];

function PageMedias() {
  const [onglet, setOnglet] = useState<"photos" | "videos">("photos");
  const [agrandie, setAgrandie] = useState<string | null>(null);
  const { data } = useGalerie();
  const photos = (data ?? []).filter((photo) => photo.image_url).map((photo) => photo.image_url);
  const liste = photos.length ? photos : galerieDefaut;

  return (
    <SiteShell>
      <EnTetePage titre="Médias" sousTitre="Les images du Siroco : matchs, entraînements, école de foot et moments de fête au stade." image={newsSupporters} />
      <section className="mx-auto max-w-[1440px] px-5 py-14">
        <div className="flex flex-wrap items-center gap-8">
          <TitreSection>Galerie</TitreSection>
          <div className="flex gap-7 text-[10px] font-black uppercase">
            <button type="button" onClick={() => setOnglet("photos")} className={onglet === "photos" ? "border-b-2 border-primary pb-1 text-primary" : "text-muted-foreground"}>Photos</button>
            <button type="button" onClick={() => setOnglet("videos")} className={onglet === "videos" ? "border-b-2 border-primary pb-1 text-primary" : "text-muted-foreground"}>Vidéos</button>
          </div>
        </div>

        {onglet === "photos" ? (
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {liste.map((image, index) => (
              <button key={`${image}-${index}`} type="button" onClick={() => setAgrandie(image)} className="overflow-hidden rounded-xl">
                <img src={image} alt={`Galerie Siroco ${index + 1}`} loading="lazy" className="aspect-[1.45/1] h-full w-full object-cover transition-transform hover:scale-105" />
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">Les vidéos du club arrivent bientôt. En attendant, retrouvez nos images ci-dessus et suivez-nous sur les réseaux.</p>
        )}
      </section>

      {agrandie && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/90 p-6" role="dialog" aria-modal="true" onClick={() => setAgrandie(null)}>
          <button type="button" aria-label="Fermer" className="absolute right-6 top-6 text-primary-foreground" onClick={() => setAgrandie(null)}><X className="h-7 w-7" /></button>
          <img src={agrandie} alt="Photo agrandie" className="max-h-[80vh] w-auto rounded-xl object-contain" />
        </div>
      )}
    </SiteShell>
  );
}
