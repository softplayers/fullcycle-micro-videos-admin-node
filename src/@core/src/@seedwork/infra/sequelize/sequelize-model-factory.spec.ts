import _chance from 'chance';
import { Column, DataType, PrimaryKey, Sequelize, Table, Model } from 'sequelize-typescript';
import { validate as uuidValidate } from 'uuid';
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
    return new SequelizeModelFactory(StubModel, StubModel.mockFactory);
  }
}

describe('SequelizeModelFactory Unit Test', () => {

  let sequelize: Sequelize;
  beforeAll(() => sequelize = new Sequelize({
    dialect: 'sqlite',
    host: ':memory:',
    logging: false,
    models: [StubModel]
  }));

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });


  it('should search...', async () => {
    let model = await StubModel.factory().create();
    expect(uuidValidate(model.id)).toBeTruthy();
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

});
