import { Injectable } from '@nestjs/common'
import { Product } from './product.entity'
import { CreateClassDto } from 'src/dto/create-product'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productModel: Repository<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find()
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOneBy({ id })
  }

  async create(createProduct: CreateClassDto): Promise<Product> {
    const id: string = String(Date.now() + Math.random()) as string
    const createdProduct = this.productModel.create(createProduct)
    return this.productModel.save(createdProduct, { reload: true })
  }

  async update(findId: number, newProduct: CreateClassDto): Promise<Product> {
    try {
      // console.log(findId, newProduct);
      const oldProduct = await this.productModel.findOneBy({ id: findId })
      // console.log(updatedProduct);
      const updatedProduct = { ...newProduct, id: oldProduct.id }
      return updatedProduct
    } catch (error) {
      console.log(error)
    }
  }

  async delete(findId: number): Promise<Product> {
    const oldProduct = await this.productModel.findOneBy({ id: findId })
    return this.productModel.remove(oldProduct)
  }
}
