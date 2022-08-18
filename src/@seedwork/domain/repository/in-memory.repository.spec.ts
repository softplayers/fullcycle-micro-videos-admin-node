import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import InMemoryRepository from "./in-memory.repository";

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
    const entity = new StubEntity({name: 'name value', price: 5});
    await repository.insert(entity)
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON())
  })

  it('should throw error when entity not found', async () => {
    expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError(`Entity not found with id 'fake id'`)
    )

    expect(repository.findById('011a2da2-70e3-4a0a-b6fc-42e9ad976963')).rejects.toThrow(
      new NotFoundError(`Entity not found with id '011a2da2-70e3-4a0a-b6fc-42e9ad976963'`)
    )
  })

});
