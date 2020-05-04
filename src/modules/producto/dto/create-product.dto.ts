import { IsString, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsNumber()
  @MaxLength(25, { message: 'this SKU is not valid' })
  sku: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50, { message: 'this name is not valid' })
  productName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100, { message: 'this description is not valid' })
  productDescription: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  cost: number;
}
