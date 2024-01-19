import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { ProductType } from 'src/Interface/create-product';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Post('create')
  async createProduct(
    @Body('name') name: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
  ): Promise<Product> {
    return await this.productService.create({ name, price, desc });
  }

  @Post('update/:id')
  async updateProduct(
    @Param('id') id,
    @Body('name') name: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
  ): Promise<Product> {
    return await this.productService.update(id, { name, price, desc });
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id): Promise<Product> {
    return await this.productService.delete(id);
  }
}
