import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/modules/roles/enums';
import { RoleGuard } from 'src/modules/roles/guards';

export function Auth(...roles: Role[]): any {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard(), RoleGuard),
  );
}
