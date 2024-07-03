import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainHeroModule } from './main-hero/main-hero.module';
import { CollectionModule } from './collection/collection.module';
import { ProductModule } from './product/product.module';
// Entity's
import { MainHero } from './main-hero/entities/main-hero.entity';
import { Collection } from './collection/entities/collection.entity';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
   TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [
        MainHero,
        Collection,
        Product
      ],
      synchronize: true,
    }),
   MainHeroModule,
   CollectionModule,
   ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
