import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './categories.providers';
import { CategoriesService } from './categories.service';


@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule { }
