import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
