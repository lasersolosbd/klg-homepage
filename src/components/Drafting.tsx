import type { ReactNode } from "react";

/*
  The KLG drafting kit. The logo is a compass and protractor; this file turns that into a
  recurring structural system rather than a mascot: registration marks, pivot nodes, tick
  rules, dimension lines, arcs, and a scale. Every piece is monochrome hairline work that takes
  its colour from `currentColor`, so the same component reads on navy or on cream.

  All of these are server components (no state, no effects) and render deterministic SVG.
*/

/** Registration mark: a small circle with four ticks. Marks section labels and column heads. */
export function Crosshair({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Compass pivot: a double ring with a centre dot. The node on plan rails and numbered steps. */
export function Pivot({
  size = 44,
  tone = "navy",
  dashed = false,
  children,
  className = "",
}: {
  size?: number;
  tone?: "navy" | "gold" | "teal" | "coral" | "muted" | "light";
  dashed?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const ring =
    tone === "gold"
      ? "border-gold bg-gold text-navy"
      : tone === "teal"
        ? "border-teal bg-white text-teal"
        : tone === "coral"
          ? "border-coral bg-white text-coral-text"
          : tone === "muted"
            ? "border-slate/50 bg-cream text-slate"
            : tone === "light"
              ? "border-white/70 bg-navy text-white"
              : "border-navy bg-white text-navy";
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full border font-display text-sm font-bold ${
        dashed ? "border-dashed" : ""
      } ${ring} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className={`pointer-events-none absolute inset-[3px] rounded-full border ${
          tone === "gold" ? "border-navy/25" : tone === "light" ? "border-white/25" : "border-current opacity-25"
        }`}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

/**
 * Sheet label: the recurring section marker. A crosshair, an index like "02", the label, and a
 * hairline that runs out to the edge of the container. Replaces the pill "eyebrow".
 */
export function SheetLabel({
  index,
  children,
  tone = "dark",
  className = "",
}: {
  index?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const color = tone === "light" ? "text-white/80" : "text-navy";
  const accent = tone === "light" ? "text-gold" : "text-gold-text";
  return (
    <p className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] ${color} ${className}`}>
      <Crosshair className={accent} />
      {index && <span className={`tabular-nums ${accent}`}>{index}</span>}
      <span>{children}</span>
      <span aria-hidden className="h-px min-w-6 flex-1 bg-current opacity-25" />
    </p>
  );
}

/**
 * Dimension line: |<———— label ————>| . Annotates a figure the way a blueprint annotates a
 * measurement. Colour comes from the parent's text colour.
 */
export function Dimension({
  children,
  className = "",
  align = "center",
}: {
  children: ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`flex items-center text-[11px] font-bold uppercase tracking-[0.18em] ${className}`} aria-hidden>
      <span className="h-3.5 w-px bg-current" />
      <span className={`h-px bg-current ${align === "left" ? "w-4" : "flex-1"}`} />
      <span className="px-3 leading-none">{children}</span>
      <span className="h-px flex-1 bg-current" />
      <span className="h-3.5 w-px bg-current" />
    </div>
  );
}

/** Leader tick: a short vertical stroke with a dot, used before annotation text. */
export function Leader({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`} aria-hidden>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-6 w-px bg-current" />
    </span>
  );
}

/**
 * Corner marks: four L-shaped registration brackets on a block, like a drawing pinned to a sheet.
 * The parent must be `relative`.
 */
export function CornerMarks({ className = "text-navy/40", inset = 0 }: { className?: string; inset?: number }) {
  const base = "pointer-events-none absolute h-4 w-4 border-current";
  const s = { margin: inset };
  return (
    <span className={className} aria-hidden>
      <span className={`${base} left-0 top-0 border-l border-t`} style={s} />
      <span className={`${base} right-0 top-0 border-r border-t`} style={s} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} style={s} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} style={s} />
    </span>
  );
}

/* ── SVG geometry ──────────────────────────────────────────────────────────────────────────── */

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: +(cx + r * Math.cos(a)).toFixed(2), y: +(cy + r * Math.sin(a)).toFixed(2) };
}

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
}

/**
 * ArcSweep: a quarter-circle protractor sweeping around the bottom-right corner of its box,
 * with graduated ticks on the outer arc and two inner concentric arcs. The hero backdrop and
 * the closing CTA use it. Purely decorative; `aria-hidden`.
 */
export function ArcSweep({
  className = "",
  strokeOpacity = 0.35,
}: {
  className?: string;
  strokeOpacity?: number;
}) {
  const cx = 1000;
  const cy = 1000;
  const R = 920;
  const ticks: string[] = [];
  for (let deg = 180; deg <= 270; deg += 2) {
    const major = deg % 10 === 0;
    const mid = deg % 5 === 0;
    const len = major ? 34 : mid ? 20 : 10;
    const a = polar(cx, cy, R, deg);
    const b = polar(cx, cy, R - len, deg);
    ticks.push(`M ${a.x} ${a.y} L ${b.x} ${b.y}`);
  }
  const radials = [195, 225, 255].map((deg) => {
    const a = polar(cx, cy, 120, deg);
    const b = polar(cx, cy, R - 40, deg);
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  });
  const dots = [200, 225, 250].map((deg) => polar(cx, cy, 700, deg));

  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
      preserveAspectRatio="xMaxYMax meet"
    >
      <g strokeOpacity={strokeOpacity}>
        <path d={arcPath(cx, cy, R, 180, 270)} strokeWidth="1.5" />
        <path d={ticks.join(" ")} />
        <path d={arcPath(cx, cy, 700, 180, 270)} strokeDasharray="6 10" />
        <path d={arcPath(cx, cy, 480, 180, 270)} />
        <path d={radials.join(" ")} strokeOpacity={strokeOpacity * 0.6} />
        <circle cx={cx} cy={cy} r="180" strokeOpacity={strokeOpacity * 0.8} />
        <circle cx={cx} cy={cy} r="120" />
      </g>
      {dots.map((d) => (
        <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r="4" fill="currentColor" stroke="none" fillOpacity={strokeOpacity + 0.3} />
      ))}
    </svg>
  );
}

/**
 * Scale: a horizontal ruler with labeled major ticks and a highlighted range, in HTML so the
 * labels stay readable at every width. Not currently used on any page — kept available for a
 * future numeric range that's fine to show publicly (revenue-band segmentation isn't).
 */
export function Scale({
  min,
  max,
  from,
  to,
  format,
  majorEvery,
  minorEvery,
  rangeLabel,
  fromLabel,
  toLabel,
  className = "",
}: {
  min: number;
  max: number;
  from: number;
  to: number;
  format: (n: number) => string;
  majorEvery: number;
  minorEvery: number;
  rangeLabel: string;
  fromLabel: string;
  toLabel: string;
  className?: string;
}) {
  const pct = (n: number) => `${(((n - min) / (max - min)) * 100).toFixed(3)}%`;
  const ticks: number[] = [];
  for (let n = min; n <= max + 1e-9; n += minorEvery) ticks.push(+n.toFixed(6));
  const isMajor = (n: number) => Math.abs(n / majorEvery - Math.round(n / majorEvery)) < 1e-9;

  return (
    <div className={`relative h-36 ${className}`} role="img" aria-label={`${rangeLabel}: ${format(from)} to ${format(to)}`}>
      {/* highlighted range */}
      <div
        className="absolute top-9 h-14 border-x border-gold-deep bg-gold/15"
        style={{ left: pct(from), width: `calc(${pct(to)} - ${pct(from)})` }}
        aria-hidden
      >
        <span className="absolute -top-7 left-0 -translate-x-1/2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-text">
          {fromLabel}
        </span>
        <span className="absolute -top-7 right-0 translate-x-1/2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-text">
          {toLabel}
        </span>
        <span className="absolute inset-x-0 top-0 flex items-center px-3 pt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-text">
          <span className="h-px flex-1 bg-gold-deep/50" />
          <span className="px-3 text-center">{rangeLabel}</span>
          <span className="h-px flex-1 bg-gold-deep/50" />
        </span>
      </div>
      {/* baseline and ticks */}
      <div className="absolute inset-x-0 top-[92px] h-px bg-navy" aria-hidden />
      {ticks.map((n) => {
        const major = isMajor(n);
        return (
          <span key={n} className="absolute top-[92px] -translate-y-full" style={{ left: pct(n) }} aria-hidden>
            <span className={`block w-px bg-navy ${major ? "h-4" : "h-2 opacity-50"}`} />
          </span>
        );
      })}
      {ticks.filter(isMajor).map((n, i) => (
        <span
          key={`l-${n}`}
          className={`absolute top-[100px] -translate-x-1/2 text-[12px] font-semibold tabular-nums text-slate ${
            i % 2 === 1 ? "hidden sm:block" : ""
          }`}
          style={{ left: pct(n) }}
          aria-hidden
        >
          {format(n)}
        </span>
      ))}
    </div>
  );
}

/** Tick rule: a horizontal ruler line. Pure CSS (see globals.css); this just fixes the markup. */
export function TickRule({ className = "text-navy/40" }: { className?: string }) {
  return <div className={`tick-rule w-full ${className}`} aria-hidden />;
}
