import { Reveal, SectionHeading, Stars } from "./ui";
import { cn } from "../utils/cn";

type T = {
  quote: string;
  name: string;
  handle: string;
  role: string;
  grad: string;
  initials: string;
  featured?: boolean;
};

const DATA: T[] = [
  {
    quote:
      "I ran BGMI at 90 FPS for a three-hour scrims block. Three hours in, the frame counter hadn't moved and the back was barely warm. My old flagship throttled by match two — this thing doesn't know what throttling is.",
    name: "Kabir “Sn4pe” Mehta",
    handle: "@sn4pe.gg",
    role: "Semi-pro · BGMI",
    grad: "linear-gradient(135deg,#23d5e2,#12aebd)",
    initials: "KM",
    featured: true,
  },
  {
    quote:
      "The battery is stupidly good. I streamed four hours of ranked and landed at 51%. I've stopped carrying a power bank. That's never happened before.",
    name: "Aanya Verma",
    handle: "@pixelaanya · 1.2M subs",
    role: "Creator",
    grad: "linear-gradient(135deg,#ff8a3d,#e04e0a)",
    initials: "AV",
  },
  {
    quote:
      "240 Hz touch sampling isn't a spec sheet flex — it's an unfair advantage. My flicks connect before my opponents finish theirs.",
    name: "Rahul Deshmukh",
    handle: "@fragrahul",
    role: "Ranked grinder · Ace",
    grad: "linear-gradient(135deg,#8ef2f8,#23d5e2)",
    initials: "RD",
  },
  {
    quote:
      "Bypass charging means my six-hour weekend sessions don't cook the battery. First phone that actually thinks like a gamer.",
    name: "Sneha Kulkarni",
    handle: "@snehaplays",
    role: "Streamer",
    grad: "linear-gradient(135deg,#ffb27a,#ff6a1f)",
    initials: "SK",
  },
  {
    quote:
      "We made the K13 Turbo Pro the official device for our community tournaments. Zero thermal complaints across forty players. Zero.",
    name: "Dev “Clutch” Anand",
    handle: "@clutchops",
    role: "Tournament organizer",
    grad: "linear-gradient(135deg,#4fe6f0,#0d94a3)",
    initials: "DA",
  },
];

function Card({ t, delay }: { t: T; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className={cn(t.featured && "lg:col-span-2")}
    >
      <figure
        className={cn(
          "glass group h-full rounded-lg p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-ice-400/30 hover:shadow-glow-ice sm:p-8",
          t.featured && "hud-corners"
        )}
      >
        <div className="flex items-center justify-between">
          <Stars value={5} />
          <span className="font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">Community voice</span>
        </div>
        <blockquote className={cn("mt-5 leading-relaxed text-bone-100", t.featured ? "text-lg sm:text-xl" : "text-[15px]")}>
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3.5">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-md font-display text-sm font-bold text-carbon-950 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ background: t.grad }}
            aria-hidden="true"
          >
            {t.initials}
          </span>
          <span>
            <span className="block text-sm font-bold text-bone-50">{t.name}</span>
            <span className="block font-mono-hud text-[11px] text-bone-400">
              {t.handle} · <span className="text-ice-400">{t.role}</span>
            </span>
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="06 // Comms channel"
            title={<span id="reviews-title">The squad has spoken</span>}
            lead="4.4 out of 5 across 2,100+ verified reviews — here's what the grinders, streamers and semi-pros report from the front lines."
          />
          <Reveal delay={200}>
            <div className="glass rounded-lg px-6 py-5 text-center">
              <p className="font-display text-4xl font-bold text-bone-50">4.4<span className="text-xl text-bone-400">/5</span></p>
              <Stars value={4.4} className="mt-1.5" />
              <p className="mt-1 font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">2,100+ reviews</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card t={DATA[0]} delay={0} />
          <Card t={DATA[1]} delay={120} />
          <Card t={DATA[2]} delay={0} />
          <Card t={DATA[3]} delay={120} />
          <Card t={DATA[4]} delay={240} />
        </div>
        <Reveal delay={150}>
          <p className="mt-8 text-center font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">
            Representative gamer voices · aggregate 4.4/5 across 2,100+ ratings (91mobiles)
          </p>
        </Reveal>
      </div>
    </section>
  );
}
