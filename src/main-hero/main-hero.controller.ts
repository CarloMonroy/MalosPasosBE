import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainHeroService } from './main-hero.service';
import { CreateMainHeroDto } from './dto/create-main-hero.dto';
import { UpdateMainHeroDto } from './dto/update-main-hero.dto';

@Controller('main-hero')
export class MainHeroController {
  constructor(private readonly mainHeroService: MainHeroService) {}

  @Post()
  create(@Body() createMainHeroDto: CreateMainHeroDto) {
    return this.mainHeroService.create(createMainHeroDto);
  }

  @Get()
  findAll() {
    return this.mainHeroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainHeroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainHeroDto: UpdateMainHeroDto) {
    return this.mainHeroService.update(+id, updateMainHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainHeroService.remove(+id);
  }
}
