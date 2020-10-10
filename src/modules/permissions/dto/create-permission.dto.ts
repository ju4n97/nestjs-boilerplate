import { OmitType } from '@nestjs/mapped-types';
import { PermissionDto } from './permission.dto';

export class CreatePermissionDto extends OmitType(PermissionDto, [
  'id',
  'status',
  'createdAt',
  'updatedAt',
] as const) {}
