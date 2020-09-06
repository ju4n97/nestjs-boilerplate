import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { UserDetailDto } from './user-detail.dto';
import { UserDto } from './user.dto';

export class CreateUserDto extends IntersectionType(
  PickType(UserDto, ['username', 'password', 'email'] as const),
  PickType(UserDetailDto, ['firstName', 'lastName'] as const),
) {}
