import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':roleid')
  getRole(@Param('roleid', ParseIntPipe) roleid: number): Promise<ReadRoleDto> {
    return this._roleService.get(roleid);
  }

  @Get()
  getRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @ApiBody({ type: [CreateRoleDto] })
  @Post()
  createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }
  @ApiBody({ type: [UpdateRoleDto] })
  @Patch(':roleid')
  updateRole(
    @Param('roleid', ParseIntPipe) roleid: number,
    @Body() role: Partial<UpdateRoleDto>,
  ) {
    return this._roleService.update(roleid, role);
  }
  @Delete(':roleid')
  async deleteRole(@Param('roleid', ParseIntPipe) roleid: number) {
    await this._roleService.delete(roleid);
    return true;
  }
}
