import { IsNumber, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductSKUDto {
  @ApiProperty()
  @IsString()
  @MaxLength(25, { message: 'this sku is not valid' })
  sku: string;
}
