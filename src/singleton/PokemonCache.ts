import { PokemonItem } from "@/types/pokemon";

export class PokemonCache {
  private static instance: PokemonCache;

  private readonly cache = new Map<string, PokemonItem>();
  private readonly pending = new Map<string, Promise<PokemonItem>>();

  private constructor() {}

  static getInstance(): PokemonCache {
    if (!PokemonCache.instance) {
      PokemonCache.instance = new PokemonCache();
    }
    return PokemonCache.instance;
  }

  private key(idOrName: number | string): string {
    return String(idOrName).toLowerCase();
  }

  has(idOrName: number | string): boolean {
    return this.cache.has(this.key(idOrName));
  }

  get(idOrName: number | string): PokemonItem | undefined {
    return this.cache.get(this.key(idOrName));
  }

  set(idOrName: number | string, item: PokemonItem): void {
    this.cache.set(this.key(idOrName), item);
  }

  async getOrFetch(idOrName: number | string, fetcher: (idOrName: number | string) => Promise<PokemonItem>): Promise<PokemonItem> {
    const k = this.key(idOrName);

    const cached = this.cache.get(k);
    if (cached) return cached;

    const inflight = this.pending.get(k);
    if (inflight) return inflight;

    const promise = fetcher(idOrName)
      .then((data) => {
        this.cache.set(k, data);
        this.pending.delete(k);
        return data;
      })
      .catch(err => {
        this.pending.delete(k);
        throw err;
      });

    this.pending.set(k, promise);
    return promise;
  }

  clear(): void {
    this.cache.clear();
    this.pending.clear();
  }

  size(): number {
    return this.cache.size;
  }
}
