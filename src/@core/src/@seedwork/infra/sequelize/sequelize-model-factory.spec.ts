import _chance from 'chance';
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { validate as uuidValidate } from 'uuid';
import { setupSequelize } from '../testing/helpers/db';
import { SequelizeModelFactory } from './sequelize-model-factory';

const chance = _chance();

@Table({})
class StubModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name;

  static mockFactory = jest.fn(() => ({
    id: chance.guid({ version: 4 }),
    name: chance.word(),
  }));

  static factory() {
    return new SequelizeModelFactory<StubModel, { id: string, name: string }>(StubModel, StubModel.mockFactory);
  }
}

describe('SequelizeModelFactory Unit Test', () => {

  setupSequelize({ models: [StubModel] });

  it('create method', async () => {
    let model = await StubModel.factory().create();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toBeCalled();

    let modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);

    model = await StubModel.factory().create({
      id: "011a2da2-70e3-4a0a-b6fc-42e9ad976963",
      name: 'Test'
    });

    expect(model.id).toBe('011a2da2-70e3-4a0a-b6fc-42e9ad976963');
    expect(model.name).toBe('Test');
    expect(StubModel.mockFactory).toBeCalledTimes(1);

    modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);
  })

  it('make method', async () => {
    let model = StubModel.factory().make();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toBeCalled();

    let modelFound = await StubModel.findByPk(model.id);
    expect(modelFound).toBeNull();

    model = StubModel.factory().make({
      id: "011a2da2-70e3-4a0a-b6fc-42e9ad976963",
      name: 'Test'
    });

    expect(model.id).toBe('011a2da2-70e3-4a0a-b6fc-42e9ad976963');
    expect(model.name).toBe('Test');
    expect(StubModel.mockFactory).toBeCalledTimes(1);

    modelFound = await StubModel.findByPk(model.id);
    expect(modelFound).toBeNull();
  })

  it('bulkCreate using count = 1', async () => {

    let models = await StubModel.factory().bulkCreate();
    console.log(models);

    expect(models).toHaveLength(1);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).toBeCalled();

    let modelFound = await StubModel.findByPk(models[0].id);
    expect(modelFound).not.toBeNull();
    expect(modelFound).not.toBeNull();

    models = await StubModel.factory().bulkCreate(() => ({
      id: "011a2da2-70e3-4a0a-b6fc-42e9ad976963",
      name: 'Test'
    }));

    expect(models[0].id).toBe('011a2da2-70e3-4a0a-b6fc-42e9ad976963');
    expect(models[0].name).toBe('Test');
    expect(StubModel.mockFactory).toBeCalledTimes(1);

    modelFound = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(modelFound.id);
    expect(models[0].name).toBe(modelFound.name);
  })

  it('bulkCreate using count > 1', async () => {

    let models = await StubModel.factory().count(2).bulkCreate();
    console.log(models);

    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(models[1].id).not.toBeNull();
    expect(models[1].name).not.toBeNull();
    expect(StubModel.mockFactory).toBeCalledTimes(2);

    let modelFound1 = await StubModel.findByPk(models[0].id);
    expect(modelFound1).not.toBeNull();
    expect(modelFound1).not.toBeNull();

    let modelFound2 = await StubModel.findByPk(models[1].id);
    expect(modelFound2).not.toBeNull();
    expect(modelFound2).not.toBeNull();

    models = await StubModel
      .factory()
      .count(2)
      .bulkCreate(() => ({
        id: chance.guid({ version: 4 }),
        name: 'Test'
      }));

    expect(models[0].id).not.toBe(models[1].id);
    expect(models[0].name).toBe('Test');
    expect(models[1].name).toBe('Test');
    expect(StubModel.mockFactory).toBeCalledTimes(2);
  })

  it('bulkMake using count = 1', async () => {

    let models = StubModel.factory().bulkMake();
    console.log(models);

    expect(models).toHaveLength(1);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).toBeCalled();

    let modelFound = await StubModel.findByPk(models[0].id);
    expect(modelFound).toBeNull();

    models = StubModel.factory().bulkMake(() => ({
      id: "011a2da2-70e3-4a0a-b6fc-42e9ad976963",
      name: 'Test'
    }));

    expect(models[0].id).toBe('011a2da2-70e3-4a0a-b6fc-42e9ad976963');
    expect(models[0].name).toBe('Test');
    expect(StubModel.mockFactory).toBeCalledTimes(1);
  })

  it('bulkMake using count > 1', async () => {

    let models = StubModel.factory().count(2).bulkMake();
    console.log(models);

    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(models[1].id).not.toBeNull();
    expect(models[1].name).not.toBeNull();
    expect(StubModel.mockFactory).toBeCalledTimes(2);

    models = StubModel
      .factory()
      .count(2)
      .bulkMake(() => ({
        id: chance.guid({ version: 4 }),
        name: 'Test'
      }));

    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBe(models[1].id);
    expect(models[0].name).toBe('Test');
    expect(models[1].name).toBe('Test');
    expect(StubModel.mockFactory).toBeCalledTimes(2);
  })
});
