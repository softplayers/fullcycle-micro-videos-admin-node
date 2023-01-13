import { SequelizeModelFactory } from "#seedwork/infra/sequelize/sequelize-model-factory";
import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

type CategoryModelProperties = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

@Table({ tableName: "categories", timestamps: false })
export class CategoryModel extends Model<CategoryModelProperties> {
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
    const chance: Chance.Chance = require('chance')();
    return new SequelizeModelFactory(CategoryModel, () => ({
      id: chance.guid({ version: 4 }),
      name: chance.word(),
      description: chance.paragraph(),
      is_active: true,
      created_at: chance.date(),
    }));
  }
}
