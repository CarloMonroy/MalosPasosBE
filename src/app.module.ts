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
import { ProductImages } from './product/entities/productImages.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';

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
        Product,
        ProductImages,
        User
      ],
      synchronize: true,
    }),
   MainHeroModule,
   CollectionModule,
   ProductModule,
   UserModule,
   AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
