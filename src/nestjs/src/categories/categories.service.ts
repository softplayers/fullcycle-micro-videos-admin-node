import { CreateCategoryUseCase, ListCategoriesUseCase } from '@fc/micro-videos/category/application';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

  constructor(
    private createUseCase: CreateCategoryUseCase.UseCase,
    private listUseCase: ListCategoriesUseCase.UseCase,
  ) { }


  create(createCategoryDto: CreateCategoryDto) {
    return this.createUseCase.execute(createCategoryDto as any);
  }

  search() {
    return this.listUseCase.execute({});
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
