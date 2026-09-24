import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { RoundGroup } from "@/components/match-row";
import { regions, rewards, rounds } from "@/lib/vexa-data";

export const Route = createFileRoute("/tournaments")({
  head: () => ({
    meta: [
      { title: "Tournament Overview — NMIMS Inter-Campus Championship" },
      {
        name: "description",
        content:
          "Schedule, prize breakdown and participating campus regions for the NMIMS Inter-Campus Esports Championship.",
      },
      { property: "og:title", content: "Tournament Overview — NMIMS Inter-Campus Championship" },
      {
        property: "og:description",
        content: "Prize breakdown, current round and participating NMIMS campuses.",
      },
    ],
  }),
  component: TournamentsPage,
});

function TournamentsPage() {
  return (
    <main className="pb-16">
      <PageHeader
        eyebrow="NMIMS 2026 · Inter-Campus Circuit"
        title="NMIMS Inter-Campus Championship"
        lead="A 16-team inter-campus tournament across 6 NMIMS campus regions competing for college glory, trophies, and prize pools."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/register"
            className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-accent-foreground transition hover:brightness-110"
          >
            Register your team
          </Link>
          <Link
            to="/standings"
            className="rounded-lg bg-foreground/5 px-5 py-2.5 font-semibold ring-1 ring-border transition hover:bg-foreground/10"
          >
            View standings
          </Link>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { k: "Campus Teams", v: "16" },
            { k: "NMIMS Campuses", v: "6" },
            { k: "Matches", v: "48" },
            { k: "Prize pool", v: "₹50,000" },
          ].map((s) => (
            <div key={s.k} className="glass rounded-xl p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.k}</div>
              <div className="mt-1 font-display text-2xl font-bold">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="font-display text-lg font-bold tracking-tight">Prize breakdown</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {rewards.map((r) => (
            <div key={r.place} className="glass rounded-xl p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                {r.place}
              </div>
              <div className="mt-2 font-display text-3xl font-bold">{r.prize}</div>
              <p className="mt-2 text-[12px] text-pretty text-muted">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-lg font-bold tracking-tight">Current round</h2>
          <Link
            to="/fixtures"
            className="font-mono text-[11px] uppercase tracking-wider text-accent"
          >
            All fixtures →
          </Link>
        </div>
        {rounds[2] && <RoundGroup round={rounds[2].round} matches={rounds[2].matches} />}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <h2 className="font-display text-lg font-bold tracking-tight">Participating NMIMS Campuses</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <div key={r.name} className="glass rounded-lg p-4 transition hover:border-accent/30">
              <div className="font-display text-[13px] font-semibold">{r.name}</div>
              <div className="font-mono text-[10px] text-muted">{r.meta}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
