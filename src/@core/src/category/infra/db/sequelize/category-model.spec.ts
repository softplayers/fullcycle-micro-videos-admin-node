import { setupSequelize } from '#seedwork/infra/testing/helpers/db';
import { DataType } from 'sequelize-typescript';
import { CategoryModel } from './category-model';

describe("CategoryModel Unit Tests", () => {

  setupSequelize({models: [CategoryModel] });

  it("create", async () => {
    const arrenge = { id: "011a2da2-70e3-4a0a-b6fc-42e9ad976963", name: "Teste", is_active: true, created_at: new Date() };
    const category = await CategoryModel.create(arrenge);
    expect(category.toJSON()).toStrictEqual(arrenge);
  });

  it("mapping properties", async () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(CategoryModel.getAttributes());

    expect(attributes).toStrictEqual(['id', 'name', 'description', 'is_active', 'created_at']);

    const idAttr = attributesMap.id;
    expect(idAttr).toMatchObject({ field: 'id', fieldName: 'id', primaryKey: true, type: DataType.UUID() });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({ field: 'name', fieldName: 'name', allowNull: false, type: DataType.STRING(255) });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({ field: 'description', fieldName: 'description', allowNull: true, type: DataType.TEXT() });

    const isActiveAttr = attributesMap.is_active;
    expect(isActiveAttr).toMatchObject({ field: 'is_active', fieldName: 'is_active', allowNull: false, type: DataType.BOOLEAN() });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({ field: 'created_at', fieldName: 'created_at', allowNull: false, type: DataType.DATE() });
  });
});
