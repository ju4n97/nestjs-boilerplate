import { Controller, Get, Param } from '@nestjs/common';
import { Auth } from '../auth/guards';
import { Role } from '../roles/enums';
import { GetUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Auth(Role.SuperUser)
  @Get()
  async getAll(): Promise<GetUserDto[]> {
    return await this._usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<GetUserDto> {
    return await this._usersService.getById(id);
  }
}
