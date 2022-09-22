import UseCase from "../../../@seedwork/application/use-case";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/categoty.output";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input";
import { PaginationOutputDto } from "../../../@seedwork/application/dto/pagination-output";
export default class ListCategoriesUseCase implements UseCase<Input, Output> {
    private categoryRepo;
    constructor(categoryRepo: CategoryRepository.Repository);
    execute(input: Input): Promise<Output>;
    private toOutput;
}
export declare type Input = SearchInputDto;
export declare type Output = PaginationOutputDto<CategoryOutput>;
