import { Category } from '#category/domain';
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
    let category = new Category({name: 'Movie'});
    let result = await repository.insert(category);
    expect(result.toJSON()).toStrictEqual(category.toJSON());
    
    category = new Category({
      name: 'Movie', 
      description: 'some descrition', 
      is_active: false
    });
    result = await repository.insert(category);
    expect(result.toJSON()).toStrictEqual(category.toJSON());
  })

});
