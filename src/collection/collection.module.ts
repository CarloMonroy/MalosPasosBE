import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { GenderCatalog } from 'src/entities/genderCatalog.entity';
import { Product } from 'src/product/entities/product.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Collection, Product, GenderCatalog])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
