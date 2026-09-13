/**
 * High-resolution official product media.
 *
 * Priority order:
 *  1. OPPO India official CDN (product-asset-library, pc/ = desktop high-res)
 *     Silver Knight = color1, Purple Phantom = color2, Midnight Maverick = color3
 *  2. GSMArena hands-on gallery (1200px, real photography, Silver Knight unit)
 *  3. 91mobiles gallery (w-1600 high-res transform)
 *
 * All URLs hotlinked from public CDNs. `?tr=` params request highest transforms.
 */

const OPPO =
  "https://www.oppo.com/content/dam/oppo/product-asset-library/k/k13-turbo-series/in/k13-turbo-pro/v1/images";

const GSM =
  "https://fdn.gsmarena.com/imgroot/news/25/09/oppo-k13-turbo-pro-hands-on/inline/-1200w1";

export const MEDIA = {
  // ---- Official OPPO per-color renders (consistent series, dark gaming backdrops) ----
  oppoSilver: `${OPPO}/pc/color1.png`,
  oppoPurple: `${OPPO}/pc/color2.png`,
  oppoMidnight: `${OPPO}/pc/color3.png`,

  // ---- Official OPPO topic banners (pc = highest res) ----
  oppoChip: `${OPPO}/pc/chip.png`,
  oppoBattery: `${OPPO}/pc/battery.png`,
  oppoCharge: `${OPPO}/pc/charge.png`,
  oppoLight: `${OPPO}/pc/light.png`,
  oppoTouch: `${OPPO}/pc/touch.png`,
  oppoPassive: `${OPPO}/pc/passivecooling.png`,
  oppoActive1: `${OPPO}/pad/activecooling1.png`,
  oppoActive2: `${OPPO}/pad/activecooling2.png`,
  oppoSpeakers: `${OPPO}/pc/experience1.png`,
  oppoMotor: `${OPPO}/pc/experience2.png`,
  oppoBackClip: `${OPPO}/pc/experience5.png`,
  oppoGameCam: `${OPPO}/pc/assistant1.png`,
  oppoOutdoor: `${OPPO}/pc/assistant3.png`,
  oppoSpecs:
    "https://www.oppo.com/content/dam/oppo/common/mkt/v2-2/k13-turbo-series-in/specs/k13-turbo-pro/1224-720.png",

  // ---- GSMArena real photography (1200px, Silver Knight hands-on unit) ----
  hero: "https://fdn2.gsmarena.com/vv/bigpic/oppo-k13-turbo-pro.jpg",
  silverBack: `${GSM}/gsmarena_005.jpg`,
  fanClose: `${GSM}/gsmarena_004.jpg`,
  front: `${GSM}/gsmarena_001.jpg`,
  hand: `${GSM}/gsmarena_002.jpg`,
  side: `${GSM}/gsmarena_003.jpg`,
  duct: `${GSM}/gsmarena_009.jpg`,
  lights: `${GSM}/gsmarena_010.jpg`,
  box: `${GSM}/gsmarena_012.jpg`,

  // ---- 91mobiles high-res gallery (w-1600) ----
  design91:
    "https://www.91-img.com/gallery_images_uploads/d/8/d877dcf95e9f471efb0df7d069b19f0db4b4ee5f.JPG?tr=w-1600,c-at_max,q-90,pr-true",
  camera91:
    "https://www.91-img.com/gallery_images_uploads/0/5/0507310bbc245b60c03aec696bbfc290f0b51df5.jpg?tr=w-1600,c-at_max,q-90,pr-true",
} as const;

export type MediaKey = keyof typeof MEDIA;

/** Topic → image mapping so every section shows the photo that matches its copy. */
export const TOPIC_IMAGE: Record<string, MediaKey> = {
  hero: "oppoPurple",
  cooling: "oppoActive1",
  coolingPassive: "oppoPassive",
  chip: "oppoChip",
  display: "oppoTouch",
  battery: "oppoBattery",
  charge: "oppoCharge",
  armor: "duct",
  camera: "camera91",
  haptics: "oppoMotor",
  audio: "oppoSpeakers",
  fanDetail: "fanClose",
  breathingLight: "oppoLight",
  gameAssist: "oppoGameCam",
  outdoor: "oppoOutdoor",
  handsOn: "hand",
  frontPanel: "front",
  sideFrame: "side",
  retailBox: "box",
};
