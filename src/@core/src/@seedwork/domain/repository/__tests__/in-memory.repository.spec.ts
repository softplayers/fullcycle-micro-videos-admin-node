import Entity from "../../entity/entity";
import NotFoundError from "../../errors/not-found.error";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {

}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {

}

describe('InMemoryRepository Unit Tests', () => {

  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  })

  it('should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repository.insert(entity)
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON())
  })

  it('should throw error when entity not found', async () => {
    await expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError(`Entity not found with id 'fake id'`)
    )

    await expect(repository.findById('011a2da2-70e3-4a0a-b6fc-42e9ad976963')).rejects.toThrow(
      new NotFoundError(`Entity not found with id '011a2da2-70e3-4a0a-b6fc-42e9ad976963'`)
    )
  })

  it('Should find a entity by id', async () => {
    const entity = new StubEntity({ name: 'name', price: 5 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('Should return all entities', async () => {
    const entity = new StubEntity({ name: 'name', price: 5 });
    await repository.insert(entity);

    const entities = await repository.findAll();
    expect(entities).toStrictEqual([entity]);
  });

  it('Should update an entity', async () => {
    const entity = new StubEntity({ name: 'name', price: 5 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity({ name: 'name updated', price: 1 }, entity.uniqueEntityId);

    await repository.update(entityUpdated);

    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should throw error when entity not found', async () => {
    const entity = new StubEntity({ name: 'name', price: 5 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found with id '${entity.id}'`)
    );
  });

  it('Should delete an entity', async () => {
    const entity = new StubEntity({ name: 'name', price: 5 });

    await repository.insert(entity);
    await repository.delete(entity.id);

    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);

    expect(repository.items).toHaveLength(0);
  });

  it('should throw error on delete entity', async () => {
    expect(repository.delete('fake id')).rejects.toThrow(
      new NotFoundError(`Entity not found with id 'fake id'`)
    )

    expect(repository.delete('011a2da2-70e3-4a0a-b6fc-42e9ad976963')).rejects.toThrow(
      new NotFoundError(`Entity not found with id '011a2da2-70e3-4a0a-b6fc-42e9ad976963'`)
    )
  })

});
