"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../../category/domain/entities/category");
const not_found_error_1 = require("../../../../@seedwork/domain/errors/not-found.error");
const category_in_memory_repository_1 = require("../../../infra/repository/category-in-memory.repository");
const get_category_use_case_1 = require("../get-category.use-case");
describe('GetCategoryUseCase unit tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new get_category_use_case_1.default(repository);
    });
    it('should throw error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(new not_found_error_1.default("Entity not found with id 'fake id'"));
    });
    it('should return a category', async () => {
        const findByIdSpy = jest.spyOn(repository, 'findById');
        const items = [
            new category_1.Category({ name: 'test' })
        ];
        repository.items = items;
        const output = await useCase.execute({ id: repository.items[0].id });
        expect(findByIdSpy).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            name: 'test',
            created_at: repository.items[0].created_at,
            description: null,
            id: repository.items[0].id,
            is_active: true,
        });
    });
});
