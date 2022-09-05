import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import CreateCategoryUseCase from "../create-category.use-case";

describe('CreateCategoryUseCase unit tests', () => {
    let useCase: CreateCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new CreateCategoryUseCase(repository);
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
}) 