import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ReadProductDto } from './dto/read-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductNameDescriptionDto } from './dto/update-productNameDescription.dto';
import { UpdateProductPriceDto } from './dto/update-productPrice.dto';
import { UpdateProductCostDto } from './dto/update-productCost.dto';
import { UpdateProductSKUDto } from './dto/update-productSKU.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateDateColumn } from 'typeorm';

@ApiTags('product')
@Controller('product')
export class ProductoController {
  constructor(private readonly _productService: ProductoService) {}

  @Get(':productId')
  getProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ReadProductDto> {
    return this._productService.get(productId);
  }

  @Get()
  getProducts(): Promise<ReadProductDto[]> {
    return this._productService.getAll();
  }

  @ApiBody({ type: [CreateProductDto] })
  @Post()
  createProduct(
    @Body() product: Partial<CreateProductDto>,
  ): Promise<ReadProductDto> {
    return this._productService.create(product);
  }

  @ApiBody({ type: [UpdateProductNameDescriptionDto] })
  @Patch(':productId')
  updateProductNameDescription(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() product: Partial<UpdateProductNameDescriptionDto>,
  ) {
    return this._productService.updateProductNameDescription(
      productId,
      product,
    );
  }

  @ApiBody({ type: [UpdateProductPriceDto] })
  @Patch(':productId')
  updateProductPrice(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() product: Partial<UpdateProductPriceDto>,
  ) {
    return this._productService.updateProductPrice(productId, product);
  }

  @ApiBody({ type: [UpdateProductCostDto] })
  @Patch(':productId')
  updateProductCost(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() product: Partial<UpdateProductCostDto>,
  ) {
    return this._productService.updateProductCost(productId, product);
  }

  @ApiBody({ type: [UpdateProductSKUDto] })
  @Patch(':productId')
  updateProductSKU(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() product: Partial<UpdateProductSKUDto>,
  ) {
    return this._productService.updateProductSKU(productId, product);
  }

  @Delete(':producId')
  async deleteRole(@Param('productId', ParseIntPipe) productId: number) {
    await this._productService.delete(productId);
    return true;
  }
}
