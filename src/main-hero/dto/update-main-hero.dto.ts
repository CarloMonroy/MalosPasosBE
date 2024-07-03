import { PartialType } from '@nestjs/mapped-types';
import { CreateMainHeroDto } from './create-main-hero.dto';

export class UpdateMainHeroDto extends PartialType(CreateMainHeroDto) {}
