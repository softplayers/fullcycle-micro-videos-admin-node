import { SortDirection } from "@seedwork/domain/repository/repository-contracts";
import CategoryRepository from "category/domain/repository/category.repository";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import { Category } from "../../../category/domain/entities/category";
export default class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository.Repository {
    sortableFields: string[];
    protected applyFilter(items: Category[], filter: CategoryRepository.Filter): Promise<Category[]>;
    protected applySort(items: Category[], sort: string, sort_dir: SortDirection): Promise<Category[]>;
}
