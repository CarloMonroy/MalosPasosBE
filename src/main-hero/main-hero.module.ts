import { Module } from '@nestjs/common';
import { MainHeroService } from './main-hero.service';
import { MainHeroController } from './main-hero.controller';

@Module({
  controllers: [MainHeroController],
  providers: [MainHeroService],
})
export class MainHeroModule {}
