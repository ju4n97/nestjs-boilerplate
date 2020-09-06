import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto, GetUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _logger: Logger,
  ) {
    this._logger.setContext('UsersService');
  }

  async getAll(): Promise<GetUserDto[]> {
    this._logger.log('Request to fetch all users');
    const users = await this._userRepository.find();
    return users.map(user => plainToClass(GetUserDto, user));
  }

  async getById(id: string): Promise<GetUserDto> {
    this._logger.log(`Request to fetch user by id: ${id}`);
    const user = await this._userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return plainToClass(GetUserDto, user);
  }

  async create(createUserDto: CreateUserDto): Promise<GetUserDto> {
    this._logger.log(`Request to create user: ${createUserDto}`);
    const user = this._userRepository.create(createUserDto);
    await user.save();
    return plainToClass(GetUserDto, user);
  }
}
