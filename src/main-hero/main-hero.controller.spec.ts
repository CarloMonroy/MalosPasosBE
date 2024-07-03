import { Test, TestingModule } from '@nestjs/testing';
import { MainHeroController } from './main-hero.controller';
import { MainHeroService } from './main-hero.service';

describe('MainHeroController', () => {
  let controller: MainHeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainHeroController],
      providers: [MainHeroService],
    }).compile();

    controller = module.get<MainHeroController>(MainHeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
