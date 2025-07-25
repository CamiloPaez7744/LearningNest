class NewPokemon {
  public readonly id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  scream() {
    console.log(`${this.name.toUpperCase()} I don't want to battle!!!`);
  }

  speak() {
    console.log(`${this.name} I don't want to battle!!!`);
  }
}

const MyDecorator = () => {
  return (target: Function) => {
    console.log(target);
    return NewPokemon;
  };
};

@MyDecorator()
export class Pokemon {
  public readonly id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }
}

export const charmander = new Pokemon(4, "Charmander");
