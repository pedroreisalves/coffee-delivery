import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    LoginModule,
    CategoriesModule,
    ProductsModule,
    SalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
