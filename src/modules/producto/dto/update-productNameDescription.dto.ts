import { IsNumber, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductNameDescriptionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50, { message: 'this SKU is not valid' })
  productName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100, { message: 'this SKU is not valid' })
  productDescription: string;
}
