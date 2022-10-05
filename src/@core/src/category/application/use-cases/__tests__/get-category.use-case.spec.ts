import { Category } from "../../../../category/domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import { GetCategoryUseCase } from "../get-category.use-case";

describe('GetCategoryUseCase unit tests', () => {
    let useCase: GetCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new GetCategoryUseCase.UseCase(repository);
    });

    it('should throw error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(new NotFoundError("Entity not found with id 'fake id'"));
    });

    it('should return a category', async () => {
        const findByIdSpy = jest.spyOn(repository, 'findById')
        const items = [
            new Category({ name: 'test' })
        ];

        repository.items = items;

        const output = await useCase.execute({id: repository.items[0].id});

        expect(findByIdSpy).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            name: 'test',
            created_at: repository.items[0].created_at,
            description: null,
            id: repository.items[0].id,
            is_active: true,
        });
    });
}) 