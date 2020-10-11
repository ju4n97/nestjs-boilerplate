import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { RoleDto } from './role.dto';

@Exclude()
export class GetRoleDto extends OmitType(RoleDto, [] as const) {}
