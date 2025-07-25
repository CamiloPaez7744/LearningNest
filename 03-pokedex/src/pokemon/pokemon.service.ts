import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name =
      createPokemonDto.name.charAt(0).toUpperCase() +
      createPokemonDto.name.slice(1).toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        console.error(
          'Pokemon with this name or number already exists:',
          error,
        );
        throw new BadRequestException(
          `Pokemon exist in the database ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.error('Error creating Pokemon:', error);
      throw new InternalServerErrorException(
        'Could not create Pokemon - check server logs for details',
      );
    }
  }

  findAll() {
    return this.pokemonModel.find().sort({ no: 1 }).exec();
  }

  async findOne(id: string) {
    let pokemon: Pokemon | null = null;
    if (!isNaN(+id)) {
      pokemon = await this.pokemonModel.findOne({ no: +id }).exec();
    }

    if (isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id).exec();
    }

    pokemon ??= await this.pokemonModel.findOne({
      name: id.charAt(0).toUpperCase() + id.slice(1).toLowerCase(),
    });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);
    if (updatePokemonDto.name) {
      updatePokemonDto.name =
        updatePokemonDto.name.charAt(0).toUpperCase() +
        updatePokemonDto.name.slice(1).toLowerCase();
    }
    await pokemon.updateOne(updatePokemonDto, { new: true });

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.pokemonModel.findByIdAndDelete(id).exec();
  }
}
