import { createFileRoute } from "@tanstack/react-router";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import { useActualites } from "@/lib/site-content";
import newsAcademy from "@/assets/news-academy.jpg";
import newsSupporters from "@/assets/news-supporters.jpg";
import newsTeam from "@/assets/news-team.jpg";

export const Route = createFileRoute("/actualites")({
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search["q"] === "string" ? search["q"] : "" }),
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

const actualitesDefaut = [
  { id: "1", title: "Reprise des entraînements", excerpt: "Les équipes du Siroco ont repris le chemin des terrains pour la nouvelle saison !", category: "Club", published_on: "2025-09-12", image_url: "" },
  { id: "2", title: "Inscriptions saison 2025–2026", excerpt: "Les inscriptions sont ouvertes. Rejoignez la famille Siroco !", category: "Inscriptions", published_on: "2025-09-05", image_url: "" },
  { id: "3", title: "Stage jeunes pendant les vacances", excerpt: "Un stage de perfectionnement est organisé du 20 au 24 octobre.", category: "Formation", published_on: "2025-09-01", image_url: "" },
];

function PageActualites() {
  const { q } = Route.useSearch();
  const { data } = useActualites();
  const source = (data ?? []).length ? data! : actualitesDefaut;
  const recherche = q.trim().toLowerCase();
  const liste = recherche
    ? source.filter((actu) => `${actu.title} ${actu.excerpt} ${actu.category}`.toLowerCase().includes(recherche))
    : source;

  return (
    <SiteShell>
      <EnTetePage titre="Actualités" sousTitre="Résultats, inscriptions, stages et coulisses : suivez la vie du Siroco des Abymes semaine après semaine." image={newsTeam} />
      <section className="mx-auto max-w-[1440px] px-5 py-14">
        <TitreSection>{recherche ? `Résultats pour « ${q} »` : "Toutes les actualités"}</TitreSection>
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
