import { CreateCategoryUseCase } from '@fc/micro-videos/category/application';
import UniqueEntityId from '@fc/micro-videos/dist/@seedwork/domain/value-objects/unique-entity-id.vo';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoriesController Unit Tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    /*
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    */

    controller = new CategoriesController();
  });

  it('should create a category', async () => {

    const expectedOutput: CreateCategoryUseCase.Output = {
      id: "ab4f61f2-ddc5-4bf9-a2e5-245d19bfd729",
      name: "Movie", 
      description: "some description", 
      is_active: true,
      created_at: new Date(),
    }

    const mockCreateUseCase = {execute: jest.fn().mockReturnValue(expectedOutput)}
    // @ts-expect-error
    controller['createUseCase'] = mockCreateUseCase;

    const input: CreateCategoryDto = {
      name: "Movie", 
      description: "some description", 
      is_active: true
    };

    const output = controller.create(input);
    expect(mockCreateUseCase.execute).toBeCalledWith(input);
    expect(output).toStrictEqual(expectedOutput);
  });

  it('should update a category', () => {
    expect(controller).toBeDefined();
  });
  
  it('should delete a category', () => {
    expect(controller).toBeDefined();
  });

  it('should get a category', () => {
    expect(controller).toBeDefined();
  });

  it('should list categories', () => {
    expect(controller).toBeDefined();
  });
});
