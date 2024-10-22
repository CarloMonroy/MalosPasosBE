import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';



@Entity()
export class GenderCatalog {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;

  @OneToMany(() => Product, product => product.gender)
  products: Product[];
}