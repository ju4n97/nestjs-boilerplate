import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { PermissionDto } from './permission.dto';

@Exclude()
export class GetPermissionDto extends OmitType(PermissionDto, [
  'status',
] as const) {}
