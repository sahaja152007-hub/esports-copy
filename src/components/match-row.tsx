import { Link } from "@tanstack/react-router";
import { StatusBadge, TeamCrest } from "./site-chrome";
import { teamByName, type Match } from "@/lib/vexa-data";

function TeamSide({ name, alt, right }: { name: string; alt?: boolean; right?: boolean }) {
  const team = teamByName(name);
  const crest = <TeamCrest short={team.short} alt={alt ?? false} />;
  const label = team.slug ? (
    <Link
      to="/teams/$slug"
      params={{ slug: team.slug }}
      className="font-display text-[13px] font-semibold transition-colors hover:text-accent"
    >
      {team.name}
    </Link>
  ) : (
    <span className="font-display text-[13px] font-semibold">{name}</span>
  );

  return (
    <div className={`flex min-w-0 flex-1 items-center gap-3 ${right ? "flex-row-reverse" : ""}`}>
      {crest}
      <div className={`min-w-0 ${right ? "text-right" : ""}`}>
        <div className="truncate">{label}</div>
        <div className="font-mono text-[10px] text-muted">{team.region}</div>
      </div>
    </div>
  );
}

export function MatchRow({ match }: { match: Match }) {
  return (
    <div className="glass rounded-lg px-4 py-3 transition hover:border-accent/40">
      <div className="flex items-center gap-3 sm:gap-5">
        <TeamSide name={match.a} />
        <div className="shrink-0 text-center">
          <div className="font-display text-sm font-bold tracking-tight">
            {match.score ?? <span className="font-mono text-[11px] text-muted">vs</span>}
          </div>
          <div className="font-mono text-[10px] text-muted">
            {match.date} · {match.time}
          </div>
        </div>
        <TeamSide name={match.b} alt right />
        <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
          <StatusBadge status={match.status} />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {match.round}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between sm:hidden">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {match.round}
        </span>
        <StatusBadge status={match.status} />
      </div>
    </div>
  );
}

export function RoundGroup({ round, matches }: { round: string; matches: Match[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          {round}
        </span>
        <span className="h-px flex-1 bg-border/70" />
      </div>
      <div className="space-y-2">
        {matches.map((m) => (
          <MatchRow key={m.id} match={m} />
        ))}
      </div>
    </div>
  );
}
