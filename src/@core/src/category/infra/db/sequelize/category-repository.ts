import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { Category, CategoryRepository } from "#category/domain";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";

export class CategorySequelizeRepository implements CategoryRepository.Repository {

  sortableFields: string[] = ["name", "created_at"];

  constructor(private categoryModel: typeof CategoryModel) { }

  async insert(entity: Category): Promise<Category> {
    const persisted = await this.categoryModel.create(entity.toJSON());
    return CategoryModelMapper.toEntity(persisted);
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const model = await this._get(`${id}`);
    return CategoryModelMapper.toEntity(model);
  }

  private _get(id: string) {
    return this.categoryModel.findByPk(id, { rejectOnEmpty: new NotFoundError(`Entity not found with id '${id}'`) });
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