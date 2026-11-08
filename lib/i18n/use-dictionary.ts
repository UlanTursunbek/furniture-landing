import { dictionaries } from "./dictionaries";
import { useLocaleStore } from "./locale-store";
import type { Dictionary } from "./types";

/** Returns the dictionary for the active locale. Client components only. */
export function useDictionary(): Dictionary {
  const locale = useLocaleStore((state) => state.locale);
  return dictionaries[locale];
}
