import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

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

  @IsNumber()
  collectionId: number

  @IsArray()
  productImages: string[]

}
