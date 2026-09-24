import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/tournaments", label: "Tournaments" },
  { to: "/fixtures", label: "Fixtures" },
  { to: "/teams", label: "Teams" },
  { to: "/standings", label: "Standings" },
] as const;

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-6" : "size-7";
  const text = size === "sm" ? "text-[10px]" : "text-[11px]";
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`grid ${box} place-items-center rounded-md bg-accent/15 ring-1 ring-accent/30`}
      >
        <span className={`font-display ${text} font-bold text-accent`}>VX</span>
      </div>
      <span className="font-display text-[15px] font-bold tracking-tight">VEXA</span>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 border-b border-border/70 bg-panel/55 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo />
          <span className="ml-1 hidden rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted sm:inline">
            Campus
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="slidein absolute -bottom-[15px] left-0 h-0.5 w-full bg-accent" />
                  )}
                </>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/register"
            className="rounded-md bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
          >
            Register
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid size-8 place-items-center rounded-md ring-1 ring-border text-muted md:hidden"
          >
            <span className="font-mono text-xs">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 px-6 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground"
                activeProps={{ className: "text-foreground bg-foreground/5" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-panel/25 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row">
        <div>
          <Logo size="sm" />
          <p className="mt-2 max-w-[34ch] text-[12px] text-pretty text-muted">
            The tournament layer for college esports. Built for campuses, watched by everyone.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link to="/register" className="hover:text-foreground">
            Register
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[130px]" />
      <div className="absolute top-24 right-[-140px] h-[560px] w-[560px] rounded-full bg-accent2/10 blur-[130px]" />
      <div className="absolute bottom-[-160px] left-1/3 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[130px]" />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-7xl px-6 pt-10 pb-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
        {title}
      </h1>
      {lead && <p className="mt-3 max-w-[60ch] text-[14px] text-pretty text-muted">{lead}</p>}
      {children}
    </header>
  );
}

export function TeamCrest({
  short,
  size = "md",
  alt = false,
}: {
  short: string;
  size?: "sm" | "md" | "lg";
  alt?: boolean;
}) {
  const dims =
    size === "lg" ? "size-14 text-lg rounded-xl" : size === "sm" ? "size-7 text-[10px] rounded-md" : "size-9 text-[11px] rounded-md";
  return (
    <div
      className={`grid ${dims} shrink-0 place-items-center bg-foreground/5 ring-1 ring-border font-display font-bold ${
        alt ? "text-accent2" : "text-accent"
      }`}
    >
      {short}
    </div>
  );
}

export function StatusBadge({ status }: { status: "scheduled" | "live" | "final" }) {
  if (status === "live") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded bg-live/15 px-2 py-0.5 font-mono text-[10px] uppercase text-live">
        <span className="livedot size-1.5 rounded-full bg-live" />
        Live
      </span>
    );
  }
  if (status === "final") {
    return (
      <span className="shrink-0 rounded bg-foreground/5 px-2 py-0.5 font-mono text-[10px] uppercase text-muted">
        Final
      </span>
    );
  }
  return (
    <span className="shrink-0 rounded bg-foreground/5 px-2 py-0.5 font-mono text-[10px] uppercase text-foreground">
      Scheduled
    </span>
  );
}
