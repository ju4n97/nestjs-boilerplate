import { enumToString } from '@lib/utils/object';
import { Exclude, Expose } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { PermissionGroup, PermissionStatus } from '../enums';

@Exclude()
export class PermissionDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  path: string;

  @Expose()
  @IsString()
  @MaxLength(20)
  icon: string;

  @Expose()
  @IsEnum(PermissionGroup, {
    message: `Permission group is not valid. Valid options: ${enumToString(
      PermissionGroup,
    )}`,
  })
  group: PermissionGroup;

  @Expose()
  @IsEnum(PermissionStatus, {
    message: `Permission status is not valid. Valid options: ${enumToString(
      PermissionStatus,
    )}`,
  })
  status: PermissionStatus;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;
}
