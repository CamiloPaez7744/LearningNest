import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit') || 10;
  }
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name =
      createPokemonDto.name.charAt(0).toUpperCase() +
      createPokemonDto.name.slice(1).toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .sort({ no: 1 })
      .skip(offset)
      .limit(limit)
      .exec();
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

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
    } catch (error) {
      this.handleException(error);
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // try {
    //   await pokemon.deleteOne();
    //   return { message: `Pokemon with id ${id} deleted successfully` };
    // } catch (error) {
    //   this.handleException(error);
    // }
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    if (!acknowledged) {
      throw new InternalServerErrorException(
        'Could not delete Pokemon - try again later',
      );
    }
    return { message: `Pokemon with id ${id} deleted successfully` };
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      console.error('Pokemon with this name or number already exists:', error);
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
