import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface, SearchParams, SearchResult, SerchableRepositoryInterface, SortDirection } from "./repository-contracts";
export declare abstract class InMemoryRepository<E extends Entity<any>> implements RepositoryInterface<E> {
    items: E[];
    insert(entity: E): Promise<E>;
    findById(id: string | UniqueEntityId): Promise<E>;
    findAll(): Promise<E[]>;
    update(entity: E): Promise<E>;
    delete(id: string | UniqueEntityId): Promise<void>;
    protected _get(id: string): Promise<E>;
}
export declare abstract class InMemorySearchableRepository<E extends Entity<any>> extends InMemoryRepository<E> implements SerchableRepositoryInterface<E, any, any> {
    sortableFields: string[];
    search(props: SearchParams): Promise<SearchResult<E>>;
    protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;
    protected applySort(items: E[], sort: string | null, sort_dir: SortDirection | null): Promise<E[]>;
    protected applyPaginate(items: E[], page: SearchParams['page'], per_page: SearchParams['per_page']): Promise<E[]>;
}
