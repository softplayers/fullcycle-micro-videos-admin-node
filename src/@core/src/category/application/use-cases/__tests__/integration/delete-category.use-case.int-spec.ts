import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import NotFoundError from "../../../../../@seedwork/domain/errors/not-found.error";
import { DeleteCategoryUseCase } from "../../delete-category.use-case";

const { CategoryRepository, CategoryModel } = CategorySequelize;

describe('DeleteCategoryUseCase integration tests', () => {
    let useCase: DeleteCategoryUseCase.UseCase;
    let repository: CategorySequelize.CategoryRepository;

    setupSequelize({ models: [CategoryModel] })

    beforeEach(() => {
        repository = new CategoryRepository(CategoryModel);
        useCase = new DeleteCategoryUseCase.UseCase(repository);
    });

    it('should throw error when entity not found', async () => {
        await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(new NotFoundError("Entity not found with id 'fake id'"));
    });

    it('should delete a category', async () => {
        const model = await CategoryModel.factory().create();
        await useCase.execute({ id: model.id });
        const noHasModel = await CategoryModel.findByPk(model.id);
        expect(noHasModel).toBeNull();
    });
}) 