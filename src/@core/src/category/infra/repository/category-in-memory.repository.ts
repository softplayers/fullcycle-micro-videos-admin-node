import { SortDirection } from "@seedwork/domain/repository/repository-contracts";
import CategoryRepository from "category/domain/repository/category.repository";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import { Category } from "../../../category/domain/entities/category";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLocaleLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(items: Category[], sort: string, sort_dir: SortDirection): Promise<Category[]> {
    if (sort) {
      return super.applySort(items, sort, sort_dir);
  }
    return super.applySort(items, 'created_at', 'desc');
  }

}

export default CategoryInMemoryRepository;
