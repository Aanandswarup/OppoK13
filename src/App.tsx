import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import SocialProof from "./components/SocialProof";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import { usePageTour } from "./lib/usePageTour";
import { PHONE } from "./data/specs";

const SPEC_TICKER = [
  `${PHONE.chipset} · Adreno 825`,
  `${PHONE.benchmarks.antutuDisplay} AnTuTu (OPPO lab V10)`,
  `Geekbench 6 · ${PHONE.benchmarks.geekbenchSingle.toLocaleString()} / ${PHONE.benchmarks.geekbenchMulti.toLocaleString()}`,
  `${PHONE.battery.typical} · ${PHONE.battery.charge}`,
  `Storm Engine · ${PHONE.cooling.fanRpm} micro fan`,
  `${PHONE.cooling.vc} vapour chamber`,
  `${PHONE.display.size} 1.5K AMOLED · ${PHONE.display.refresh}`,
  `${PHONE.display.touch} touch sampling · ${PHONE.display.brightnessHbm} HBM`,
  `${PHONE.body.ip} water resistance`,
  `Wi-Fi 7 · Bluetooth 5.4 · ColorOS 15`,
  `50 MP OIS + 2 MP mono · 16 MP front`,
  "Bypass charging · X-axis linear motor",
];

export default function App() {
  const tour = usePageTour();

  return (
    <div className="relative min-h-screen bg-carbon-950 text-bone-100 antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ice-500 focus:px-4 focus:py-2 focus:font-bold focus:text-carbon-950"
      >
        Skip to content
      </a>

      <Background />
      <Navbar />

      <main id="main">
        <Hero
          isTouring={tour.isTouring}
          reducedMotion={tour.reducedMotion}
          onToggleTour={tour.isTouring ? tour.stopTour : tour.startTour}
        />
        <Ticker items={SPEC_TICKER} duration={36} />
        <SocialProof />
        <Features />
        <Showcase />
        <Performance />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>

      <Footer onGoToTop={tour.goToTop} />

      <p className="sr-only" role="status" aria-atomic="true">
        {tour.message}
      </p>

      {tour.isTouring && (
        <button
          ref={tour.stopButtonRef}
          type="button"
          data-page-tour-control
          onClick={tour.stopTour}
          aria-keyshortcuts="Escape"
          title="Stop auto-scrolling (Esc)"
          className="glass group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[60] inline-flex min-h-12 items-center gap-3 rounded-md px-5 py-3 text-sm font-semibold text-ice-300 shadow-glow-ice transition-colors hover:text-bone-50 sm:right-6"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4 text-ember-400" fill="currentColor" aria-hidden="true">
            <rect x="3" y="3" width="10" height="10" rx="1.5" />
          </svg>
          Stop tour
          <kbd className="font-mono-hud hidden text-[10px] font-normal text-bone-400 sm:inline">Esc</kbd>
        </button>
      )}
    </div>
  );
}
