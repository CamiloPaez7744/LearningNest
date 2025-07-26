import {
  type Move,
  type PokeapiResponse,
} from "../interfaces/pokeapi-response.interface";
import {
  PokeApiAdapter,
  PokeApiFetchAdapter,
  type HttpAdapter,
} from "../api/pokeApi.adapter";

export class Pokemon {
  public readonly id: number;
  public name: string;
  private readonly http: HttpAdapter;

  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  constructor(id: number, name: string, http: HttpAdapter) {
    this.id = id;
    this.name = name;
    this.http = http;
  }

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  async getMoves(): Promise<Move[]> {
    // const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
    const { moves } = await this.http.get<PokeapiResponse>(
      `https://pokeapi.co/api/v2/pokemon/${this.id}`,
    );
    console.log(moves);

    return moves;
  }
}

const pokeApi = new PokeApiAdapter();
const pokeApiFetch = new PokeApiFetchAdapter();

export const charmander = new Pokemon(4, "Charmander", pokeApi);
export const charmanderFetch = new Pokemon(4, "Charmander", pokeApiFetch);

charmander.getMoves();
