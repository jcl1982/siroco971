import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock3, Film, MapPin } from "lucide-react";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import {
  formatDateFr,
  formatHeureFr,
  matchJoue,
  resultatSiroco,
  useClassement,
  useMatchs,
  type Match,
} from "@/lib/site-content";
import heroMatch from "@/assets/hero-match.jpg";

export const Route = createFileRoute("/calendrier")({
  head: () => ({
    meta: [
      { title: "Calendrier & classement — Siroco Abymes" },
      { name: "description", content: "Tous les matchs du Siroco des Abymes, les résultats de la saison et le classement du championnat." },
      { property: "og:title", content: "Calendrier & classement — Siroco Abymes" },
      { property: "og:description", content: "Matchs, résultats et classement du Siroco des Abymes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PageCalendrier,
});

const couleurIssue = {
  victoire: "bg-primary text-primary-foreground",
  nul: "bg-muted text-foreground",
  defaite: "bg-destructive text-destructive-foreground",
} as const;

function CarteMatch({ match }: { match: Match }) {
  const joue = matchJoue(match);
  const issue = resultatSiroco(match);
  return (
    <Link
      to="/match/$id"
      params={{ id: match.id }}
      className="block rounded-xl border border-border bg-secondary/40 p-5 transition-colors hover:border-primary"
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-primary">
        {match.competition}{match.matchday ? ` — ${match.matchday}` : ""}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h3 className="font-impact text-xl uppercase">
          {match.home_team} <span className="text-primary">vs</span> {match.away_team}
        </h3>
        {joue ? (
          <span className={`rounded-md px-3 py-1 font-impact text-sm ${issue ? couleurIssue[issue] : "bg-foreground text-primary-foreground"}`}>
            {match.home_score} – {match.away_score}
          </span>
        ) : (
          <span className="rounded-full border border-border px-3 py-1 text-[10px] font-black uppercase text-muted-foreground">À venir</span>
        )}
        {match.video_url && <Film className="h-4 w-4 text-primary" aria-label="Vidéo disponible" />}
      </div>
      <div className="mt-3 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-3">
        <span className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-primary" />{formatDateFr(match.kickoff)}</span>
        <span className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-primary" />{formatHeureFr(match.kickoff)}</span>
        <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" />{match.venue}</span>
      </div>
      {match.summary && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{match.summary}</p>}
      <span className="mt-3 inline-block text-[10px] font-black uppercase text-primary">Voir la fiche du match →</span>
    </Link>
  );
}

function PageCalendrier() {
  const { data: matchs } = useMatchs();
  const { data: classement } = useClassement();
  const liste = matchs ?? [];
  const aVenir = liste.filter((m) => !matchJoue(m));
  const joues = liste.filter(matchJoue).reverse();
  const listeClassement = classement ?? [];

  const bilan = {
    v: joues.filter((m) => resultatSiroco(m) === "victoire").length,
    n: joues.filter((m) => resultatSiroco(m) === "nul").length,
    d: joues.filter((m) => resultatSiroco(m) === "defaite").length,
  };

  return (
    <SiteShell>
      <EnTetePage
        titre="Calendrier"
        sousTitre="Tous les rendez-vous de la saison, les résultats avec les comptes-rendus et le classement du championnat."
        image={heroMatch}
      />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <TitreSection>Prochains matchs</TitreSection>
          <div className="mt-6 space-y-3">
            {aVenir.length ? aVenir.map((match) => <CarteMatch key={match.id} match={match} />) : (
              <p className="text-sm text-muted-foreground">Aucun match programmé pour le moment.</p>
            )}
          </div>

          <div className="mt-12">
            <TitreSection>Résultats</TitreSection>
            <div className="mt-4 flex gap-3 text-[11px] font-black uppercase">
              <span className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">{bilan.v} victoires</span>
              <span className="rounded-md bg-muted px-3 py-1.5">{bilan.n} nuls</span>
              <span className="rounded-md border border-border px-3 py-1.5 text-muted-foreground">{bilan.d} défaites</span>
            </div>
            <div className="mt-5 space-y-3">
              {joues.length ? joues.map((match) => <CarteMatch key={match.id} match={match} />) : (
                <p className="text-sm text-muted-foreground">Les premiers résultats de la saison seront publiés ici.</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <TitreSection>Classement</TitreSection>
          <table className="mt-6 w-full text-left text-xs">
            <thead className="bg-muted uppercase"><tr><th className="p-2">#</th><th className="p-2">Équipe</th><th className="p-2 text-center">Pts</th><th className="p-2 text-center">J</th><th className="p-2 text-center">Diff</th></tr></thead>
            <tbody>
              {listeClassement.map((ligne, index) => (
                <tr key={ligne.id} className={index === 0 ? "bg-secondary font-black text-primary" : "border-b border-border"}>
                  <td className="p-2">{ligne.position}</td>
                  <td className="p-2">{ligne.team}</td>
                  <td className="p-2 text-center">{ligne.points}</td>
                  <td className="p-2 text-center">{ligne.played}</td>
                  <td className="p-2 text-center">{ligne.goal_diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 rounded-xl border border-border bg-secondary/40 p-5 text-xs leading-relaxed text-muted-foreground">
            <strong className="block font-impact text-base uppercase text-foreground">Infos pratiques</strong>
            Entrée libre pour les licenciés du club. Buvette tenue par les parents à chaque match à domicile. Les horaires peuvent être modifiés par la ligue : vérifiez cette page la veille de la rencontre.
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
