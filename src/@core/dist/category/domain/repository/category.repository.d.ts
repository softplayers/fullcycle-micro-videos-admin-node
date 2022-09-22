import { SearchParams as DefaultSearchParams, SearchResult as DefaultSearchResult, SerchableRepositoryInterface } from "../../../@seedwork/domain/repository/repository-contracts";
import { Category } from "../entities/category";
export declare namespace CategoryRepository {
    type Filter = string;
    class SearchParams extends DefaultSearchParams<Filter> {
    }
    class SearchResult extends DefaultSearchResult<Category, Filter> {
    }
    interface Repository extends SerchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> {
    }
}
export default CategoryRepository;
