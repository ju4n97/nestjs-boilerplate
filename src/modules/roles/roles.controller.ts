import { AdvanceQuery } from '@lib/dto/advance-result';
import { AdvanceResult } from '@lib/interfaces/advance-result';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { GetRoleDto } from './dto/get-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly _rolesService: RolesService) {}

  @Get()
  async consultarTodo(
    @Query() advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetRoleDto[]>> {
    return await this._rolesService.getAll(advanceQuery);
  }

  @Get(':id')
  async consultarPorId(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetRoleDto>> {
    return await this._rolesService.getById(id, advanceQuery);
  }
}
