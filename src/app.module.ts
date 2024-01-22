import { Module } from '@nestjs/common'
import { AppController, CatController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './Product/product.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { Product } from './Product/product.entity'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { User } from './users/users.entity'
import { config } from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ProductsModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rishabh@132001',
      database: 'nest',
      entities: [User, Product],
      synchronize: true,
    }),
  ],
  controllers: [AppController, CatController],
  providers: [AppService],
})
export class AppModule {}
