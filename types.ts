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
