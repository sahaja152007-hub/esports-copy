import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, TeamCrest } from "@/components/site-chrome";
import { standings } from "@/lib/vexa-data";

export const Route = createFileRoute("/standings")({
  head: () => ({
    meta: [
      { title: "Standings — NMIMS Inter-Campus Championship" },
      {
        name: "description",
        content:
          "Live NMIMS Inter-Campus standings: wins, losses, map difference and points for every campus team.",
      },
      { property: "og:title", content: "Standings — NMIMS Inter-Campus Championship" },
      {
        property: "og:description",
        content: "Wins, losses, map difference and points for every NMIMS campus team.",
      },
    ],
  }),
  component: StandingsPage,
});

function StandingsPage() {
  return (
    <main className="pb-16">
      <PageHeader
        eyebrow="NMIMS 2026 · Group A"
        title="NMIMS Campus Standings"
        lead="Three points per win. Top teams in each group advance to the single-elimination playoff bracket."
      />

      <section className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass overflow-x-auto rounded-xl">
          <table className="w-full min-w-[640px] text-left">
            <thead className="font-mono text-[10px] uppercase tracking-widest text-muted">
              <tr className="border-b border-border/70">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3">Campus Region</th>
                <th className="px-4 py-3 text-right">W</th>
                <th className="px-4 py-3 text-right">L</th>
                <th className="px-4 py-3 text-right">Diff</th>
                <th className="px-4 py-3 text-right">PTS</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {standings.map((t, i) => (
                <tr
                  key={t.slug}
                  className="border-b border-border/50 last:border-b-0 hover:bg-foreground/5"
                >
                  <td className={`px-4 py-3 font-mono ${i < 2 ? "text-accent" : ""}`}>{i + 1}</td>
                  <td className="px-4 py-3">
                    <Link
                      to="/teams/$slug"
                      params={{ slug: t.slug }}
                      className="flex items-center gap-2.5 font-semibold transition-colors hover:text-accent"
                    >
                      <TeamCrest short={t.short} size="sm" />
                      {t.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted">{t.region}</td>
                  <td className="px-4 py-3 text-right font-mono">{t.wins}</td>
                  <td className="px-4 py-3 text-right font-mono text-muted">{t.losses}</td>
                  <td className="px-4 py-3 text-right font-mono">
                    {t.wins - t.losses > 0 ? `+${t.wins - t.losses}` : t.wins - t.losses}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">{t.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted">
          Accent rank = qualified for playoff bracket
        </p>
      </section>
    </main>
  );
}
