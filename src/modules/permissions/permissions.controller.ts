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
import { Role } from '../roles/enums';
import {
  CreatePermissionDto,
  GetPermissionDto,
  UpdatePermissionDto,
} from './dto';
import { PermissionsService } from './permissions.service';

@Auth(Role.SuperUser, Role.Admin)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly _permissionsService: PermissionsService) {}

  @Get()
  async getAll(
    @Query() advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetPermissionDto[]>> {
    return await this._permissionsService.getAll(advanceQuery);
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetPermissionDto>> {
    return await this._permissionsService.getById(id, advanceQuery);
  }

  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<GetPermissionDto> {
    return await this._permissionsService.create(createPermissionDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<GetPermissionDto> {
    return await this._permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<GetPermissionDto> {
    return await this._permissionsService.deleteById(id);
  }
}
