import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Le bucket « site-images » est privé (les buckets publics sont bloqués sur cet
 * espace de travail). Les URL « publiques » renvoient donc une erreur : on
 * télécharge l'image via le client (la politique de lecture autorise tout le
 * monde) et on l'affiche via une URL d'objet locale.
 */
const MARQUEUR = "/storage/v1/object/public/site-images/";

const cache = new Map<string, Promise<string>>();

function resoudre(url: string): Promise<string> {
  const i = url.indexOf(MARQUEUR);
  if (i < 0) return Promise.resolve(url);
  const chemin = url.slice(i + MARQUEUR.length);
  let promesse = cache.get(chemin);
  if (!promesse) {
    promesse = supabase.storage
      .from("site-images")
      .download(chemin)
      .then(({ data, error }) => {
        if (error || !data) {
          cache.delete(chemin);
          return url;
        }
        return URL.createObjectURL(data);
      });
    cache.set(chemin, promesse);
  }
  return promesse;
}

/** Renvoie une URL affichable : inchangée pour les images classiques, URL d'objet locale pour le stockage privé. */
export function useImageSecurisee(url: string | null | undefined): string {
  const [resolue, setResolue] = useState(url ?? "");
  useEffect(() => {
    let actif = true;
    if (!url) {
      setResolue("");
      return;
    }
    void resoudre(url).then((r) => {
      if (actif) setResolue(r);
    });
    return () => {
      actif = false;
    };
  }, [url]);
  return resolue;
}

/** <img> qui accepte aussi bien les images classiques que celles du stockage privé « site-images ». */
export function ImageSite({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const resolue = useImageSecurisee(typeof src === "string" ? src : "");
  return <img src={resolue} {...props} />;
}
