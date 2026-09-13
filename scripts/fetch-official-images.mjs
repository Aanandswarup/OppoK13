import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src/assets");

const assets = [
  {
    file: "phone-hero.jpg",
    url: "https://fdn2.gsmarena.com/vv/bigpic/oppo-k13-turbo-pro.jpg",
  },
  {
    file: "phone-silver.jpg",
    // Silver Knight product / hands-on back
    url: "https://fdn.gsmarena.com/imgroot/news/25/09/oppo-k13-turbo-pro-hands-on/inline/-1200w1/gsmarena_005.jpg",
  },
  {
    file: "phone-fan.jpg",
    // Cooling fan + Mist Shadow LEDs close-up
    url: "https://fdn.gsmarena.com/imgroot/news/25/09/oppo-k13-turbo-pro-hands-on/inline/-1200w1/gsmarena_004.jpg",
  },
  {
    file: "phone-front.jpg",
    url: "https://fdn.gsmarena.com/imgroot/news/25/09/oppo-k13-turbo-pro-hands-on/inline/-1200w1/gsmarena_001.jpg",
  },
  {
    file: "phone-hand.jpg",
    url: "https://fdn.gsmarena.com/imgroot/news/25/09/oppo-k13-turbo-pro-hands-on/inline/-1200w1/gsmarena_002.jpg",
  },
  {
    file: "phone-side.jpg",
    url: "https://fdn.gsmarena.com/imgroot/news/25/09/oppo-k13-turbo-pro-hands-on/inline/-1200w1/gsmarena_003.jpg",
  },
  {
    file: "phone-duct.jpg",
    url: "https://fdn.gsmarena.com/imgroot/news/25/09/oppo-k13-turbo-pro-hands-on/inline/-1200w1/gsmarena_009.jpg",
  },
  {
    // High-res design shot from 91mobiles gallery
    file: "phone-design.jpg",
    url: "https://www.91-img.com/gallery_images_uploads/d/8/d877dcf95e9f471efb0df7d069b19f0db4b4ee5f.JPG?tr=w-1200,c-at_max,q-90,pr-true",
  },
  {
    file: "phone-camera.jpg",
    url: "https://www.91-img.com/gallery_images_uploads/0/5/0507310bbc245b60c03aec696bbfc290f0b51df5.jpg?tr=w-1200,c-at_max,q-90,pr-true",
  },
];

await mkdir(outDir, { recursive: true });

for (const a of assets) {
  const res = await fetch(a.url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; OppoLandingBot/1.0; +https://example.local)",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      Referer: "https://www.gsmarena.com/",
    },
  });
  if (!res.ok) {
    console.error(`FAIL ${a.file}: ${res.status} ${res.statusText}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const path = join(outDir, a.file);
  await writeFile(path, buf);
  console.log(`OK ${a.file} (${(buf.length / 1024).toFixed(1)} KB)`);
}
