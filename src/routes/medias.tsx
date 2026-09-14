import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Film, X } from "lucide-react";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import { formatDateFr, useGalerie, useMatchs } from "@/lib/site-content";
import heroMatch from "@/assets/hero-match.jpg";
import newsAcademy from "@/assets/news-academy.jpg";
import newsSupporters from "@/assets/news-supporters.jpg";
import newsTeam from "@/assets/news-team.jpg";

export const Route = createFileRoute("/medias")({
  head: () => ({
    meta: [
      { title: "Photos & vidéos — Siroco Abymes" },
      { name: "description", content: "La galerie du Siroco des Abymes : photos des matchs, de l’école de foot et vidéos des rencontres de la saison." },
      { property: "og:title", content: "Photos & vidéos — Siroco Abymes" },
      { property: "og:description", content: "Revivez les moments forts du Siroco des Abymes en images et en vidéos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageMedias,
});

const galerieDefaut = [
  { url: heroMatch, legende: "Coup d’envoi au Stade Municipal des Abymes" },
  { url: newsTeam, legende: "L’équipe première avant la rencontre" },
  { url: newsAcademy, legende: "Séance de l’école de football" },
  { url: newsSupporters, legende: "Les supporters du Siroco en tribune" },
];

function PageMedias() {
  const [onglet, setOnglet] = useState<"photos" | "videos">("photos");
  const [agrandie, setAgrandie] = useState<string | null>(null);
  const { data } = useGalerie();
  const { data: matchs } = useMatchs();
  const photos = (data ?? []).filter((photo) => photo.image_url).map((photo) => ({ url: photo.image_url, legende: photo.caption }));
  const liste = photos.length ? photos : galerieDefaut;
  const videos = (matchs ?? []).filter((match) => match.video_url);

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
              <figure key={`${image.url}-${index}`}>
                <button type="button" onClick={() => setAgrandie(image.url)} className="block w-full overflow-hidden rounded-xl">
                  <img src={image.url} alt={image.legende || `Galerie Siroco ${index + 1}`} loading="lazy" className="aspect-[1.45/1] h-full w-full object-cover transition-transform hover:scale-105" />
                </button>
                {image.legende && <figcaption className="mt-2 text-[11px] text-muted-foreground">{image.legende}</figcaption>}
              </figure>
            ))}
          </div>
        ) : videos.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((match) => (
              <Link key={match.id} to="/match/$id" params={{ id: match.id }} className="rounded-xl border border-border bg-secondary/40 p-5 hover:border-primary">
                <Film className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-impact text-lg uppercase">{match.home_team} vs {match.away_team}</h3>
                <p className="text-[11px] text-muted-foreground">{match.competition} {match.matchday} · {formatDateFr(match.kickoff)}</p>
                <span className="mt-3 inline-block text-[10px] font-black uppercase text-primary">Voir la vidéo →</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Les vidéos des rencontres sont publiées sur les fiches de match. Aucune vidéo n’est disponible pour le moment.
          </p>
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
