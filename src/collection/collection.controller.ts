import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Get(':collectionName/products')
  findProductsInCollection(@Param('collectionName') collectionName: string) {
    return this.collectionService.findProductsInCollection(collectionName);
  }

  @Get(':collectionName/products/paginate')
  findProductsInCollectionPaginated(
    @Param('collectionName') collectionName: string,
    @Query('start') start: string, // Query parameters are strings by default
    @Query('limit') limit: string,
    @Query('sort') sort: string
  ) {
    return this.collectionService.findProductsInCollectionPaginated(collectionName, parseInt(start), parseInt(limit), sort);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
