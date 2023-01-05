import { UniqueEntityId } from "#seedwork/domain";
import { Category, CategoryRepository } from "#category/domain";
import { CategoryModel } from "./category-model";

export class CategorySequelizeRepository implements CategoryRepository.Repository {

  sortableFields: string[] = ["name", "created_at"];

  constructor(private model: typeof CategoryModel) {}

  async insert(entity: Category): Promise<Category> {
    const persisted = await this.model.create(entity.toJSON());
    return new Category(entity.props, new UniqueEntityId(persisted.id));
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }

  async update(entity: Category): Promise<Category> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async search(props: CategoryRepository.SearchParams): Promise<CategoryRepository.SearchResult> {
    throw new Error("Method not implemented.");
  }
}