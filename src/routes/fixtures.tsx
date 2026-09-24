import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site-chrome";
import { RoundGroup } from "@/components/match-row";
import { rounds } from "@/lib/vexa-data";

export const Route = createFileRoute("/fixtures")({
  head: () => ({
    meta: [
      { title: "Fixtures & results — VEXA Winter Cup" },
      {
        name: "description",
        content:
          "Every Winter Cup match grouped by round: team crests, kick-off time, stage and live status.",
      },
      { property: "og:title", content: "Fixtures & results — VEXA Winter Cup" },
      {
        property: "og:description",
        content: "Every match grouped by round, with times, stages and live status.",
      },
    ],
  }),
  component: FixturesPage,
});

const filters = ["All", "Live", "Scheduled", "Final"] as const;

function FixturesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const grouped = rounds
    .map((r) => ({
      round: r.round,
      matches:
        filter === "All" ? r.matches : r.matches.filter((m) => m.status === filter.toLowerCase()),
    }))
    .filter((r) => r.matches.length > 0);

  return (
    <main className="pb-16">
      <PageHeader
        eyebrow="Winter Cup · Fixtures"
        title="Every match, grouped by round"
        lead="Kick-off times are shown in campus local time. Live matches update as maps close out."
      >
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition ${
                filter === f
                  ? "bg-accent text-accent-foreground"
                  : "bg-foreground/5 text-muted ring-1 ring-border hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-4">
        {grouped.map((r) => (
          <RoundGroup key={r.round} round={r.round} matches={r.matches} />
        ))}
        {grouped.length === 0 && (
          <div className="glass rounded-xl p-8 text-center text-[13px] text-muted">
            No matches with this status right now.
          </div>
        )}
      </section>
    </main>
  );
}
