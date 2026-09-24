import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, TeamCrest } from "@/components/site-chrome";
import { teams } from "@/lib/vexa-data";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Teams — VEXA Winter Cup" },
      {
        name: "description",
        content:
          "All campus teams competing in the VEXA Winter Cup, with records, regions and roster leads.",
      },
      { property: "og:title", content: "Teams — VEXA Winter Cup" },
      {
        property: "og:description",
        content: "Campus teams, records, regions and roster leads.",
      },
    ],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  return (
    <main className="pb-16">
      <PageHeader
        eyebrow="Winter Cup · Teams"
        title="Sixteen campuses, one bracket"
        lead="Each team fields five starters and one substitute. Open a team to see the full roster and match history."
      />

      <section className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((t, i) => (
            <Link
              key={t.slug}
              to="/teams/$slug"
              params={{ slug: t.slug }}
              className="rise glass rounded-xl p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/40"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3">
                <TeamCrest short={t.short} />
                <div className="min-w-0">
                  <div className="truncate font-display text-[14px] font-semibold">{t.name}</div>
                  <div className="font-mono text-[10px] text-muted">
                    {t.region} · {t.game}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-3 font-mono text-[11px] text-muted">
                <span>
                  <span className="block font-display text-base font-bold text-foreground">
                    {t.wins}
                  </span>
                  wins
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-foreground">
                    {t.losses}
                  </span>
                  losses
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-accent">
                    {t.points}
                  </span>
                  pts
                </span>
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Captain · {t.captain}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
