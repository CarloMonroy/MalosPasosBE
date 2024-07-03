import { Injectable } from '@nestjs/common';
import { CreateMainHeroDto } from './dto/create-main-hero.dto';
import { UpdateMainHeroDto } from './dto/update-main-hero.dto';

@Injectable()
export class MainHeroService {
  create(createMainHeroDto: CreateMainHeroDto) {
    return 'This action adds a new mainHero';
  }

  findAll() {
    return `This action returns all mainHero`;
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
