import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@Expose()
export class UserDetailDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  lastName: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;
}
