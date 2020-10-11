import { enumToString } from '@lib/utils/object';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { GetPermissionDto } from 'src/modules/permissions/dto';
// import { GetPermissionDto } from 'src/modules/permissions/dto';
import { RoleStatus } from '../enums/role-status.enum';

@Exclude()
export class RoleDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  name: string;

  @Expose()
  @IsEnum(RoleStatus, {
    message: `Role status not valid. Valid options: ${enumToString(
      RoleStatus,
    )}`,
  })
  status: RoleStatus;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @Type(() => GetPermissionDto)
  permissions: GetPermissionDto[];
}
