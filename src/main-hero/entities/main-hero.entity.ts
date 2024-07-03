import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Collection } from 'src/collection/entities/collection.entity';
@Entity()
export class MainHero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isActive: boolean;

  @Column()
  imageUrl: string;

  @Column()
  title: string;

  @OneToOne(() => Collection)
  @JoinColumn()
  collection: Collection;
}
