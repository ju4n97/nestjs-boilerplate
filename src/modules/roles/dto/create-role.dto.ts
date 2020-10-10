import { PickType } from '@nestjs/mapped-types';
import { RoleDto } from './role.dto';

export class CreateRoleDto extends PickType(RoleDto, ['name']) {}
