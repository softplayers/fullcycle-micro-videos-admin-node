"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../domain/entities/category");
const not_found_error_1 = require("../../../../@seedwork/domain/errors/not-found.error");
const category_in_memory_repository_1 = require("../../../infra/repository/category-in-memory.repository");
const delete_category_use_case_1 = require("../delete-category.use-case");
describe('DeleteCategoryUseCase unit tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new delete_category_use_case_1.default(repository);
    });
    it('should throw error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(new not_found_error_1.default("Entity not found with id 'fake id'"));
    });
    it('should delete a category', async () => {
        const deleteMethod = jest.spyOn(repository, 'delete');
        const items = [
            new category_1.Category({ name: 'test' })
        ];
        repository.items = items;
        await useCase.execute({ id: repository.items[0].id });
        expect(deleteMethod).toHaveBeenCalledTimes(1);
        expect(repository.items).toHaveLength(0);
    });
});
