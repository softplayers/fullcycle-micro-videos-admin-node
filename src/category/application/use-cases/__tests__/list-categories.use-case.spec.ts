import { Category } from "../../../domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import GetCategoryUseCase from "../get-category.use-case";
import ListCategoriesUseCase from "../list-categories.use-case";
import CategoryRepository from "category/domain/repository/category.repository";

describe('ListCategoriesUseCase unit tests', () => {
    let useCase: ListCategoriesUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new ListCategoriesUseCase(repository);
    });

    test('toOutput method', () => {
        const result = new CategoryRepository.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 1,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        useCase['toOutput'](result);
    });

});

