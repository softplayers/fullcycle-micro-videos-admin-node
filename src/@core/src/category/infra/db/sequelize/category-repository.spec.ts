import { Category, CategoryRepository } from '#category/domain';
import { NotFoundError } from '#seedwork/domain';
import { setupSequelize } from '#seedwork/infra/testing/helpers/db';
import { CategoryModel } from './category-model';
import { CategorySequelizeRepository } from './category-repository';
import _chance from 'chance';
describe('CategorySequelizeRepository "Unit" Test', () => {

  let repository: CategorySequelizeRepository;
  let chance: Chance.Chance;

  setupSequelize({ models: [CategoryModel] });

  beforeAll(() => {
    chance = _chance();
  });

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

  describe('search method tests', () => {
    it('should only apply paginate when other params are null', async () => {
      const created_at = new Date();
      await CategoryModel.factory()
        .count(16)
        .bulkCreate(() => ({
          id: chance.guid({ version: 4 }),
          name: 'Movie',
          description: null,
          is_active: true,
          created_at: created_at
        }));
      const searchOutput = await repository.search(new CategoryRepository.SearchParams)
      expect(searchOutput).toBeInstanceOf(CategoryRepository.SearchResult);
      expect(searchOutput.toJSON()).toMatchObject({
        total: 16,
        current_page: 1,
        last_page: 2,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      });

      searchOutput.items.forEach(item => {
        expect(item).toBeInstanceOf(Category);
        expect(item.id).toBeDefined();
      });

      const plainItems = searchOutput.items.map(item => item.toJSON());

      expect(plainItems).toMatchObject(new Array(15).fill({
        name: 'Movie',
        description: null,
        is_active: true,
        created_at: created_at
      }))



    })
  })

});
