import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductsStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  size: string;

  @Column()
  stock: number;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;
}