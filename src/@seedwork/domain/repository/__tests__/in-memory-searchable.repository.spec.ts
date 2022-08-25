import Entity from "../../entity/entity";
import NotFoundError from "../../errors/not-found.error";
import { InMemorySearchableRepository } from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {

}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields = ['name'];
  
  protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter(i => {
      return i.props.name.toLocaleLowerCase().includes(filter.toLowerCase()) 
        || i.props.price.toString() == filter
    })
  }

}

describe('StubInMemorySearchableRepository Unit Tests', () => {

  let repository: StubInMemorySearchableRepository;

  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  })

  describe('applyFilter method', () => {

    it('should not filter items when filter param is null', async () => {
      const items = [new StubEntity({name: "name value", price: 5})];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      const itemsFiltered = await repository['applyFilter'](items, null);
      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('should filter items using filter param', async () => {
      const items = [
        new StubEntity({name: "test", price: 5}),
        new StubEntity({name: "TEST", price: 5}),
        new StubEntity({name: "fake", price: 0}),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      let itemsFiltered = await repository['applyFilter'](items, 'TEST');
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await repository['applyFilter'](items, '5');
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      itemsFiltered = await repository['applyFilter'](items, 'no-filter');
      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });

  });

  describe('applySort method', () => {

    it('should not sort items', async () => {
      const items = [
        new StubEntity({name: "a", price: 5}),
        new StubEntity({name: "b", price: 5}),
      ];
      let itemsSorted = await repository['applySort'](items, null, null);
      expect(itemsSorted).toStrictEqual(items);

      itemsSorted = await repository['applySort'](items, 'price', 'asc');
      expect(itemsSorted).toStrictEqual(items);
    });

    it('should sort items', async () => {
      const items = [
        new StubEntity({name: "a", price: 5}),
        new StubEntity({name: "b", price: 5}),
        new StubEntity({name: "c", price: 5}),
      ];

      let itemsSorted = await repository['applySort'](items, 'name', 'asc');
      expect(itemsSorted).toStrictEqual(items);

      itemsSorted = await repository['applySort'](items, 'name', 'desc');
      expect(itemsSorted).toStrictEqual(items.reverse());
    });


  });

  describe('applyPaginate method', () => {

  });

  
  describe('search method', () => {

  });

});
