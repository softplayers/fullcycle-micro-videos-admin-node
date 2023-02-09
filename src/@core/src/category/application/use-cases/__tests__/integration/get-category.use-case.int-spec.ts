import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import NotFoundError from "../../../../../@seedwork/domain/errors/not-found.error";
import { GetCategoryUseCase } from "../../get-category.use-case";

const { CategoryRepository, CategoryModel } = CategorySequelize;

describe('GetCategoryUseCase integration tests', () => {
    let useCase: GetCategoryUseCase.UseCase;
    let repository: CategorySequelize.CategoryRepository;

    setupSequelize({ models: [CategoryModel] })


    beforeEach(() => {
        repository = new CategoryRepository(CategoryModel);
        useCase = new GetCategoryUseCase.UseCase(repository);
    });

    it('should throw error when entity not found', async () => {
        await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(new NotFoundError("Entity not found with id 'fake id'"));
    });

    it('should return a category', async () => {
        const model = await CategoryModel.factory().create();
        const output = await useCase.execute({ id: model.id });
        expect(output).toStrictEqual({
            id: model.id,
            name: model.name,
            is_active: model.is_active,
            created_at: model.created_at,
            description: model.description,
        });
    });
}) 