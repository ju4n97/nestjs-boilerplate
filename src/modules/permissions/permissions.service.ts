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
import {
  CreatePermissionDto,
  GetPermissionDto,
  UpdatePermissionDto,
} from './dto';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly _permissionRepository: PermissionRepository,
    private readonly _logger: Logger,
  ) {
    this._logger.setContext('PermissionsService');
  }

  async getAll(
    advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetPermissionDto[]>> {
    this._logger.log('Request to fetch all permissions.');

    try {
      const [result, total] = await this._permissionRepository.findAndCount(
        mapQuery(advanceQuery),
      );

      return {
        data: result.map(role => plainToClass(GetPermissionDto, role)),
        meta: { count: total },
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getById(
    id: string,
    advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetPermissionDto>> {
    this._logger.log(`Request to fetch role by id ${id}`);

    try {
      const role = await this._permissionRepository.findOne(
        id,
        mapQuery(advanceQuery, { simple: true }),
      );

      if (!role) {
        throw new NotFoundException('Permission not found');
      }

      return {
        data: plainToClass(GetPermissionDto, role),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<GetPermissionDto> {
    this._logger.log('Request to create a permission.');
    const permission = this._permissionRepository.create(createPermissionDto);
    await this._permissionRepository.save(permission);
    return plainToClass(GetPermissionDto, permission);
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<GetPermissionDto> {
    this._logger.log(`Request to update permission by id: "${id}".`);

    const permission = await this._permissionRepository.findOne(id);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    await this._permissionRepository.save(
      Object.assign(permission, removeEmptyProps(updatePermissionDto)),
    );

    return plainToClass(GetPermissionDto, permission);
  }

  async deleteById(id: string): Promise<GetPermissionDto> {
    this._logger.log(`Request to delete a role by id "${id}".`);
    const permission = await this._permissionRepository.findOne(id);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    await this._permissionRepository.delete(id);

    return plainToClass(GetPermissionDto, permission);
  }
}
