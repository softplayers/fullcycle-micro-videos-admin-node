import { SortDirection } from "../../domain/repository/repository-contracts";
export declare type SearchInputDto<Filter = string> = {
    page?: number;
    per_page?: number;
    sort?: string;
    sort_dir?: SortDirection | null;
    filter?: Filter | null;
};
