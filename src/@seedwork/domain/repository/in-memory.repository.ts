import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface, SearchParams, SearchResult, SerchableRepositoryInterface, SortDirection } from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity<any>> implements RepositoryInterface<E> {


  items: E[] = [];

  async insert(entity: E): Promise<E> {
    this.items.push(entity);
    return entity;
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const idStr = `${id}`
    return this._get(idStr);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<E> {
    await this._get(entity.id);
    const index = this.items.findIndex(item => item.id === entity.id);
    this.items[index] = entity;
    return entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const idStr = `${id}`;
    await this._get(idStr);
    const index = this.items.findIndex(item => item.id === idStr);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const idStr = `${id}`
    const item = this.items.find(item => item.id == idStr)
    if (!item) {
      throw new NotFoundError(`Entity not found with id '${id}'`);
    }
    return item;
  }

}


export abstract class InMemorySearchableRepository<E extends Entity<any>> 
    extends InMemoryRepository<E> 
    implements SerchableRepositoryInterface<E, any, any> {

  sortableFields: string[] = [];

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir);
    const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.per_page);

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;

  protected async applySort(items: E[], sort: string | null, sort_dir: SortDirection | null): Promise<E[]> {

    if (!sort || !this.sortableFields.includes(sort)) {
      return [...items];
    }

    const sortedItems = [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) return -1;
      if (a.props[sort] > b.props[sort]) return 1;
      return 0
    });
    if (sort_dir === 'desc') {
      sortedItems.reverse();
    }
    return sortedItems;
  }

  protected async applyPaginate(items: E[], page: SearchParams['page'], per_page: SearchParams['per_page']): Promise<E[]> {
    const start = (page - 1) * per_page;
    let limit = start + per_page;
    return items.slice(start, limit);
  }

}