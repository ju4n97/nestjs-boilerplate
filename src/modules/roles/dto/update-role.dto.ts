import { PartialType, PickType } from '@nestjs/mapped-types';
import { RoleDto } from './role.dto';

export class UpdateRoleDto extends PartialType(
  PickType(RoleDto, ['name', 'status'] as const),
) {}
