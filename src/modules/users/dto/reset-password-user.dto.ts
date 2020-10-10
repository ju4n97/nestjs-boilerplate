import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class ResetPasswordUserDto extends PickType(UserDto, [
  'password',
  'passwordResetToken',
] as const) {}
