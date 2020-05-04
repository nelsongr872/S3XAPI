import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './producto.repository';
import { ReadProductDto } from './dto/read-product.dto';
import { Product } from './producto.entity';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductNameDescriptionDto } from './dto/update-productNameDescription.dto';
import { UpdateProductPriceDto } from './dto/update-productPrice.dto';
import { UpdateProductCostDto } from './dto/update-productCost.dto';
import { UpdateProductSKUDto } from './dto/update-productSKU.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}
  async get(productId: number): Promise<ReadProductDto> {
    if (!productId) {
      throw new BadRequestException('id must be sent');
    }
    const product: Product = await this._productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException();
    }
    return plainToClass(ReadProductDto, product);
  }

  async getAll(): Promise<ReadProductDto[]> {
    const products: Product[] = await this._productRepository.find();
    return products.map((product: Product) =>
      plainToClass(ReadProductDto, product),
    );
  }

  async delete(productId: number): Promise<void> {
    const productExist = await this._productRepository.findOne(productId);
    if (!productExist) {
      throw new NotFoundException();
    }
    await this._productRepository.delete(productId);
  }

  async create(product: Partial<CreateProductDto>): Promise<ReadProductDto> {
    const savedProduct = await this._productRepository.save(product);
    return plainToClass(ReadProductDto, savedProduct);
  }
  async updateProductNameDescription(
    id: number,
    product: Partial<UpdateProductNameDescriptionDto>,
  ): Promise<ReadProductDto> {
    const foundProduct: Product = await this._productRepository.findOne(id);
    if (!foundProduct) {
      throw new NotFoundException('This product does not exist');
    }
    foundProduct.productName = product.productName;
    foundProduct.productDescription = product.productName;

    const updateProduct: Product = await this._productRepository.save(
      foundProduct,
    );
    await this._productRepository.update(id, updateProduct);
    return plainToClass(ReadProductDto, updateProduct);
  }
  async updateProductPrice(
    id: number,
    product: Partial<UpdateProductPriceDto>,
  ): Promise<ReadProductDto> {
    const foundProduct: Product = await this._productRepository.findOne(id);
    if (!foundProduct) {
      throw new NotFoundException('This product does not exist');
    }
    foundProduct.price = product.price;
    const updateProduct: Product = await this._productRepository.save(
      foundProduct,
    );
    await this._productRepository.update(id, updateProduct);
    return plainToClass(ReadProductDto, updateProduct);
  }
  async updateProductCost(
    id: number,
    product: Partial<UpdateProductCostDto>,
  ): Promise<ReadProductDto> {
    const foundProduct: Product = await this._productRepository.findOne(id);
    if (!foundProduct) {
      throw new NotFoundException('This product does not exist');
    }
    foundProduct.cost = product.cost;
    const updateProduct: Product = await this._productRepository.save(
      foundProduct,
    );
    await this._productRepository.update(id, updateProduct);
    return plainToClass(ReadProductDto, updateProduct);
  }
  async updateProductSKU(
    id: number,
    product: Partial<UpdateProductSKUDto>,
  ): Promise<ReadProductDto> {
    const foundProduct: Product = await this._productRepository.findOne(id);
    if (!foundProduct) {
      throw new NotFoundException('This product does not exist');
    }
    foundProduct.sku = product.sku;
    const updateProduct: Product = await this._productRepository.save(
      foundProduct,
    );
    await this._productRepository.update(id, updateProduct);
    return plainToClass(ReadProductDto, updateProduct);
  }
}
