import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImages } from './entities/productImages.entity';
import { Collection } from 'src/collection/entities/collection.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImages, Collection])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
