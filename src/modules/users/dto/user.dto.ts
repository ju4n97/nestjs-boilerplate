import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GetFileDto } from 'src/modules/files/dto';
import { GetRoleDto } from 'src/modules/roles/dto';
import { UserDetailEntity } from '../entities/user-detail.entity';
import { GetUserDetailDto } from './get-user-detail.dto';

@Exclude()
export class UserDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  username: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password length must be greater than 6.' })
  password: string;

  @Expose()
  @IsString()
  passwordResetToken: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  passwordResetTokenExpires: Date;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(60)
  email: string;

  @Expose()
  @IsBoolean()
  emailConfirmed: boolean;

  @Expose()
  @IsNotEmpty()
  @IsPhoneNumber('CO')
  phoneNumber: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;

  @Expose()
  @Type(() => UserDetailEntity)
  details: GetUserDetailDto;

  @Expose()
  @Type(() => GetRoleDto)
  roles: GetRoleDto[];

  @Expose()
  @Type(() => GetFileDto)
  files: GetFileDto[];
}
