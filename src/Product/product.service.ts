import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from 'src/Interface/create-product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(findId: string): Promise<Product> {
    return this.productModel.findOne({ id: findId }).exec();
  }

  async create(createProduct: CreateClassDto): Promise<Product> {
    const id: string = String(Date.now() + Math.random()) as string;
    const createdProduct = new this.productModel({ id, ...createProduct });
    return createdProduct.save();
  }

  async update(findId: string, newProduct: CreateClassDto): Promise<Product> {
    try {
      // console.log(findId, newProduct);
      const updatedProduct = await this.productModel.findOneAndUpdate(
        { id: findId },
        newProduct,
        { new: true },
      );
      // console.log(updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(findId: string) {
    return this.productModel.findOneAndDelete({ id: findId });
  }
}
