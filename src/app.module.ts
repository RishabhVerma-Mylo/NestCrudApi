import { Module } from '@nestjs/common'
import { AppController, CatController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './Product/product.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './Product/product.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rishabh@132001',
      database: 'nest',
      entities: [Product],
      synchronize: true,
    }),
    ProductsModule,
  ],
  controllers: [AppController, CatController],
  providers: [AppService],
})
export class AppModule {}
