import { Category } from "../../../../category/domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import UpdateCategoryUseCase from "../update-category.use-case";

describe('UpdateCategoryUseCase unit tests', () => {
    let useCase: UpdateCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new UpdateCategoryUseCase(repository);
    });

    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake', name: 'test' })).rejects.toThrow(new NotFoundError("Entity not found with id 'fake'"));
    });

    it('should update a category', async () => {
        const spyUpdate = jest.spyOn(repository, 'update');
        const entity = new Category({ name: 'Movie' });
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
}) 