import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadRoleDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @MaxLength(50, { message: 'this name is not valid' })
  readonly name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @MaxLength(100, { message: 'this description is not valid' })
  readonly description: string;
}
