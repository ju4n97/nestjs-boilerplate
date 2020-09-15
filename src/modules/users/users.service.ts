import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { CreateUserDto, GetUserDto, LoginUserDto } from './dto';
import { UserDetailEntity } from './entities/user-detail.entity';
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

  async getByUsername(username: string): Promise<GetUserDto> {
    this._logger.log(`Request to fetch user by username: ${username}`);
    const user = await this._userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return plainToClass(GetUserDto, user);
  }

  async getByLoginCredentials({
    username,
    password,
  }: LoginUserDto): Promise<GetUserDto> {
    this._logger.log('Request to fetch user by login credentials.');

    // Checks if user exists.
    const user = await this._userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Username incorrect.');
    }

    // Checks if user password is correct.
    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Password incorrect.');
    }

    return plainToClass(GetUserDto, user);
  }

  async create(createUserDto: CreateUserDto): Promise<GetUserDto> {
    this._logger.log(`Request to create a new user`);
    const { username, email, firstName, lastName } = createUserDto;

    const userInDb = await this._userRepository.findOne({
      where: [{ username }, { email }],
    });

    console.log(userInDb);

    if (userInDb) {
      throw new BadRequestException('Username already registered');
    }

    const user = this._userRepository.create(createUserDto);

    const userDetail = new UserDetailEntity();
    userDetail.firstName = firstName;
    userDetail.lastName = lastName;
    user.details = userDetail;

    await user.save();

    return plainToClass(GetUserDto, user);
  }
}
