import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TeamCrest } from "@/components/site-chrome";
import { MatchRow } from "@/components/match-row";
import { rounds, teamBySlug } from "@/lib/vexa-data";

export const Route = createFileRoute("/teams/$slug")({
  loader: ({ params }) => {
    const team = teamBySlug(params.slug);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Team not found — NMIMS VEXA" }, { name: "robots", content: "noindex" }],
      };
    }
    const { team } = loaderData;
    const description = `${team.name} — ${team.region} · ${team.game}. Roster, record and upcoming NMIMS Inter-Campus matches.`;
    return {
      meta: [
        { title: `${team.name} — NMIMS Team Profile` },
        { name: "description", content: description },
        { property: "og:title", content: `${team.name} — NMIMS Team Profile` },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: TeamNotFound,
  component: TeamProfile,
});

function TeamNotFound() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-center">
      <h1 className="font-display text-2xl font-bold">That NMIMS team isn't registered</h1>
      <Link
        to="/teams"
        className="mt-5 inline-block rounded-lg bg-accent px-5 py-2.5 font-semibold text-accent-foreground"
      >
        Back to teams
      </Link>
    </main>
  );
}

function TeamProfile() {
  const { team } = Route.useLoaderData();
  const matches = rounds
    .flatMap((r) => r.matches)
    .filter((m) => m.a === team.name || m.b === team.name);

  return (
    <main className="pb-16">
      <header className="mx-auto max-w-7xl px-6 pt-10 pb-6">
        <Link to="/teams" className="font-mono text-[11px] uppercase tracking-wider text-accent">
          ← Campus Teams
        </Link>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <TeamCrest short={team.short} size="lg" />
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">{team.name}</h1>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
              {team.region} · {team.game} · Captain {team.captain}
            </p>
          </div>
          <div className="ml-auto flex gap-6 font-mono text-[11px] uppercase tracking-wider text-muted">
            <span>
              <span className="block font-display text-2xl font-bold text-foreground">
                {team.wins}
              </span>
              wins
            </span>
            <span>
              <span className="block font-display text-2xl font-bold text-foreground">
                {team.losses}
              </span>
              losses
            </span>
            <span>
              <span className="block font-display text-2xl font-bold text-accent">
                {team.points}
              </span>
              points
            </span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-4">
        <h2 className="font-display text-lg font-bold tracking-tight">Campus Roster</h2>
        <div className="glass mt-4 overflow-hidden rounded-xl">
          <table className="w-full text-left">
            <thead className="font-mono text-[10px] uppercase tracking-widest text-muted">
              <tr className="border-b border-border/70">
                <th className="px-4 py-3">Player Handle</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {team.roster.map((p) => (
                <tr
                  key={p.handle}
                  className="border-b border-border/50 last:border-b-0 hover:bg-foreground/5"
                >
                  <td className="px-4 py-3 font-display font-semibold text-accent">{p.handle}</td>
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3 text-muted">{p.role}</td>
                  <td className="px-4 py-3 text-right font-mono">{p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="font-display text-lg font-bold tracking-tight">Inter-Campus Matches</h2>
        <div className="mt-4 space-y-2">
          {matches.map((m) => (
            <MatchRow key={m.id} match={m} />
          ))}
        </div>
      </section>
    </main>
  );
}
