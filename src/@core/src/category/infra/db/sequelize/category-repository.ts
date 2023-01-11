import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { Category, CategoryRepository } from "#category/domain";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";
import { Op } from "sequelize";

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
    const models = await this.categoryModel.findAll();
    return models.map(m => CategoryModelMapper.toEntity(m));
  }

  async update(entity: Category): Promise<Category> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async search(props: CategoryRepository.SearchParams): Promise<CategoryRepository.SearchResult> {
    const {page, per_page, filter, sort, sort_dir} = props;

    const offset = (page - 1) * per_page
    const limit = per_page;

    const {rows, count} = await this.categoryModel.findAndCountAll({
      ...(filter && {where: { name: { [Op.like]: `%${filter}%` } }}),
      ...(sort && this.sortableFields.includes(sort) 
        ? { order: [[sort, sort_dir]]}
        : { order: [['created_at', 'DESC']]}
      ),
      offset,
      limit,
    });
    
    return new CategoryRepository.SearchResult({
      items: rows.map(m => CategoryModelMapper.toEntity(m)),
      current_page: page,
      per_page: per_page,
      total: count,
      filter: filter,
      sort: sort,
      sort_dir: sort_dir,
    })
  }
}