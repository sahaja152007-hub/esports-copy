import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { RoundGroup } from "@/components/match-row";
import { regions, rewards, rounds, tournaments } from "@/lib/vexa-data";

export const Route = createFileRoute("/tournaments")({
  head: () => ({
    meta: [
      { title: "Tournament overview — VEXA Winter Cup" },
      {
        name: "description",
        content:
          "Format, schedule, prize breakdown and participating regions for the VEXA Winter Cup college esports season.",
      },
      { property: "og:title", content: "Tournament overview — VEXA Winter Cup" },
      {
        property: "og:description",
        content: "Format, schedule, prizes and regions for the VEXA Winter Cup.",
      },
    ],
  }),
  component: TournamentsPage,
});

function TournamentsPage() {
  return (
    <main className="pb-16">
      <PageHeader
        eyebrow="Season 04 · Winter Circuit"
        title="Winter Cup — tournament overview"
        lead="A five-round group stage across six campus regions, then a single-elimination bracket decided on the main stage. Everything a team needs to know before the first whistle."
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
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { k: "Teams", v: "16" },
            { k: "Regions", v: "6" },
            { k: "Matches", v: "48" },
            { k: "Prize pool", v: "$40k" },
          ].map((s) => (
            <div key={s.k} className="glass rounded-xl p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.k}</div>
              <div className="mt-1 font-display text-2xl font-bold">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="font-display text-lg font-bold tracking-tight">Format &amp; rules</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="glass rounded-xl p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Group stage
            </div>
            <p className="mt-2 text-[13px] text-pretty text-muted">
              Four groups of four. Every team plays five best-of-one rounds; three points per win.
              Top two advance.
            </p>
          </div>
          <div className="glass rounded-xl p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Playoffs
            </div>
            <p className="mt-2 text-[13px] text-pretty text-muted">
              Single elimination, best of three. Grand Final is best of five with a map veto on
              stage.
            </p>
          </div>
          <div className="glass rounded-xl p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Roster rules
            </div>
            <p className="mt-2 text-[13px] text-pretty text-muted">
              Five starters, one substitute. All players must be enrolled at the represented campus.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
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

      <section className="mx-auto max-w-7xl px-6 pb-10">
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

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <h2 className="font-display text-lg font-bold tracking-tight">Participating regions</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <div key={r.name} className="glass rounded-lg p-4 transition hover:border-accent/30">
              <div className="font-display text-[13px] font-semibold">{r.name}</div>
              <div className="font-mono text-[10px] text-muted">{r.meta}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-lg font-bold tracking-tight">Other open tournaments</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {tournaments.map((t) => (
            <div
              key={t.slug}
              className="glass rounded-xl p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {t.game}
              </span>
              <h3 className="mt-2 font-display text-base font-semibold">{t.name}</h3>
              <p className="mt-1 text-[12px] text-muted">{t.meta}</p>
              <span className="mt-3 inline-block rounded bg-foreground/5 px-2 py-1 font-mono text-[10px] text-accent">
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
