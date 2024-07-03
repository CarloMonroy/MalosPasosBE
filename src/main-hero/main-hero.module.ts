import { Module } from '@nestjs/common';
import { MainHeroService } from './main-hero.service';
import { MainHeroController } from './main-hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// entity
import { MainHero } from './entities/main-hero.entity';
import { Collection } from 'src/collection/entities/collection.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MainHero, Collection])],
  controllers: [MainHeroController],
  providers: [MainHeroService],
})
export class MainHeroModule {}
