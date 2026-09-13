/**
 * OPPO K13 Turbo Pro (CPH2731 / PLE110) — India specs and lab numbers.
 * Sources: OPPO India product/spec pages, GSMArena, NanoReview, 91mobiles, Digit, GSMArena hands-on.
 * Benchmarks vary by sample, RAM, fan mode and AnTuTu version — values below are representative published figures.
 */

export const PHONE = {
  name: "OPPO K13 Turbo Pro",
  model: "CPH2731",
  tagline: "Storm Engine · cool to the core",
  chipset: "Snapdragon® 8s Gen 4",
  chipsetFull: "Qualcomm SM8735 Snapdragon 8s Gen 4 (4 nm)",
  cpu:
    "Octa-core · 1× 3.21 GHz Cortex-X4 · 3× 3.0 GHz Cortex-A720 · 2× 2.8 GHz Cortex-A720 · 2× 2.0 GHz Cortex-A720",
  gpu: "Adreno 825",
  ram: "LPDDR5X",
  storage: "UFS 4.0",
  configsIndia: ["8 GB + 256 GB", "12 GB + 256 GB"] as const,
  display: {
    size: '6.8″',
    sizeCm: "17.27 cm",
    type: "LTPS AMOLED (BOE B23 / DT-Star D+)",
    resolution: "2800 × 1280",
    ppi: 453,
    refresh: "120 Hz",
    touch: "240 Hz",
    brightnessTypical: "600 nits",
    brightnessHbm: "1,600 nits",
    colors: "1.07 billion (10-bit)",
    gamut: "100% DCI-P3",
    glass: "AGC DT-Star D+",
    screenToBody: "93.5%",
  },
  battery: {
    typical: "7,000 mAh",
    rated: "6,830 mAh",
    type: "Silicon-carbon",
    charge: "80W SUPERVOOC™",
    charge30m: "≈68%",
    fullCharge: "≈54–58 min",
    reverse: true,
    bypass: true,
    durable: "5-year durable design (lab)",
  },
  cooling: {
    name: "Storm Engine",
    fanRpm: "18,000 RPM",
    blade: "0.1 mm micro-centrifugal blades",
    fins: "13 density-optimised fins",
    vc: "7,000 mm² vapour chamber",
    claimCooler: "2–4°C cooler under high load (OPPO lab)",
    wildlifeStabilityFanOn: "75–83%",
  },
  camera: {
    main: "50 MP wide · f/1.8 · OIS · OV50D40",
    mono: "2 MP monochrome · f/2.4",
    front: "16 MP · f/2.4 · IMX480",
    video: "4K@30/60 fps · 1080p slo-mo 240 fps",
  },
  body: {
    height: "162.8 mm",
    width: "77.2 mm",
    // OPPO India specs list ~8.31 mm; GSMArena lists 7.3 mm — show official India figure.
    thickness: "8.31 mm",
    weight: "208 g",
    ip: "IPX6 / IPX8 / IPX9",
    colors: [
      {
        id: "midnight",
        name: "Midnight Maverick",
        desc: "Deep matte black with metallic undertones — clean stealth back, no graphics. Official OPPO color3 render.",
        swatch: "linear-gradient(135deg,#0c0c0e,#2a2a32 70%)",
        accent: "#8fa2b0",
        priceFrom: "₹37,999",
        mediaKey: "oppoMidnight",
      },
      {
        id: "purple",
        name: "Purple Phantom",
        desc: "Techno-purple neon street energy with geometric gaming graphics. Official OPPO color2 render.",
        swatch: "linear-gradient(135deg,#2a0a3d,#9b4dff 70%)",
        accent: "#c084fc",
        priceFrom: "₹37,999",
        mediaKey: "oppoPurple",
      },
      {
        id: "silver",
        name: "Silver Knight",
        desc: "Motorcycle-metal silver with ‘Active Cooling · Master The Wind’ graphics. Official OPPO color1 render.",
        swatch: "linear-gradient(135deg,#6b7280,#e5e7eb 70%)",
        accent: "#e2e8f0",
        priceFrom: "₹37,999",
        mediaKey: "oppoSilver",
      },
    ],
  },
  connectivity: {
    wifi: "Wi-Fi 7 (802.11be)",
    bt: "Bluetooth 5.4 · LDAC · LHDC 5.0 · aptX HD",
    ir: true,
    fingerprint: "In-display optical",
    speakers: "Dual stereo · 300% Ultra Volume",
    motor: "X-axis linear motor",
    os: "ColorOS 15 · Android 15",
  },
  box: [
    "Phone",
    "80W SUPERVOOC charger",
    "USB-C cable",
    "Protective case",
    "SIM ejector",
    "Quick guide",
    "Fan cleaning brush",
  ],
  pricingIndia: [
    {
      ram: "8 GB",
      storage: "256 GB",
      price: "₹37,999",
      emi: "₹1,583/mo",
      tag: undefined as string | undefined,
      highlight: false,
      notes: ["All three finishes", "80W charger in box", "No-cost EMI available"],
    },
    {
      ram: "12 GB",
      storage: "256 GB",
      price: "₹39,999",
      emi: "₹1,666/mo",
      tag: "Most picked" as string | undefined,
      highlight: true,
      notes: ["+4 GB multitasking headroom", "All three finishes", "Priority dispatch"],
    },
  ],
  /**
   * Representative lab / review figures (not a single run).
   * AnTuTu: OPPO claims ~2.2M (V10 lab); NanoReview ~2.34M (v11 avg); 91mobiles ~2.03M; Digit “over 2M”.
   */
  benchmarks: {
    antutuClaim: 2_200_000,
    antutuDisplay: "2.2M+",
    antutuNote: "OPPO lab · AnTuTu V10 · up to ~2.2M",
    antutuNano: 2_341_700,
    geekbenchSingle: 2_068,
    geekbenchMulti: 6_385,
    geekbenchMulti91: 6_779,
    wildLifeExtreme: 4_110,
    solarBay: 8_293,
    pcmark: 16_156,
    rating: 4.4,
    reviews: 2_100,
  },
  gaming: {
    // Beebom / review averages where available
    bgmi: { label: "BGMI · Extreme+", fps: 90, avg: 89.4 },
    codm: { label: "COD Mobile · Ultra", fps: 120, avg: 119.7 },
    genshin: { label: "Genshin · Highest", fps: 60, avg: 59.9 },
    wuthering: { label: "Wuthering Waves", fps: 60, avg: 59.1 },
  },
} as const;

export type FinishId = (typeof PHONE.body.colors)[number]["id"];
