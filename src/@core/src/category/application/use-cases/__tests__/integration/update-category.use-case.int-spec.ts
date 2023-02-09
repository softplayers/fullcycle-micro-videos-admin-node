import NotFoundError from "../../../../../@seedwork/domain/errors/not-found.error";
import { UpdateCategoryUseCase } from "../../update-category.use-case";
const { CategoryRepository, CategoryModel } = CategorySequelize;

import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
describe('UpdateCategoryUseCase unit tests', () => {
    let useCase: UpdateCategoryUseCase.UseCase;
    let repository: CategorySequelize.CategoryRepository;

    setupSequelize({ models: [CategoryModel] })

    beforeEach(() => {
        repository = new CategoryRepository(CategoryModel);;
        useCase = new UpdateCategoryUseCase.UseCase(repository);
    });

    it('should throws error when entity not found', async () => {
        await expect(() => useCase.execute({ id: 'fake', name: 'test' })).rejects.toThrow(new NotFoundError("Entity not found with id 'fake'"));
    });

    it('should update a category', async () => {
        const model = await CategoryModel.factory().create();
        let output = await useCase.execute({ id: model.id, name: 'test' });
        expect(output).toMatchObject({
            name: 'test',
            created_at: model.created_at,
            description: null,
            id: model.id,
            is_active: true,
        });

        output = await useCase.execute({ id: model.id, name: 'test', description: 'description', is_active: false });
        expect(output).toStrictEqual({
            name: 'test',
            created_at: model.created_at,
            description: 'description',
            id: model.id,
            is_active: false,
        });

        output = await useCase.execute({ id: model.id, name: 'test' });
        expect(output).toStrictEqual({
            name: 'test',
            created_at: model.created_at,
            description: null,
            id: model.id,
            is_active: false,
        });


        output = await useCase.execute({ id: model.id, name: 'test' });
        expect(output).toStrictEqual({
            name: 'test',
            created_at: model.created_at,
            description: null,
            id: model.id,
            is_active: false,
        });
    });
}) 