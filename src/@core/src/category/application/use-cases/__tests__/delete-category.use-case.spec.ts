import { Category } from "../../../domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import CategoryInMemoryRepository from "../../../infra/db/in-memory/category-in-memory.repository";
import { DeleteCategoryUseCase } from "../delete-category.use-case";

describe('DeleteCategoryUseCase unit tests', () => {
    let useCase: DeleteCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new DeleteCategoryUseCase.UseCase(repository);
    });

    it('should throw error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(new NotFoundError("Entity not found with id 'fake id'"));
    });

    it('should delete a category', async () => {
        const deleteMethod = jest.spyOn(repository, 'delete')
        const items = [
            new Category({ name: 'test' })
        ];

        repository.items = items;

        await useCase.execute({ id: repository.items[0].id });

        expect(deleteMethod).toHaveBeenCalledTimes(1);
        expect(repository.items).toHaveLength(0);
    });
}) 