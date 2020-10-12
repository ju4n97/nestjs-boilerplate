import { AdvanceQuery } from '@lib/dto/advance-result';
import { AdvanceResult } from '@lib/interfaces/advance-result';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Auth } from '../auth/guards';
import {
  AddRolePermissionDto,
  CreateRoleDto,
  GetRoleDto,
  UpdateRoleDto,
} from './dto';
import { Role } from './enums';
import { RolesService } from './roles.service';

@Auth(Role.SuperUser, Role.Admin)
@Controller('roles')
export class RolesController {
  constructor(private readonly _rolesService: RolesService) {}

  @Get()
  async getAll(
    @Query() advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetRoleDto[]>> {
    return await this._rolesService.getAll(advanceQuery);
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetRoleDto>> {
    return await this._rolesService.getById(id, advanceQuery);
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<GetRoleDto> {
    return await this._rolesService.create(createRoleDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<GetRoleDto> {
    return await this._rolesService.update(id, updateRoleDto);
  }

  @Post('permission')
  async addPermission(
    @Body() addRolePermissionDto: AddRolePermissionDto,
  ): Promise<GetRoleDto> {
    const { roleId, permissionId } = addRolePermissionDto;
    return await this._rolesService.addPermission(roleId, permissionId);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<GetRoleDto> {
    return await this._rolesService.deleteById(id);
  }
}
