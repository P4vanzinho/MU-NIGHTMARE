import { seed } from "@/data/seed";
import type { State } from "@/types/domain";
const key = "nightmare-prototype-v2";
export function readState(): State {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const s = JSON.parse(raw);
      if (
        Array.isArray(s.users) &&
        Array.isArray(s.listings) &&
        Array.isArray(s.orders)
      )
        return s;
    }
  } catch {
    /* Recover a corrupted demo. */
  }
  return structuredClone(seed);
}
export function saveState(state: State) {
  localStorage.setItem(key, JSON.stringify(state));
}
