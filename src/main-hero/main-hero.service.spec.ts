import { Test, TestingModule } from '@nestjs/testing';
import { MainHeroService } from './main-hero.service';

describe('MainHeroService', () => {
  let service: MainHeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainHeroService],
    }).compile();

    service = module.get<MainHeroService>(MainHeroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
