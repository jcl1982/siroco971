import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { EnTetePage, SiteShell, TitreSection } from "@/components/site-shell";
import { formatDateFr, formatHeureFr, useClassement, useMatchs } from "@/lib/site-content";
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

const classementDefaut = [
  { id: "1", position: 1, team: "Siroco Abymes", points: 9, played: 3, goal_diff: "+6" },
  { id: "2", position: 2, team: "A.S. Rivière-Salée", points: 7, played: 3, goal_diff: "+4" },
  { id: "3", position: 3, team: "C.S. Baie-Mahault", points: 6, played: 3, goal_diff: "+2" },
  { id: "4", position: 4, team: "A.S. Gosier", points: 4, played: 3, goal_diff: "0" },
  { id: "5", position: 5, team: "U.S. Sainte-Anne", points: 3, played: 3, goal_diff: "-1" },
];

const matchsDefaut = [
  { id: "1", competition: "Championnat régional — Journée 3", home_team: "Siroco Abymes", away_team: "A.S. Rivière-Salée", kickoff: "2025-09-20T16:00:00Z", venue: "Stade Municipal des Abymes", home_score: null, away_score: null },
];

function PageCalendrier() {
  const { data: matchs } = useMatchs();
  const { data: classement } = useClassement();
  const listeMatchs = (matchs ?? []).length ? matchs! : matchsDefaut;
  const listeClassement = (classement ?? []).length ? classement! : classementDefaut;

  return (
    <SiteShell>
      <EnTetePage titre="Calendrier" sousTitre="Les rendez-vous de la saison, les résultats et le classement du championnat, mis à jour par le club." image={heroMatch} />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <TitreSection>Matchs de la saison</TitreSection>
          <div className="mt-6 space-y-3">
            {listeMatchs.map((match) => {
              const joue = match.home_score !== null && match.away_score !== null;
              return (
                <article key={match.id} className="rounded-xl border border-border bg-secondary/40 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{match.competition}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <h3 className="font-impact text-xl uppercase">{match.home_team} <span className="text-primary">vs</span> {match.away_team}</h3>
                    {joue && <span className="rounded-md bg-foreground px-3 py-1 font-impact text-sm text-primary-foreground">{match.home_score} – {match.away_score}</span>}
                  </div>
                  <div className="mt-3 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-3">
                    <span className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-primary" />{formatDateFr(match.kickoff)}</span>
                    <span className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-primary" />{formatHeureFr(match.kickoff)}</span>
                    <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" />{match.venue}</span>
                  </div>
                </article>
              );
            })}
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
        </div>
      </section>
    </SiteShell>
  );
}
