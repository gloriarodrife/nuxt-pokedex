export interface PokemonEvolutionResponse {
  id: string;
  number: number;
  name: string;
  image: string;
  isFavorite: boolean;
  types?: string[];
}
export interface PokemonResponse {
  id: string;
  name: string;
  types: string[];
  weight: { minimum: string; maximum: string };
  height: { minimum: string; maximum: string };
  evolutions: PokemonEvolutionResponse[];
  maxCP: number;
  maxHP: number;
  number: number;
  previousEvolutions: PokemonEvolutionResponse[];
  image: string;
  sound: string;
  isFavorite: boolean;
}

export interface Pokemon {
  id: string;
  number: number;
  name: string;
  image: string;
  isFavorite: boolean;
  types?: string[];
}

export interface PokemonsApiResponse {
  count: number;
  items: Pokemon[];
  limit: number;
  offset: number;
}

export interface ParamsPokemons {
  limit: number;
  offset: number;
  search?: string;
  isFavorite?: boolean;
  type?: string;
}
