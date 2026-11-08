import { fromContent } from "./content";
import { PAIRS_1 } from "./compat-pairs-1";
import { PAIRS_2 } from "./compat-pairs-2";
import { PAIRS_3 } from "./compat-pairs-3";
import type { PairText } from "./compat-pairs-1";

const PAIR_TEXT_DEFAULT: Record<string, PairText> = { ...PAIRS_1, ...PAIRS_2, ...PAIRS_3 };
export const PAIR_TEXT: Record<string, PairText> = fromContent("compat_pair_text", PAIR_TEXT_DEFAULT);
