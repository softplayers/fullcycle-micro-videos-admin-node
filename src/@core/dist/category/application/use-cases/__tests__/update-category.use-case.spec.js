"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../../category/domain/entities/category");
const not_found_error_1 = require("../../../../@seedwork/domain/errors/not-found.error");
const category_in_memory_repository_1 = require("../../../infra/repository/category-in-memory.repository");
const update_category_use_case_1 = require("../update-category.use-case");
describe('UpdateCategoryUseCase unit tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new update_category_use_case_1.default(repository);
    });
    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake', name: 'test' })).rejects.toThrow(new not_found_error_1.default("Entity not found with id 'fake'"));
    });
    it('should update a category', async () => {
        const spyUpdate = jest.spyOn(repository, 'update');
        const entity = new category_1.Category({ name: 'Movie' });
        repository.items = [entity];
        let output = await useCase.execute({ id: entity.id, name: 'test' });
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            name: 'test',
            created_at: repository.items[0].created_at,
            description: null,
            id: repository.items[0].id,
            is_active: true,
        });
        output = await useCase.execute({ id: entity.id, name: 'test', description: 'description', is_active: false });
        expect(output).toStrictEqual({
            name: 'test',
            created_at: repository.items[0].created_at,
            description: 'description',
            id: repository.items[0].id,
            is_active: false,
        });
        output = await useCase.execute({ id: entity.id, name: 'test' });
        expect(output).toStrictEqual({
            name: 'test',
            created_at: repository.items[0].created_at,
            description: null,
            id: repository.items[0].id,
            is_active: false,
        });
        output = await useCase.execute({ id: entity.id, name: 'test' });
        expect(output).toStrictEqual({
            name: 'test',
            created_at: repository.items[0].created_at,
            description: null,
            id: repository.items[0].id,
            is_active: false,
        });
    });
});
