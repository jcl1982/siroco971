import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock3, Film, MapPin, Users, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, TitreSection } from "@/components/site-shell";
import { ImageSite } from "@/lib/image-stockage";
import {
  formatDateFr,
  formatHeureFr,
  lienVideoIntegrable,
  matchJoue,
  resultatSiroco,
  useMatch,
  useMatchs,
  type Match,
} from "@/lib/site-content";
import heroMatch from "@/assets/hero-match.jpg";

export const Route = createFileRoute("/match/$id")({
  head: () => ({
    meta: [
      { title: "Fiche de match — Siroco Abymes" },
      { name: "description", content: "Résultat, score, compte-rendu et vidéo du match du Siroco des Abymes." },
      { property: "og:title", content: "Fiche de match — Siroco Abymes" },
      { property: "og:description", content: "Score, buteurs, compte-rendu et vidéo de la rencontre." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageMatch,
});

const libelleResultat = { victoire: "Victoire", nul: "Match nul", defaite: "Défaite" } as const;

function PageMatch() {
  const { id } = Route.useParams();
  const { data: match, isLoading } = useMatch(id);
  const { data: tous } = useMatchs();

  if (isLoading) {
    return (
      <SiteShell>
        <p className="mx-auto max-w-[1440px] px-5 py-20 text-sm text-muted-foreground">Chargement de la fiche de match…</p>
      </SiteShell>
    );
  }

  if (!match) {
    return (
      <SiteShell>
        <section className="mx-auto max-w-[1440px] px-5 py-20">
          <h1 className="font-impact text-3xl uppercase">Match introuvable</h1>
          <p className="mt-3 text-sm text-muted-foreground">Cette rencontre n’existe plus ou a été retirée du calendrier.</p>
          <Button asChild className="btn-3d mt-6 h-12 rounded-md px-7 text-xs font-black uppercase"><Link to="/calendrier">Retour au calendrier →</Link></Button>
        </section>
      </SiteShell>
    );
  }

  const joue = matchJoue(match);
  const issue = resultatSiroco(match);
  const video = lienVideoIntegrable(match.video_url);
  const autres = (tous ?? []).filter((m) => m.id !== match.id).slice(0, 3);
  const image = match.image_url || heroMatch;

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-foreground text-primary-foreground">
        <ImageSite src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--foreground)_15%,color-mix(in_oklab,var(--foreground)_55%,transparent)_100%)]" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-14 lg:px-12">
          <Link to="/calendrier" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Calendrier
          </Link>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.35em] text-primary">
            {match.competition}{match.matchday ? ` · ${match.matchday}` : ""}
          </p>
          <h1 className="mt-3 font-brush text-[2.6rem] uppercase italic leading-[0.85] sm:text-[3.8rem]">
            {match.home_team} <span className="text-primary">vs</span> {match.away_team}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {joue ? (
              <>
                <span className="rounded-xl bg-primary px-6 py-3 font-impact text-3xl leading-none text-primary-foreground">
                  {match.home_score} – {match.away_score}
                </span>
                {issue && (
                  <span className="rounded-full border border-primary-foreground/40 px-4 py-1.5 text-[11px] font-black uppercase tracking-wide">
                    {libelleResultat[issue]}
                  </span>
                )}
              </>
            ) : (
              <span className="rounded-full bg-primary-foreground/15 px-5 py-2 text-[11px] font-black uppercase tracking-wide">À venir</span>
            )}
          </div>
          <div className="mt-6 grid gap-2 text-xs text-primary-foreground/85 sm:grid-cols-3">
            <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" />{formatDateFr(match.kickoff)}</span>
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary" />{formatHeureFr(match.kickoff)}</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{match.venue}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <TitreSection>{joue ? "Compte-rendu" : "Avant-match"}</TitreSection>
          {match.summary && <p className="mt-5 text-sm font-semibold leading-relaxed">{match.summary}</p>}
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {match.report || "Le compte-rendu de cette rencontre sera publié par le club."}
          </p>

          <div className="mt-10">
            <TitreSection>Vidéo du match</TitreSection>
            {video ? (
              <iframe
                title={`Vidéo ${match.home_team} vs ${match.away_team}`}
                src={video}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="mt-5 aspect-video w-full rounded-xl border border-border"
              />
            ) : match.video_url ? (
              <a href={match.video_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-5 py-3 text-xs font-black uppercase hover:border-primary">
                <Film className="h-4 w-4 text-primary" /> Voir la vidéo du match →
              </a>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">Aucune vidéo n’est encore disponible pour cette rencontre.</p>
            )}
          </div>
        </div>

        <aside className="grid content-start gap-4">
          <TitreSection>Feuille de match</TitreSection>
          <dl className="grid gap-3 rounded-xl border border-border bg-secondary/40 p-5 text-sm">
            <div><dt className="text-[10px] font-bold uppercase tracking-wide text-primary">Compétition</dt><dd>{match.competition} {match.matchday}</dd></div>
            {match.scorers && <div><dt className="text-[10px] font-bold uppercase tracking-wide text-primary">Buteurs</dt><dd className="text-muted-foreground">{match.scorers}</dd></div>}
            {match.referee && <div><dt className="text-[10px] font-bold uppercase tracking-wide text-primary flex items-center gap-1.5"><Flag className="h-3.5 w-3.5" />Arbitrage</dt><dd className="text-muted-foreground">{match.referee}</dd></div>}
            {match.attendance && <div><dt className="text-[10px] font-bold uppercase tracking-wide text-primary flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />Affluence</dt><dd className="text-muted-foreground">{match.attendance}</dd></div>}
            <div><dt className="text-[10px] font-bold uppercase tracking-wide text-primary">Stade</dt><dd className="text-muted-foreground">{match.venue}</dd></div>
          </dl>

          {autres.length > 0 && (
            <>
              <TitreSection>Autres rencontres</TitreSection>
              <div className="grid gap-2">
                {autres.map((autre: Match) => (
                  <Link key={autre.id} to="/match/$id" params={{ id: autre.id }} className="rounded-lg border border-border bg-background p-4 hover:border-primary">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{autre.competition} {autre.matchday}</p>
                    <p className="mt-1 font-impact text-base uppercase">{autre.home_team} vs {autre.away_team}</p>
                    <p className="text-[11px] text-muted-foreground">{formatDateFr(autre.kickoff)}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </aside>
      </section>
    </SiteShell>
  );
}
