import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadProductDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly sku: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly productName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly productDescription: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  readonly price: number;
}
