import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImages } from './entities/productImages.entity';
import { Collection } from 'src/collection/entities/collection.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImages)
    private productImagesRepository: Repository<ProductImages>,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}


  async create(createProductDto: CreateProductDto) {
    // Create a product and its children ProductImages
    const collection = await this.collectionRepository.findOne({
      where: {
        id: createProductDto.collectionId
      }
    });
    if (!collection) {
      throw new Error('Collection not found');
    }

    const product = new Product();
    product.title = createProductDto.title;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.stock = createProductDto.stock;
    product.isAvailable = createProductDto.isAvailable;
    product.materials = createProductDto.materials;
    product.collection = collection;

    // Create ProductImages
    const productImages = createProductDto.productImages.map((image) => {
      const productImage = new ProductImages();
      productImage.imageUrl = image;
      productImage.product = product;
      return productImage;
    });

    // Save Product and ProductImages
    await this.productRepository.save(product);
    await this.productImagesRepository.save(productImages);

    return product;

  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Product[]; total: number }> {
  const [data, total] = await this.productRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    relations: ['productImages']
  });

  return { data, total };
}

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
