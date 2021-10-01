import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from 'src/@generated/prisma/role.enum';
import { GqlAuthGuard } from './gql-auth.guard';
import { RolesGuard } from './role.guard';

export const Authorize = (...roles: Role[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(GqlAuthGuard, RolesGuard));
