import { IsNumber, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductCostDto {
  @ApiProperty()
  @IsNumber()
  cost: number;
}
