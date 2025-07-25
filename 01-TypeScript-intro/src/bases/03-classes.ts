import axios from "axios";
import { PokeapiResponse } from "../interfaces/pokeapi-response.interface";

// type class form of the Pokemon data structure
export class Pokemon {
    public id: number;
    public name: string;
    public type: string;
    public isLegendary: boolean;

    constructor(id: number, name: string, type: string, isLegendary: boolean) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.isLegendary = isLegendary;
    }

    get imageUrl(): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
    }

    scream(): string {
        return `${this.name.toUpperCase()}!!!`;
    }

    speak(): string {
        return `Hi, I'm ${this.name}`;
    }

    async getMoves(): Promise<string[]> {
        const { data } = await axios.get<PokeapiResponse>(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        console.log(data.moves.at(-1)?.move.name);
        return data.moves.map((move) => move.move.name);
    }

}

export const pokemonList: Pokemon[] = [
    new Pokemon(1, 'Bulbasaur', 'Grass/Poison', false),
    new Pokemon(2, 'Ivysaur', 'Grass/Poison', false),
    new Pokemon(4, 'Charmander', 'Fire', false),
];

for (const pokemon of pokemonList) {
    console.log(pokemon.speak());
    console.log(pokemon.getMoves());
    console.log(pokemon.imageUrl);
    console.log(pokemon.scream());
}

// Example form classs only constructor
// export class Pokemon2 {
//     constructor(
//         public readonly id: number,
//         public readonly name: string,
//         public readonly type: string,
//         public readonly isLegendary: boolean
//     ) {}
// }