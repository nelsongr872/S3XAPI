import {
  Controller,
  Param,
  Get,
  ParseIntPipe,
  Patch,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReadUserDto } from './dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { UpdateDateColumn } from 'typeorm';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<ReadUserDto> {
    return this._userService.get(id);
  }

  @Get()
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @ApiBody({ type: [UpdateEmailDto] })
  @Patch(':userid')
  updateEmail(
    @Param('userid', ParseIntPipe) email: string,
    @Body() user: UpdateEmailDto,
  ) {
    return this._userService.updateEmail(email, user);
  }

  @Delete(':userid')
  async deleteUser(@Param('userid', ParseIntPipe) id: number): Promise<void> {
    return this._userService.delete(id);
  }
  @Post('setRole/:userId/:roleId')
  async setRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }
}
