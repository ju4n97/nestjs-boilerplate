import { AdvanceQuery } from '@lib/dto/advance-result';
import { AdvanceResult } from '@lib/interfaces/advance-result';
import { mapQuery } from '@lib/utils/advance-result';
import { removeEmptyProps } from '@lib/utils/object';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PermissionRepository } from '../permissions/permission.repository';
import { CreateRoleDto, GetRoleDto, UpdateRoleDto } from './dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RolesService {
  constructor(
    private readonly _roleRepository: RoleRepository,
    private readonly _permissionRepository: PermissionRepository,
    private readonly _logger: Logger,
  ) {
    this._logger.setContext('RolesService');
  }

  async getAll(
    advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetRoleDto[]>> {
    this._logger.log('Request to fetch all roles.');

    try {
      const [result, total] = await this._roleRepository.findAndCount(
        mapQuery(advanceQuery),
      );

      return {
        data: result.map(role => plainToClass(GetRoleDto, role)),
        meta: { count: total },
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getById(
    id: string,
    advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetRoleDto>> {
    this._logger.log(`Request to fetch role by id ${id}`);

    try {
      const role = await this._roleRepository.findOne(
        id,
        mapQuery(advanceQuery, { simple: true }),
      );

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      return {
        data: plainToClass(GetRoleDto, role),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<GetRoleDto> {
    this._logger.log('Request to create role.');
    const role = this._roleRepository.create(createRoleDto);
    await this._roleRepository.save(role);
    return plainToClass(GetRoleDto, role);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<GetRoleDto> {
    this._logger.log(`Request to update role by id: "${id}".`);

    const role = await this._roleRepository.findOne(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this._roleRepository.save(
      Object.assign(role, removeEmptyProps(updateRoleDto)),
    );

    return plainToClass(GetRoleDto, role);
  }

  async addPermission(
    roleId: string,
    permissionId: string,
  ): Promise<GetRoleDto> {
    this._logger.log(
      `Request to add permission "${permissionId}" to role "${roleId}".`,
    );

    // Validates if role exists.
    const role = await this._roleRepository.findOne(roleId);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Validates if permission exists.
    const permission = await this._permissionRepository.findOne(permissionId);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    // Agrega el rol al usuario.
    role.permissions.push(permission);
    await role.save();
    return plainToClass(GetRoleDto, role);
  }

  async deleteById(id: string): Promise<GetRoleDto> {
    this._logger.log(`Request to delete a role by id "${id}".`);
    const role = await this._roleRepository.findOne(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this._roleRepository.delete(id);

    return plainToClass(GetRoleDto, role);
  }
}
