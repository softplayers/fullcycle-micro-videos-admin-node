import { Category } from '#category/domain';
import { NotFoundError } from '#seedwork/domain';
import { setupSequelize } from '#seedwork/infra/testing/helpers/db';
import { CategoryModel } from './category-model';
import { CategorySequelizeRepository } from './category-repository';

describe('CategorySequelizeRepository "Unit" Test', () => {

  let repository: CategorySequelizeRepository;

  setupSequelize({models: [CategoryModel] });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
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

  it('should return all categories', async () => {
    const entity = new Category({ name: 'Movie' });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  })

  it('should search...', async () => {
    await CategoryModel.factory().create();
    console.log(await CategoryModel.findAll())
  })

});
