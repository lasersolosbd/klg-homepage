import { SheetLabel } from "@/components/Drafting";
import { ButtonLink } from "@/components/Buttons";
import { AI_ENGINES, BOOKING_URL, FREE_REPORT_URL } from "@/lib/config";

export const metadata = { robots: { index: false, follow: false } };

// PREVIEW E — "The instrument". Replaces the browser-chrome AI-answer mockup (a template
// device, no matter where it sits on the grid) with something native to what KLG actually
// does: a real dial reading each of the six engines the AEO tool checks (AI_ENGINES, the same
// constant the product uses), plotted as an instrument the way a real map or real generative
// diagram carries a page instead of a UI screenshot. No card, no browser chrome, no dots.
const MENTIONED = new Set(["Perplexity"]);
const mentionedCount = AI_ENGINES.filter((e) => MENTIONED.has(e)).length;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

const SIZE = 560;
const CENTER = SIZE / 2;
const START_DEG = -90;
const STEP = 360 / AI_ENGINES.length;

export default function PreviewE() {
  const ticks: string[] = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const major = deg % 30 === 0;
    const a = polar(CENTER, CENTER, 260, deg);
    const b = polar(CENTER, CENTER, 260 - (major ? 16 : 8), deg);
    ticks.push(`M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-navy text-white">
      <div className="border-b border-white/10 bg-navy px-6 py-3 text-center text-xs font-semibold text-white/50">
        PREVIEW E — The instrument: a real dial reading the six AI engines instead of a browser-chrome mockup
      </div>

      <div className="mx-auto flex min-h-[1050px] max-w-3xl flex-col items-center px-6 py-16 text-center lg:py-20">
        <SheetLabel index="01" tone="light" className="justify-center">
          For nonprofits raising $1M–$30M a year
        </SheetLabel>

        <h1 className="mt-7 max-w-xl font-display text-[2rem] font-semibold leading-[1.12] text-white sm:text-[2.5rem] lg:text-[2.85rem]">
          Somebody just asked an AI which nonprofit to support.{" "}
          <span className="text-gold">Did it say your name?</span>
        </h1>

        {/* The instrument: dominant, not a card. */}
        <div className="relative mt-10" style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
            <g stroke="white" strokeOpacity={0.16} fill="none" strokeWidth="1.25">
              <circle cx={CENTER} cy={CENTER} r={140} />
              <circle cx={CENTER} cy={CENTER} r={190} />
              <circle cx={CENTER} cy={CENTER} r={240} strokeDasharray="3 7" />
              <path d={ticks.join(" ")} />
              <circle cx={CENTER} cy={CENTER} r={260} strokeOpacity={0.3} />
            </g>
            {AI_ENGINES.map((engine, i) => {
              const deg = START_DEG + i * STEP;
              const hit = MENTIONED.has(engine);
              const inner = polar(CENTER, CENTER, 60, deg);
              const outer = polar(CENTER, CENTER, 258, deg);
              return (
                <line
                  key={engine}
                  x1={inner.x}
                  y1={inner.y}
                  x2={outer.x}
                  y2={outer.y}
                  stroke={hit ? "var(--color-gold, #c98a2c)" : "white"}
                  strokeOpacity={hit ? 0.55 : 0.14}
                  strokeWidth={hit ? 1.6 : 1}
                />
              );
            })}
          </svg>

          {/* Engine points + labels, positioned by trig so they read at any width. */}
          {AI_ENGINES.map((engine, i) => {
            const deg = START_DEG + i * STEP;
            const hit = MENTIONED.has(engine);
            const dot = polar(CENTER, CENTER, 250, deg);
            const label = polar(CENTER, CENTER, 300, deg);
            return (
              <span key={engine}>
                <span
                  aria-hidden
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    hit ? "h-3 w-3 bg-gold" : "h-2 w-2 border border-white/35 bg-transparent"
                  }`}
                  style={{ left: dot.x, top: dot.y }}
                />
                <span
                  className={`absolute w-[120px] -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold uppercase tracking-[0.14em] ${
                    hit ? "text-gold" : "text-white/45"
                  }`}
                  style={{ left: label.x, top: label.y }}
                >
                  {engine}
                </span>
              </span>
            );
          })}

          {/* Center readout, the actual instrument reading. */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="font-display text-[3.4rem] font-semibold leading-none text-white">
              {mentionedCount}/{AI_ENGINES.length}
            </p>
            <p className="mx-auto mt-2 max-w-[13ch] text-[11px] font-bold uppercase leading-4 tracking-[0.14em] text-white/50">
              AI engines mention your organization
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-md text-[17px] leading-8 text-white/75">
          Kind Logic Group checks what AI engines actually say about your organization and helps
          you close the gap.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={FREE_REPORT_URL} size="lg">
            See your score
          </ButtonLink>
          <ButtonLink href={BOOKING_URL} variant="outline-light" size="lg">
            Book a call
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
