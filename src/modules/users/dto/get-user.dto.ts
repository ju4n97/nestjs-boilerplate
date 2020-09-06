import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { UserDto } from '.';

@Exclude()
export class GetUserDto extends OmitType(UserDto, ['password'] as const) {}
