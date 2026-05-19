import { GachaContext, GachaResult } from '@/types/gacha';
import { weightedSample } from '@/utils/weightedSample';

export interface GachaStrategy {
  apply(count: number, ctx: GachaContext): Promise<GachaResult>;
}

export class WeightGachaStrategy implements GachaStrategy {
  async apply(count: number, ctx: GachaContext): Promise<GachaResult> {
    const pool = await ctx.fetchPool(Math.max(count * 3, 30));
    return {
      pokemons: weightedSample(pool, count),
      newPityCounter: ctx.pityCounter + count,
    };
  }
}

export class GuaranteedGachaStrategy implements GachaStrategy {
  private static readonly FOUR_STAR_THRESHOLD = 50;

  async apply(count: number, ctx: GachaContext): Promise<GachaResult> {
    const pool = await ctx.fetchPool(Math.max(count * 3, 30));
    const result = weightedSample(pool, count);

    if (
      count >= 10 &&
      !result.some(p => p.rarity < GuaranteedGachaStrategy.FOUR_STAR_THRESHOLD)
    ) {
      const rares = pool.filter(
        p =>
          p.rarity < GuaranteedGachaStrategy.FOUR_STAR_THRESHOLD &&
          !result.includes(p),
      );
      if (rares.length > 0) {
        const swap = rares[Math.floor(Math.random() * rares.length)];
        result[Math.floor(Math.random() * result.length)] = swap;
      }
    }

    return {
      pokemons: result,
      newPityCounter: ctx.pityCounter + count,
    };
  }
}

export class PityGachaStrategy implements GachaStrategy {
  private static readonly PITY_THRESHOLD = 50;
  private static readonly FEATURED_RATE_UP = 10;
  private static readonly FEATURED_PITY_ID = 150;

  async apply(count: number, ctx: GachaContext): Promise<GachaResult> {
    let pool = await ctx.fetchPool(Math.max(count * 3, 30));
    if (!pool.some(p => p.id === PityGachaStrategy.FEATURED_PITY_ID)) {
      pool = [
        await ctx.fetchById(PityGachaStrategy.FEATURED_PITY_ID),
        ...pool,
      ];
    }

    const result = weightedSample(
      pool,
      count,
      PityGachaStrategy.FEATURED_PITY_ID,
      PityGachaStrategy.FEATURED_RATE_UP,
    );
    let pity = ctx.pityCounter;

    for (let i = 0; i < result.length; i++) {
      pity++;
      if (result[i].id === PityGachaStrategy.FEATURED_PITY_ID) {
        pity = 0;
      } else if (pity >= PityGachaStrategy.PITY_THRESHOLD) {
        result[i] = await ctx.fetchById(PityGachaStrategy.FEATURED_PITY_ID);
        pity = 0;
      }
    }

    return { pokemons: result, newPityCounter: pity };
  }
}
