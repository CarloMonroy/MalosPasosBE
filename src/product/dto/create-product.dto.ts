import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class ProductStock {
  size: string;
  stock: number;
}

export class CreateProductDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsNumber()
  price: number

  @IsNumber()
  stock: number

  @IsBoolean()
  isAvailable: boolean

  @IsString()
  materials: string

  @IsString()
  slug: string

  @IsNumber()
  collectionId: number

  @IsArray()
  productImages: string[]


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductStock)
  productStocks: ProductStock[];
}

