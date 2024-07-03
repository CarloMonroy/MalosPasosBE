import { IsString, IsBoolean, IsNumber } from "class-validator";

export class CreateCollectionDto {
  @IsString()
  title: string;

  @IsBoolean()
  isFeatured: boolean;
}
