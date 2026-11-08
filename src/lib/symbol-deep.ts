import { fromContent } from "./content";
import { DEEP_DIVES } from "./symbols-deep";
import { DEEP_DIVES_2 } from "./symbols-deep-2";
import { DEEP_DIVES_3 } from "./symbols-deep-3";
import type { DeepDive } from "./symbols-deep";

const SYMBOL_DEEP_DEFAULT: Record<string, DeepDive> = { ...DEEP_DIVES, ...DEEP_DIVES_2, ...DEEP_DIVES_3 };
export const SYMBOL_DEEP: Record<string, DeepDive> = fromContent("symbol_deep", SYMBOL_DEEP_DEFAULT);
