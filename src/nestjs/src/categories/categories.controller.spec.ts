import { CreateCategoryUseCase, GetCategoryUseCase, ListCategoriesUseCase, UpdateCategoryUseCase } from '@fc/micro-videos/category/application';
import { SortDirection } from '@fc/micro-videos/dist/@seedwork/domain/repository/repository-contracts';
import { CategoriesController } from './categories.controller';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

    const mockCreateUseCase = { execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)) }
    // @ts-expect-error
    controller['createUseCase'] = mockCreateUseCase;

    const input: UpdateCategoryDto = {
      name: "Movie",
      description: "some description",
      is_active: true
    };

    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toBeCalledWith(input);
    expect(output).toStrictEqual(expectedOutput);
  });

  it('should update a category', async () => {
    const id = 'ab4f61f2-ddc5-4bf9-a2e5-245d19bfd729';
    const expectedOutput: UpdateCategoryUseCase.Output = {
      id,
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: new Date(),
    }

    const mockUpdateUseCase = { execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)) }
    // @ts-expect-error
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: UpdateCategoryDto = {
      name: "Movie",
      description: "some description",
      is_active: true
    };

    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toBeCalledWith({ id, ...input });
    expect(output).toStrictEqual(expectedOutput);
  });

  it('should delete a category', () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = { execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)) }
    // @ts-expect-error
    controller['deleteUseCase'] = mockDeleteUseCase;
    const id = 'ab4f61f2-ddc5-4bf9-a2e5-245d19bfd729';
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = controller.remove(id);
    expect(mockDeleteUseCase.execute).toBeCalledWith({ id });
    expect(output).toStrictEqual(output);
  });

  it('should get a category', async () => {
    const id = 'ab4f61f2-ddc5-4bf9-a2e5-245d19bfd729';
    const expectedOutput: GetCategoryUseCase.Output = {
      id: "ab4f61f2-ddc5-4bf9-a2e5-245d19bfd729",
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: new Date(),
    }
    const mockGetUseCase = { execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)) }
    // @ts-expect-error
    controller['getUseCase'] = mockGetUseCase;
    const output = controller.findOne(id);
    expect(mockGetUseCase.execute).toBeCalledWith({ id });
    expect(output).toStrictEqual(output);
  });

  it('should list categories', async () => {
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id: "ab4f61f2-ddc5-4bf9-a2e5-245d19bfd729",
          name: "Movie",
          description: "some description",
          is_active: true,
          created_at: new Date(),
        }
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1
    };

    const mockListUseCase = { execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)) }
    // @ts-expect-error
    controller['listUseCase'] = mockListUseCase;

    const serchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test'
    };

    const output = await controller.search(serchParams);
    expect(mockListUseCase.execute).toBeCalledWith(serchParams);
    expect(expectedOutput).toStrictEqual(output);
  });
});
