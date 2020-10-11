import { PickType } from '@nestjs/mapped-types';
import { PermissionDto } from './permission.dto';

export class UpdatePermissionDto extends PickType(PermissionDto, [
  'name',
  'status',
  'path',
  'icon',
  'group',
] as const) {}
