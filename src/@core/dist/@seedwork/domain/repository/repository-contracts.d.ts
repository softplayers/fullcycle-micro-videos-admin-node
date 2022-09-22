import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
export interface RepositoryInterface<E extends Entity<any>> {
    insert(entity: E): Promise<E>;
    findById(id: string | UniqueEntityId): Promise<E>;
    findAll(): Promise<E[]>;
    update(entity: E): Promise<E>;
    delete(id: string | UniqueEntityId): Promise<void>;
}
export declare type SortDirection = 'asc' | 'desc';
export declare type SearchProps<Filter = string> = {
    page?: number;
    per_page?: number;
    sort?: string;
    sort_dir?: SortDirection;
    filter?: Filter;
};
export declare class SearchParams<Filter = string> {
    protected _page: number;
    protected _per_page: number;
    protected _sort: string | null;
    protected _sort_dir: SortDirection | null;
    protected _filter: Filter | null;
    constructor(props?: SearchProps<Filter>);
    get page(): number;
    private set page(value);
    get per_page(): number;
    private set per_page(value);
    get sort(): string | null;
    private set sort(value);
    get sort_dir(): SortDirection | null;
    private set sort_dir(value);
    get filter(): Filter | null;
    private set filter(value);
}
export declare type SearchReasultsProps<E extends Entity<any>, Filter> = {
    items: E[];
    total: number;
    current_page: number;
    per_page: number;
    sort: string | null;
    sort_dir: string | null;
    filter: Filter | null;
};
export declare class SearchResult<E extends Entity<any>, Filter = string> {
    readonly items: E[];
    readonly total: number;
    readonly current_page: number;
    readonly per_page: number;
    readonly last_page: number;
    readonly sort: string | null;
    readonly sort_dir: string | null;
    readonly filter: Filter;
    constructor(props: SearchReasultsProps<E, Filter>);
    toJSON(): {
        items: E[];
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        sort: string;
        sort_dir: string;
        filter: Filter;
    };
}
export interface SerchableRepositoryInterface<E extends Entity<any>, Filter = string, SearchInput = SearchParams, SearchOutput = SearchResult<E, Filter>> extends RepositoryInterface<E> {
    search(props: SearchInput): Promise<SearchOutput>;
}
