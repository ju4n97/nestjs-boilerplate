import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateInput } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() input: UserCreateInput) {
    return this.usersService.createUser(input);
  }
}
