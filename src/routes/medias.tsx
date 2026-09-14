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
  component: PageMedias;
});

function PageMedias() {
  return null;
}
