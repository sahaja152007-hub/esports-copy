import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site-chrome";
import { regions, tournaments } from "@/lib/vexa-data";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register your team — VEXA" },
      {
        name: "description",
        content:
          "Enter your campus team into the VEXA circuit: roster, region and tournament selection in one short form.",
      },
      { property: "og:title", content: "Register your team — VEXA" },
      {
        property: "og:description",
        content: "Enter your campus team into the VEXA circuit in under five minutes.",
      },
    ],
  }),
  component: RegisterPage,
});

const fieldClass =
  "w-full rounded-lg bg-foreground/5 px-3.5 py-2.5 text-[13px] text-foreground ring-1 ring-border outline-none transition placeholder:text-muted/70 focus:ring-accent";
const labelClass = "font-mono text-[10px] uppercase tracking-widest text-muted";

function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="pb-16">
      <PageHeader
        eyebrow="Season 04 · Registration"
        title="Register your team"
        lead="Five starters, one substitute, one campus. Registration closes the Friday before each tournament's first round."
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-4 lg:grid-cols-[1.2fr_.8fr]">
        <form
          className="glass rounded-2xl p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="team">
                Team name
              </label>
              <input id="team" className={`${fieldClass} mt-2`} placeholder="Riverside Riptide" />
            </div>
            <div>
              <label className={labelClass} htmlFor="campus">
                Campus
              </label>
              <input id="campus" className={`${fieldClass} mt-2`} placeholder="Riverside University" />
            </div>
            <div>
              <label className={labelClass} htmlFor="region">
                Region
              </label>
              <select id="region" className={`${fieldClass} mt-2`} defaultValue={regions[0]?.name}>
                {regions.map((r) => (
                  <option key={r.name} value={r.name} className="bg-panel">
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="tournament">
                Tournament
              </label>
              <select
                id="tournament"
                className={`${fieldClass} mt-2`}
                defaultValue={tournaments[0]?.name}
              >
                {tournaments.map((t) => (
                  <option key={t.slug} value={t.name} className="bg-panel">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="captain">
                Captain handle
              </label>
              <input id="captain" className={`${fieldClass} mt-2`} placeholder="kairo" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="email">
                Contact email
              </label>
              <input
                id="email"
                type="email"
                className={`${fieldClass} mt-2`}
                placeholder="captain@campus.edu"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="roster">
                Roster handles
              </label>
              <textarea
                id="roster"
                rows={4}
                className={`${fieldClass} mt-2 resize-none`}
                placeholder="One handle per line — five starters and one substitute"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-accent px-6 py-2.5 font-semibold text-accent-foreground transition hover:brightness-110 sm:w-auto"
          >
            Submit registration
          </button>

          {submitted && (
            <p className="mt-4 rounded-lg bg-accent/10 px-3.5 py-2.5 font-mono text-[11px] text-accent">
              Registration captured. Seeding confirmation follows by email.
            </p>
          )}
        </form>

        <aside className="space-y-4">
          <div className="glass rounded-xl p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
              What happens next
            </div>
            <ol className="mt-3 space-y-2 text-[13px] text-muted">
              <li>1 · Campus eligibility check on every listed player.</li>
              <li>2 · Seeding into a group based on last season's rating.</li>
              <li>3 · Fixture times published to your team page.</li>
            </ol>
          </div>
          <div className="glass rounded-xl p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Requirements
            </div>
            <ul className="mt-3 space-y-2 text-[13px] text-muted">
              <li>Valid student ID for all six players.</li>
              <li>Availability on weeknights from 18:00.</li>
              <li>A team crest at 512×512 for broadcast.</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
