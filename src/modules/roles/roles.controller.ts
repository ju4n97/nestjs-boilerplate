import { Controller, Logger } from '@nestjs/common';
import { RoleRepository } from './role.repository';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly _roleRepository: RoleRepository,
    private readonly _logger: Logger,
  ) {
    this._logger.setContext('RolesService');
  }
}
