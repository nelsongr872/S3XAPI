import { IsNotEmpty } from 'class-validator';
import { UserDetails } from '../user.details.entity';
import { RoleType } from '../../../modules/role/roletype.enum';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  details: UserDetails;

  @ApiProperty()
  @IsNotEmpty()
  roles: RoleType[];
}
