import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/@generated/user/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    // Creates graphql context
    const gqlCtx = GqlExecutionContext.create(ctx);

    // gets the roles that are passed by the context of the route handler.
    let roles: string[] = this.reflector.get<string[]>('roles', gqlCtx.getHandler());

    // if no roles are found in the context route handler it looks in the class context.
    if (!roles || roles.length === 0) {
      roles = this.reflector.get<string[]>('roles', gqlCtx.getClass());
    }

    // if no roles are found it can continue.
    if (!roles || roles.length === 0) {
      return true;
    }

    // gets current user from request.
    const request = gqlCtx.getContext().req;
    const { user }: { user: User } = request;

    const userHasRole = !!user && roles.includes(user.role);
    return userHasRole;
  }
}
