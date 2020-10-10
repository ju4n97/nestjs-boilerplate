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
import { CreateRoleDto, GetRoleDto, UpdateRoleDto } from './dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RolesService {
  constructor(
    private readonly _roleRepository: RoleRepository,
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
    this._logger.log(
      `Solicitud para actualizar el nombre de el rol por el id: "${id}".`,
    );

    const role = await this._roleRepository.findOne(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this._roleRepository.save(
      Object.assign(role, removeEmptyProps(updateRoleDto)),
    );

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
