"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = require("../../../infra/repository/category-in-memory.repository");
const create_category_use_case_1 = require("../create-category.use-case");
describe('CreateCategoryUseCase unit tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new create_category_use_case_1.default(repository);
    });
    it('should create a category', async () => {
        const spyInsert = jest.spyOn(repository, 'insert');
        let output = await useCase.execute({ name: 'test' });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            name: 'test',
            created_at: repository.items[0].created_at,
            description: null,
            id: repository.items[0].id,
            is_active: true,
        });
        output = await useCase.execute({ name: 'test', description: 'description', is_active: false });
        expect(spyInsert).toHaveBeenCalledTimes(2);
        expect(output).toStrictEqual({
            name: 'test',
            created_at: repository.items[1].created_at,
            description: 'description',
            id: repository.items[1].id,
            is_active: false,
        });
    });
});
