export interface PokemonItem {
    id: number;
    image: string;
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    species: {
        name: string;
        url: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    rarity: number;
    times: number;
    cries: {
      latest : string;
    };
    habitat: {
      name: string;
    };
    powerLevel?: number;
    isLegendary?: boolean;
    isShiny?: boolean;
}