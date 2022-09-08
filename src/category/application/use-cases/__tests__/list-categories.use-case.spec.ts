import { Category } from "../../../../category/domain/entities/category";
import CategoryRepository from "../../../../category/domain/repository/category.repository";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import ListCategoriesUseCase from "../list-categories.use-case";

describe('ListCategoriesUseCase unit tests', () => {
    let useCase: ListCategoriesUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new ListCategoriesUseCase(repository);
    });

    test('toOutput method', () => {
        let result = new CategoryRepository.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        let output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            last_page: 1,
            per_page: 2,
        });

        const entity = new Category({ name: 'test' });
        result = new CategoryRepository.SearchResult({
            items: [entity],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [entity.toJSON()],
            total: 1,
            current_page: 1,
            last_page: 1,
            per_page: 2,
        });
    });

    it('should returns output using empty input with categories ordered by created_at', async () => {
        const items = [
            new Category({ name: 'test1' }),
            new Category({ name: 'test2', created_at: new Date(new Date().getTime() + 100) })
        ];

        repository.items = items;

        const output = await useCase.execute({});

        expect(output).toStrictEqual({
            items: [...items].reverse().map(i => i.toJSON()),
            total: 2,
            current_page: 1,
            last_page: 1,
            per_page: 15,
        });
    });

    it('should returns output using pagination, sort and filter', async () => {
        const items = [
            new Category({ name: 'a' }),
            new Category({ name: 'AAA' }),
            new Category({ name: 'AaA' }),
            new Category({ name: 'b' }),
            new Category({ name: 'c' })
        ];

        repository.items = items;

        let output = await useCase.execute({ page: 1, per_page: 2, sort: 'name', filter: 'a' });

        expect(output).toStrictEqual({
            items: [items[1].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            last_page: 2,
            per_page: 2,
        });

        output = await useCase.execute({ page: 2, per_page: 2, sort: 'name', filter: 'a' });

        expect(output).toStrictEqual({
            items: [items[0].toJSON()],
            total: 3,
            current_page: 2,
            last_page: 2,
            per_page: 2,
        });

        output = await useCase.execute({ page: 1, per_page: 2, sort: 'name', filter: 'a', sort_dir: 'desc' });

        expect(output).toStrictEqual({
            items: [items[0].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            last_page: 2,
            per_page: 2,
        });
    });

});

