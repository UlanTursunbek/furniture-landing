import type { StaticImageData } from "next/image";

import bathroom from "@/public/images/bathroom.jpg";
import childrens from "@/public/images/childrens.jpg";
import desks from "@/public/images/desks.jpg";
import dressers from "@/public/images/dressers.jpg";
import kitchens from "@/public/images/kitchens.jpg";
import shelving from "@/public/images/shelving.jpg";
import tvUnits from "@/public/images/tv-units.jpg";
import walkInClosets from "@/public/images/walk-in-closets.jpg";
import wardrobes from "@/public/images/wardrobes.jpg";

/** Display order of furniture categories. Copy lives in the i18n dictionaries. */
export const categoryIds = [
  "kitchens",
  "wardrobes",
  "walkInClosets",
  "dressers",
  "tvUnits",
  "shelving",
  "desks",
  "childrens",
  "bathroom",
] as const;

export type CategoryId = (typeof categoryIds)[number];

interface CategoryMedia {
  image: StaticImageData;
  /** CSS object-position, so landscape photos crop well into portrait frames. */
  focus: string;
}

export const categoryMedia: Record<CategoryId, CategoryMedia> = {
  kitchens: { image: kitchens, focus: "50% 50%" },
  wardrobes: { image: wardrobes, focus: "22% 50%" },
  walkInClosets: { image: walkInClosets, focus: "50% 50%" },
  dressers: { image: dressers, focus: "60% 50%" },
  tvUnits: { image: tvUnits, focus: "38% 50%" },
  shelving: { image: shelving, focus: "35% 50%" },
  desks: { image: desks, focus: "50% 60%" },
  childrens: { image: childrens, focus: "50% 50%" },
  bathroom: { image: bathroom, focus: "62% 50%" },
};
