import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController, CatController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './Product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/NestApp'),
    ProductsModule,
  ],
  controllers: [AppController, CatController],
  providers: [AppService],
})
export class AppModule {}
