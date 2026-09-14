import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import { useActualites } from "@/lib/site-content";
import newsAcademy from "@/assets/news-academy.jpg";
import newsSupporters from "@/assets/news-supporters.jpg";
import newsTeam from "@/assets/news-team.jpg";

export const Route = createFileRoute("/actualites")({
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search["q"] === "string" ? search["q"] : undefined }) as { q?: string },
  head: () => ({
    meta: [
      { title: "Actualités du club — Siroco Abymes" },
      { name: "description", content: "Résultats, inscriptions, stages et vie du club : toute l’actualité du Siroco des Abymes." },
      { property: "og:title", content: "Actualités — Siroco Abymes" },
      { property: "og:description", content: "Toute l’actualité du Siroco des Abymes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageActualites,
});

const imagesDefaut = [newsAcademy, newsTeam, newsSupporters];

function PageActualites() {
  const { q = "" } = Route.useSearch();
  const { data } = useActualites();
  const [categorie, setCategorie] = useState<string>("Toutes");
  const source = data ?? [];
  const categories = ["Toutes", ...Array.from(new Set(source.map((actu) => actu.category)))];
  const recherche = q.trim().toLowerCase();

  const liste = source
    .filter((actu) => (categorie === "Toutes" ? true : actu.category === categorie))
    .filter((actu) => (recherche ? `${actu.title} ${actu.excerpt} ${actu.category}`.toLowerCase().includes(recherche) : true));

  return (
    <SiteShell>
      <EnTetePage titre="Actualités" sousTitre="Résultats, inscriptions, stages et coulisses : suivez la vie du Siroco des Abymes semaine après semaine." image={newsTeam} />
      <section className="mx-auto max-w-[1440px] px-5 py-14">
        <TitreSection>{recherche ? `Résultats pour « ${q} »` : "Toutes les actualités"}</TitreSection>

        {categories.length > 1 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategorie(item)}
                className={`rounded-full border px-4 py-1.5 text-[11px] font-black uppercase ${categorie === item ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary"}`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {liste.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">Aucune actualité ne correspond à cette recherche.</p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liste.map((actu, index) => (
              <article key={actu.id} className="overflow-hidden rounded-xl border border-border bg-background">
                <img src={actu.image_url || imagesDefaut[index % imagesDefaut.length]!} alt={actu.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{actu.category} · {new Date(actu.published_on).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <h3 className="mt-2 font-impact text-xl uppercase leading-tight">{actu.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{actu.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
