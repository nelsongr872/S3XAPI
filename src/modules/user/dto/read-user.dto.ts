import { IsNumber, IsEmail } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadUserDetailsDto } from './read-user-details.dto';
import { ReadRoleDto } from '../../../modules/role/dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadUserDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @Expose()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @Expose()
  @Type(type => ReadUserDetailsDto)
  readonly details: ReadUserDetailsDto;

  @ApiProperty()
  @Expose()
  @Type(() => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}
