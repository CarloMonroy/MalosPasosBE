import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class ProductStock {
  // size u is for universal size
  size: "s" | "m" | "l" | "u";
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

  @IsNumber()
  genderId: number


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductStock)
  productStocks: ProductStock[];
}

