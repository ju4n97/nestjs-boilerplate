import { PickType } from '@nestjs/mapped-types';
import { UserDto } from '.';

export class CreateUserDto extends PickType(UserDto, [
  'username',
  'password',
  'email',
] as const) {}
