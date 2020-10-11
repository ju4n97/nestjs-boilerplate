import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class ForgotPasswordUserDto extends PickType(UserDto, ['email']) {}
