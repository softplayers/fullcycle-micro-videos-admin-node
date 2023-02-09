import { Category } from "../../../../domain/entities/category";
import { ListCategoriesUseCase } from "../../list-categories.use-case";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import { CategoryRepository as CategoryRepositoryContract } from "#category/domain";
import _chance from 'chance';

const { CategoryRepository, CategoryModel } = CategorySequelize;
const { SearchResult } = CategoryRepositoryContract;

describe('ListCategoriesUseCase unit tests', () => {
    let useCase: ListCategoriesUseCase.UseCase;
    let repository: CategorySequelize.CategoryRepository;

    setupSequelize({ models: [CategoryModel] })

    beforeEach(() => {
        repository = new CategoryRepository(CategoryModel);
        useCase = new ListCategoriesUseCase.UseCase(repository);
    });


    it('should return output using empty input with categories ordered by created_at', async () => {
        const models = await CategoryModel.factory().count(2).bulkCreate((index) => {
            const chance = _chance();
            return {
                id: chance.guid({ version: 4 }),
                description: 'some description',
                is_active: true,
                created_at: new Date(new Date().getTime() + index),
                name: 'category' + index
            };
        });

        const output = await useCase.execute({});

        expect(output).toMatchObject({
            items: [...models]
                .reverse()
                .map(CategorySequelize.CategoryModelMapper.toEntity)
                .map(i => i.toJSON()),
            total: 2,
            current_page: 1,
            last_page: 1,
            per_page: 15,
        });
    });

    it('should returns output using pagination, sort and filter', async () => {

        const models = CategoryModel.factory().count(5).bulkMake();
        models[0].name = "a";
        models[1].name = "AAA";
        models[2].name = "AaA";
        models[3].name = "b";
        models[4].name = "c";

       await CategoryModel.bulkCreate(models.map(m => m.toJSON()));

        let output = await useCase.execute({ page: 1, per_page: 2, sort: 'name', filter: 'a' });

        expect(output).toMatchObject({
            items: [models[1], models[2]]
                .map(CategorySequelize.CategoryModelMapper.toEntity)
                .map(i => i.toJSON()),
            total: 3,
            current_page: 1,
            last_page: 2,
            per_page: 2,
        });

        output = await useCase.execute({ page: 2, per_page: 2, sort: 'name', filter: 'a' });

        expect(output).toMatchObject({
            items: [models[0]]
                .map(CategorySequelize.CategoryModelMapper.toEntity)
                .map(i => i.toJSON()),
            total: 3,
            current_page: 2,
            last_page: 2,
            per_page: 2,
        });

        output = await useCase.execute({ page: 1, per_page: 2, sort: 'name', filter: 'a', sort_dir: 'desc' });

        expect(output).toMatchObject({
            items: [models[0], models[2]]
                .map(CategorySequelize.CategoryModelMapper.toEntity)
                .map(i => i.toJSON()),
            total: 3,
            current_page: 1,
            last_page: 2,
            per_page: 2,
        });
    });

});

