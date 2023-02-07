import { Category, CategoryRepository as CategoryRepositoryContract } from "#category/domain";
import {
  EntityValidationError,
  LoadEntityError,
  NotFoundError,
  UniqueEntityId,
} from "#seedwork/domain";
import { SequelizeModelFactory } from "#seedwork/infra/sequelize/sequelize-model-factory";
import { Op } from "sequelize";
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export namespace CategorySequelize {
  type CategoryModelProps = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
  };

  @Table({ tableName: "categories", timestamps: false })
  export class CategoryModel extends Model<CategoryModelProps> {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    declare name: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare description: string | null;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    declare is_active: boolean;

    @Column({ allowNull: false, type: DataType.DATE })
    declare created_at: Date;

    static factory() {
      const chance: Chance.Chance = require("chance")();
      return new SequelizeModelFactory<CategoryModel, CategoryModelProps>(
        CategoryModel,
        () => ({
          id: chance.guid({ version: 4 }),
          name: chance.word(),
          description: chance.paragraph(),
          is_active: true,
          created_at: chance.date(),
        })
      );
    }
  }

  export class CategoryRepository
    implements CategoryRepositoryContract.Repository
  {
    sortableFields: string[] = ["name", "created_at"];

    constructor(private categoryModel: typeof CategoryModel) {}

    async insert(entity: Category): Promise<Category> {
      const persisted = await this.categoryModel.create(entity.toJSON());
      return CategoryModelMapper.toEntity(persisted);
    }

    async findById(id: string | UniqueEntityId): Promise<Category> {
      const model = await this._get(`${id}`);
      return CategoryModelMapper.toEntity(model);
    }

    private _get(id: string) {
      return this.categoryModel.findByPk(id, {
        rejectOnEmpty: new NotFoundError(`Entity not found with id '${id}'`),
      });
    }

    async findAll(): Promise<Category[]> {
      const models = await this.categoryModel.findAll();
      return models.map((m) => CategoryModelMapper.toEntity(m));
    }

    async update(entity: Category): Promise<Category> {
      await this._get(entity.id);
      await this.categoryModel.update(entity.toJSON(), {
        where: { id: entity.id }
      })
      return this.findById(entity.id);
    }

    async delete(id: string | UniqueEntityId): Promise<void> {
      const _id = `${id}`;
      await this._get(_id);
      await this.categoryModel.destroy({ where: { id: _id }});
    }

    async search(
      props: CategoryRepositoryContract.SearchParams
    ): Promise<CategoryRepositoryContract.SearchResult> {
      const { page, per_page, filter, sort, sort_dir } = props;

      const offset = (page - 1) * per_page;
      const limit = per_page;

      const { rows, count } = await this.categoryModel.findAndCountAll({
        ...(filter && { where: { name: { [Op.like]: `%${filter}%` } } }),
        ...(sort && this.sortableFields.includes(sort)
          ? { order: [[sort, sort_dir]] }
          : { order: [["created_at", "DESC"]] }),
        offset,
        limit,
      });

      return new CategoryRepositoryContract.SearchResult({
        items: rows.map((m) => CategoryModelMapper.toEntity(m)),
        current_page: page,
        per_page: per_page,
        total: count,
        filter: filter,
        sort: sort,
        sort_dir: sort_dir,
      });
    }
  }

  export class CategoryModelMapper {
    static toEntity(model: CategoryModel) {
      const { id, ...otherData } = model.toJSON();
      try {
        return new Category(otherData, new UniqueEntityId(id));
      } catch (e) {
        if (e instanceof EntityValidationError) {
          throw new LoadEntityError(e.error);
        }

        throw e;
      }
    }
  }
}
