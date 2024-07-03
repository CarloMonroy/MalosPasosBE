import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateMainHeroDto {
  @IsString()
  title: string;

  @IsString()
  imageUrl: string;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  collectionId: number;
}
