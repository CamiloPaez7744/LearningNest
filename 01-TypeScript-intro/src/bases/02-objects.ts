export const pokemonIds: number[] = [1, 2, 3, 4, 5];

pokemonIds.push(+"6");

export interface Pokemon {
  id: number;
  name: string;
  type: string;
  isLegendary: boolean;
}

export const bulbasaur: Pokemon = {
  id: 1,
  name: "Bulbasaur",
  type: "Grass/Poison",
  isLegendary: false,
};

export const ivysaur: Pokemon = {
  id: 2,
  name: "Ivysaur",
  type: "Grass/Poison",
  isLegendary: false,
};

export const charmander: Pokemon = {
  id: 4,
  name: "Charmander",
  type: "Fire",
  isLegendary: false,
};

export const pokemonList: Pokemon[] = [bulbasaur, ivysaur, charmander];
