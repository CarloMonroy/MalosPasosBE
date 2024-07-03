import { Injectable } from '@nestjs/common';
import { CreateMainHeroDto } from './dto/create-main-hero.dto';
import { UpdateMainHeroDto } from './dto/update-main-hero.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// entity
import { MainHero } from './entities/main-hero.entity';
import { Collection } from 'src/collection/entities/collection.entity';
@Injectable()
export class MainHeroService {
  constructor(
    @InjectRepository(MainHero)
    private mainHeroRepository: Repository<MainHero>,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) { }

  async create(createMainHeroDto: CreateMainHeroDto) {
  // Step 1: Find the Collection entity
  const collection = await this.collectionRepository.findOne({
    where: {
      id: createMainHeroDto.collectionId
    }
  });
  if (!collection) {
    throw new Error('Collection not found');
  }

  // Step 2: Create MainHero instance
  const mainHero = new MainHero();
  mainHero.title = createMainHeroDto.title;
  mainHero.imageUrl = createMainHeroDto.imageUrl;
  mainHero.isActive = createMainHeroDto.isActive;

  // Step 3: Assign Collection to MainHero
  mainHero.collection = collection;

  // Step 4: Save MainHero entity
  return this.mainHeroRepository.save(mainHero);
} 

  findAll() {
    return this.mainHeroRepository.find({
      where: {
        isActive: true
      },
      relations: ['collection']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} mainHero`;
  }

  update(id: number, updateMainHeroDto: UpdateMainHeroDto) {
    return `This action updates a #${id} mainHero`;
  }

  remove(id: number) {
    return `This action removes a #${id} mainHero`;
  }
}
