import { AdvanceQuery } from '@lib/dto/advance-result';
import { AdvanceResult } from '@lib/interfaces/advance-result';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { RolesService } from './roles.service';

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
}
