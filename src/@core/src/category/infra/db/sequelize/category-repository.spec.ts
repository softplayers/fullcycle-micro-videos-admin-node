import { Category } from '#category/domain';
import { NotFoundError } from '#seedwork/domain';
import { Sequelize } from 'sequelize-typescript';
import { CategoryModel } from './category-model';
import { CategorySequelizeRepository } from './category-repository';

describe('CategorySequelizeRepository "Unit" Test', () => {

  let sequelize: Sequelize;
  let repository: CategorySequelizeRepository;

  beforeAll(() => sequelize = new Sequelize({
    dialect: 'sqlite',
    host: ':memory:',
    logging: false,
    models: [CategoryModel]
  }));

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should insert a new entity', async () => {
    let category = new Category({ name: 'Movie' });
    let result = await repository.insert(category);
    expect(result.toJSON()).toStrictEqual(category.toJSON());

    category = new Category({
      name: 'Movie',
      description: 'some descrition',
      is_active: false
    });
    result = await repository.insert(category);
    expect(result.toJSON()).toStrictEqual(category.toJSON());
  });


  it('should throw error when entity not found', async () => {
    await expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError(`Entity not found with id 'fake id'`)
    )

    await expect(repository.findById('011a2da2-70e3-4a0a-b6fc-42e9ad976963')).rejects.toThrow(
      new NotFoundError(`Entity not found with id '011a2da2-70e3-4a0a-b6fc-42e9ad976963'`)
    )
  });

  it('Should find a entity by id', async () => {
    const entity = new Category({ name: 'Movie' });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

});
