import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImages } from './entities/productImages.entity';
import { ProductsStock } from './entities/productsStock.entity';
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
    @InjectRepository(ProductsStock)
    private productsStockRepository: Repository<ProductsStock>
  ) {}


  async create(createProductDto: CreateProductDto) {
    const queryRunner = this.productRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the collection
      const collection = await this.collectionRepository.findOne({
        where: {
          id: createProductDto.collectionId
        }
      });
      if (!collection) {
        throw new Error('Collection not found');
      }

      // Create the product
      const product = new Product();
      product.title = createProductDto.title;
      product.description = createProductDto.description;
      product.price = createProductDto.price;
      product.stock = createProductDto.stock;
      product.isAvailable = createProductDto.isAvailable;
      product.materials = createProductDto.materials;
      product.slug = createProductDto.slug;
      product.collection = collection;

      // Create ProductsStock
      product.productsStock = createProductDto.productStocks.map((stock) => {
        const productStock = new ProductsStock();
        productStock.size = stock.size;
        productStock.stock = stock.stock;
        productStock.product = product;
        return productStock;
      });

      // Create ProductImages
      const productImages = createProductDto.productImages.map((image) => {
        const productImage = new ProductImages();
        productImage.imageUrl = image;
        productImage.product = product;
        return productImage;
      });

      // Save Product, ProductImages and ProductsStock within the transaction
      await queryRunner.manager.save(product);
      await queryRunner.manager.save(productImages);
      await queryRunner.manager.save(product.productsStock);

      // Commit the transaction
      await queryRunner.commitTransaction();

      return {
        message: 'Product created successfully',
        id: product.id
      };
    } catch (error) {
      // Rollback the transaction in case of an error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Product[]; total: number }> {
  const [data, total] = await this.productRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    relations: ['productImages', 'collection', 'productsStock']
  });

  return { data, total };
}

  findOne(productSlug: string) {
    return this.productRepository.findOne({
      where: {
        slug: productSlug
      },
      relations: ['collection', 'productImages', 'productStock']
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
