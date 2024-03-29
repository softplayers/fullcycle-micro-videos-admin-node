import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CATEGORY_PROVIDERS } from './categories.providers';
describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
        ...Object.values(CATEGORY_PROVIDERS.USE_CASES),],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
