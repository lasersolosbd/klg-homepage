import { AI_ENGINES } from "@/lib/config";

// The instrument: a real dial reading each of the six engines the AEO tool checks (AI_ENGINES,
// the same constant the product uses), plotted as an instrument the way a real map or generative
// diagram carries a page instead of a UI screenshot. Replaces the old browser-chrome "AI answer"
// mockup — a template device, no matter where it sits on the grid — with something native to
// what Kind Logic Group actually does.
//
// Every engine renders uniformly active (all gold, equal opacity): the homepage can't honestly
// claim a specific visitor's outcome before they run their own report, so this is the instrument
// itself, not a result.
const SIZE = 420;
const CENTER = SIZE / 2;
const START_DEG = -90;
const STEP = 360 / AI_ENGINES.length;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

export function EngineDial() {
  const ticks: string[] = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const major = deg % 30 === 0;
    const a = polar(CENTER, CENTER, 195, deg);
    const b = polar(CENTER, CENTER, 195 - (major ? 12 : 6), deg);
    ticks.push(`M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
  }

  return (
    <div className="relative mx-auto" style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <g stroke="white" strokeOpacity={0.16} fill="none" strokeWidth="1.1">
          <circle cx={CENTER} cy={CENTER} r={105} />
          <circle cx={CENTER} cy={CENTER} r={145} strokeDasharray="3 7" />
          <path d={ticks.join(" ")} />
          <circle cx={CENTER} cy={CENTER} r={195} strokeOpacity={0.28} />
        </g>
        {AI_ENGINES.map((engine, i) => {
          const deg = START_DEG + i * STEP;
          const inner = polar(CENTER, CENTER, 45, deg);
          const outer = polar(CENTER, CENTER, 193, deg);
          return (
            <line
              key={engine}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--color-gold, #d49a3d)"
              strokeOpacity={0.5}
              strokeWidth={1.4}
            />
          );
        })}
      </svg>
      {AI_ENGINES.map((engine, i) => {
        const deg = START_DEG + i * STEP;
        const dot = polar(CENTER, CENTER, 187, deg);
        const label = polar(CENTER, CENTER, 228, deg);
        return (
          <span key={engine}>
            <span
              aria-hidden
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
              style={{ left: dot.x, top: dot.y }}
            />
            <span
              className="absolute w-[100px] -translate-x-1/2 -translate-y-1/2 text-[10.5px] font-bold uppercase tracking-[0.13em] text-white/70"
              style={{ left: label.x, top: label.y }}
            >
              {engine}
            </span>
          </span>
        );
      })}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-display text-[2.7rem] font-semibold leading-none text-white">{AI_ENGINES.length}</p>
        <p className="mx-auto mt-2 max-w-[12ch] text-[10.5px] font-bold uppercase leading-4 tracking-[0.14em] text-white/55">
          AI engines checked, every month
        </p>
      </div>
    </div>
  );
}
