import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleStatus } from '../enums';
import { RoleEntity } from '../role.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Gets the roles that are passed by the context of the route handler.
    let roles: string[] = this._reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    // If no roles are found in the context route handler it looks in the class context.
    if (!roles || roles.length === 0) {
      roles = this._reflector.get<string[]>('roles', context.getClass());
    }

    // If no roles are found it can continue.
    if (!roles || roles.length === 0) {
      return true;
    }

    // Gets current user from request object.
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    // Verifies if the current user has one of the specified roles
    const hasRole = user && this._matchRoles(roles, user.roles);
    return user && user.roles && hasRole;
  }

  private _matchRoles(roles: string[], userRoles: RoleEntity[]): boolean {
    return userRoles.some(
      (role: RoleEntity) =>
        roles.includes(role.name) && role.status === RoleStatus.Active,
    );
  }
}
