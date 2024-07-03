import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { MainHero } from 'src/main-hero/entities/main-hero.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isFeatured: boolean;
  
  @OneToOne(() => MainHero)
  mainHero: MainHero;

  @OneToMany(() => Product, product => product.collection)
  products: Product[];

}
