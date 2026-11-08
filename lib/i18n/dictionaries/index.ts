import type { Locale } from "../config";
import type { Dictionary } from "../types";
import { kg } from "./kg";
import { ru } from "./ru";

export const dictionaries: Record<Locale, Dictionary> = { ru, kg };
