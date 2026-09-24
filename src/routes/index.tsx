import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusBadge, TeamCrest } from "@/components/site-chrome";
import { regions, rewards, rounds, standings, teams, tournaments } from "@/lib/vexa-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEXA — The tournament layer for college esports" },
      {
        name: "description",
        content:
          "Fifty-one colleges, six regions, one bracket. Track fixtures, standings, rewards and register your campus team on VEXA.",
      },
      { property: "og:title", content: "VEXA — The tournament layer for college esports" },
      {
        property: "og:description",
        content: "Fifty-one colleges, six regions, one bracket. Register your campus team.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = teams.slice(0, 3);
  const liveMatch = rounds.flatMap((r) => r.matches).find((m) => m.status === "live");

  return (
    <main>
      {/* Hero */}
      <header className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
        <div className="rise">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Season 04 · Winter Circuit
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.03] tracking-tight text-balance md:text-6xl">
            The arena goes dark.
            <br />
            The banners rise.
          </h1>
          <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-pretty text-muted">
            Fifty-one colleges. Six regions. One bracket that decides who carries the trophy across
            campus. Every match, every round, one clear scoreboard.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-accent-foreground transition hover:brightness-110"
            >
              Register your team
            </Link>
            <Link
              to="/fixtures"
              className="rounded-lg bg-foreground/5 px-5 py-2.5 font-semibold ring-1 ring-border transition hover:bg-foreground/10"
            >
              Browse fixtures
            </Link>
          </div>
          <div className="mt-8 flex gap-7 border-t border-border/60 pt-6 font-mono text-[11px] uppercase tracking-wider text-muted">
            <span>
              <span className="block font-display text-2xl font-bold text-foreground">51</span>
              colleges
            </span>
            <span>
              <span className="block font-display text-2xl font-bold text-foreground">6</span>
              regions
            </span>
            <span>
              <span className="block font-display text-2xl font-bold text-foreground">$40k</span>
              prize pool
            </span>
          </div>
        </div>

        {/* Live scoreboard */}
        <div className="rise [animation-delay:80ms]">
          <div className="glass relative overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5">
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-live">
                <span className="livedot size-1.5 rounded-full bg-live" />
                Live · Semifinal
              </span>
              <span className="font-mono text-[10px] text-muted">Winter Cup</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-2 p-5">
              <div className="flex flex-col items-center gap-2.5 text-center">
                <TeamCrest short="GH" size="lg" />
                <span className="font-display text-[13px] leading-tight font-semibold">
                  Granite
                  <br />
                  Hollow
                </span>
                <span className="font-mono text-[10px] text-muted">Mountain West</span>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold tracking-tight">
                  {liveMatch?.score?.replace(" : ", " ") ?? "1 1"}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                  Map 3 · 07:12
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 text-center">
                <TeamCrest short="MC" size="lg" alt />
                <span className="font-display text-[13px] leading-tight font-semibold">
                  Maple
                  <br />
                  Crest
                </span>
                <span className="font-mono text-[10px] text-muted">Heartland</span>
              </div>
            </div>
            <div className="border-t border-border/70 px-5 py-3 text-[11px] text-muted">
              Winner takes <span className="font-semibold text-foreground">$18,000</span> + the
              Winter Cup
            </div>
          </div>
        </div>
      </header>

      {/* Tournament information */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="glass grid gap-6 rounded-2xl p-6 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Format</p>
            <p className="mt-2 text-[13px] text-pretty text-muted">
              Group stage of five rounds, then a single-elimination bracket. All playoff matches are
              best of three.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Eligibility</p>
            <p className="mt-2 text-[13px] text-pretty text-muted">
              Any enrolled student with a valid campus ID. Five players and one substitute per
              roster.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Schedule</p>
            <p className="mt-2 text-[13px] text-pretty text-muted">
              Weeknight matches from 18:00, finals on Saturdays. Seeding and scheduling are handled
              by VEXA.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming tournaments */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-lg font-bold tracking-tight">Upcoming tournaments</h2>
          <Link
            to="/tournaments"
            className="font-mono text-[11px] uppercase tracking-wider text-accent"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {tournaments.map((t, i) => (
            <Link
              key={t.slug}
              to="/tournaments"
              className="rise glass rounded-xl p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/40"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {t.game}
              </span>
              <h3 className="mt-2 font-display text-base font-semibold">{t.name}</h3>
              <p className="mt-1 text-[12px] text-muted">{t.meta}</p>
              <span className="mt-3 inline-block rounded bg-foreground/5 px-2 py-1 font-mono text-[10px] text-accent">
                {t.status}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Championship rewards */}
      <section className="border-y border-border/70 bg-panel/25 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="font-display text-lg font-bold tracking-tight">Championship rewards</h2>
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
        </div>
      </section>

      {/* Campus regions */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="font-display text-lg font-bold tracking-tight">Campus regions</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <div
              key={r.name}
              className="glass rounded-lg p-4 transition hover:border-accent/30"
            >
              <div className="font-display text-[13px] font-semibold">{r.name}</div>
              <div className="font-mono text-[10px] text-muted">{r.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured teams */}
      <section className="border-t border-border/70 bg-panel/25 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="font-display text-lg font-bold tracking-tight">Featured teams</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {featured.map((t) => (
              <Link
                key={t.slug}
                to="/teams/$slug"
                params={{ slug: t.slug }}
                className="glass rounded-xl p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/40"
              >
                <div className="flex items-center gap-3">
                  <TeamCrest short={t.short} />
                  <div>
                    <div className="font-display text-[14px] font-semibold">{t.name}</div>
                    <div className="font-mono text-[10px] text-muted">
                      {t.region} · {t.game}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 font-mono text-[11px] text-muted">
                  <span>
                    {t.wins}W · {t.losses}L
                  </span>
                  <span className="text-accent">★ {t.roster[0]?.handle}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fixtures preview */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-lg font-bold tracking-tight">Next up</h2>
          <Link
            to="/fixtures"
            className="font-mono text-[11px] uppercase tracking-wider text-accent"
          >
            All fixtures →
          </Link>
        </div>
        <div className="glass overflow-hidden rounded-xl">
          {rounds[2]?.matches.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-4 border-b border-border/50 px-4 py-3 last:border-b-0"
            >
              <span className="w-24 shrink-0 font-mono text-[11px] text-muted">
                {m.date} · {m.time}
              </span>
              <span className="min-w-0 flex-1 truncate font-display text-[13px] font-semibold">
                {m.a} <span className="mx-1 font-mono text-[11px] text-muted">vs</span> {m.b}
              </span>
              <StatusBadge status={m.status} />
            </div>
          ))}
        </div>
      </section>

      {/* Registration CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-balance">
            Your campus has a bracket to defend.
          </h2>
          <p className="mx-auto mt-2 max-w-[42ch] text-[13px] text-pretty text-muted">
            Register a team in under five minutes. VEXA handles seeding, scheduling, and broadcast.
          </p>
          <Link
            to="/register"
            className="mt-5 inline-block rounded-lg bg-accent px-6 py-2.5 font-semibold text-accent-foreground transition hover:brightness-110"
          >
            Register now
          </Link>
        </div>
      </section>

      {/* Standings teaser */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-lg font-bold tracking-tight">Standings · Group A</h2>
          <Link
            to="/standings"
            className="font-mono text-[11px] uppercase tracking-wider text-accent"
          >
            Full table →
          </Link>
        </div>
        <div className="glass overflow-hidden rounded-xl">
          <table className="w-full text-left">
            <thead className="font-mono text-[10px] uppercase tracking-widest text-muted">
              <tr className="border-b border-border/70">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3 text-right">W</th>
                <th className="px-4 py-3 text-right">L</th>
                <th className="px-4 py-3 text-right">PTS</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {standings.slice(0, 4).map((t, i) => (
                <tr
                  key={t.slug}
                  className="border-b border-border/50 last:border-b-0 hover:bg-foreground/5"
                >
                  <td className={`px-4 py-3 font-mono ${i < 2 ? "text-accent" : ""}`}>{i + 1}</td>
                  <td className="px-4 py-3 font-semibold">{t.name}</td>
                  <td className="px-4 py-3 text-right font-mono">{t.wins}</td>
                  <td className="px-4 py-3 text-right font-mono">{t.losses}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">{t.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
