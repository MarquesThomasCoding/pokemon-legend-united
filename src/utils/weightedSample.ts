import { PokemonItem } from "@/types/pokemon";

const tierWeight = (rarity: number): number => {
  if (rarity < 10) return 1;
  if (rarity < 50) return 5;
  if (rarity < 100) return 60;
  if (rarity < 200) return 150;
  return 250;
};

export const weightedSample = (
  pool: PokemonItem[],
  count: number,
  featuredId?: number,
  rateUp = 1,
): PokemonItem[] => {
  const remaining = [...pool];
  const result: PokemonItem[] = [];
  for (let i = 0; i < count && remaining.length > 0; i++) {
    const weights = remaining.map(p => {
      const base = tierWeight(p.rarity);
      return p.id === featuredId ? base * rateUp : base;
    });
    const total = weights.reduce((s, w) => s + w, 0);
    let r = Math.random() * total;
    let idx = remaining.length - 1;
    for (let j = 0; j < remaining.length; j++) {
      r -= weights[j];
      if (r <= 0) {
        idx = j;
        break;
      }
    }
    result.push(remaining.splice(idx, 1)[0]);
  }
  return result;
};
