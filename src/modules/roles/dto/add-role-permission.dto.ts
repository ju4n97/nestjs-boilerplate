import { IsNotEmpty, IsString } from 'class-validator';

export class AddRolePermissionDto {
  @IsNotEmpty()
  @IsString()
  roleId: string;

  @IsNotEmpty()
  @IsString()
  permissionId: string;
}
