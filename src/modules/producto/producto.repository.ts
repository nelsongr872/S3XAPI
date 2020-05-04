import { EntityRepository, Repository } from 'typeorm';
import { Product } from './producto.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
