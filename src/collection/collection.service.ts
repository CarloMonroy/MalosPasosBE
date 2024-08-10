import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }


  create(createCollectionDto: CreateCollectionDto) {
    return this.collectionRepository.save(createCollectionDto);
  }

  findAll() {
    return this.collectionRepository.find({
      where: {
        isFeatured: true
      }
    });
  }

  async findProductsInCollectionPaginated(collectionName: string, start: number, limit: number, sort: string) {
    let order: any = {};

    switch (sort) {
      case 'best':
        order = {
          id: 'DESC'
        };
        break;
      case 'low':
        order = {
          price: 'ASC'
        };
        break;
      case 'high':
        order = {
          price: 'DESC'
        };
        break;
      }

    const collection = await this.collectionRepository.findOne({
      where: {
        title: collectionName.replace(/-/g, ' ')
      },
    });

    if (!collection) {
      throw new NotFoundException(`Collection with name ${collectionName} not found`);
    }

    const [product, total ] = await this.productRepository.findAndCount({
      where: {
        collection: collection,
      },
      order,
      relations: ['productImages'],
      take: limit,
      skip: start
    });

    return {
      products: product,
      total
    };
  }

  async findProductsInCollection(collectionName: string) {
    const collection = await this.collectionRepository.findOne({
      where: {
        title: collectionName.replace(/-/g, ' ')
      },
    }
    );

    if (!collection) {
      throw new NotFoundException(`Collection with name ${collectionName} not found`);
    }

    const products = await this.productRepository.find({
      where: {
        collection: collection
      },
      relations: ['productImages'],
      take: 10
    });

    collection.products = products;

    return collection;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
