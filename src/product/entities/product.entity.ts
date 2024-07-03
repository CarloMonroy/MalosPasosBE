import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from "typeorm";
import { Collection } from "src/collection/entities/collection.entity";
import { ProductImages } from "./productImages.entity";
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  isAvailable: boolean;

  @Column()
  materials: string;
  
  @ManyToOne(() => Collection)
  @JoinColumn()
  collection: Collection;

  @OneToMany(() => ProductImages, (productImages) => productImages.product)
  productImages: ProductImages[];
}

