import { PokemonItem } from "@/types/pokemon";

export class TeamIterator {
  private index: number;
  private readonly items: PokemonItem[];

  constructor(items: PokemonItem[], startIndex: number = 0) {
    this.items = items;
    this.index = items.length === 0
      ? 0
      : ((startIndex % items.length) + items.length) % items.length;
  }

  current(): PokemonItem | null {
    return this.items[this.index] ?? null;
  }

  next(): PokemonItem | null {
    if (this.items.length === 0) return null;
    this.index = (this.index + 1) % this.items.length;
    return this.current();
  }

  previous(): PokemonItem | null {
    if (this.items.length === 0) return null;
    this.index = (this.index - 1 + this.items.length) % this.items.length;
    return this.current();
  }

  setIndex(i: number): void {
    if (this.items.length === 0) return;
    this.index = ((i % this.items.length) + this.items.length) % this.items.length;
  }

  getIndex(): number {
    return this.index;
  }

  size(): number {
    return this.items.length;
  }

  hasItems(): boolean {
    return this.items.length > 0;
  }
}
