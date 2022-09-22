import UseCase from "../../../@seedwork/application/use-case";
import CategoryRepository from "../../../category/domain/repository/category.repository";
import { CategoryOutput } from "../dto/categoty.output";
export default class CreateCategoryUseCase implements UseCase<Input, CategoryOutput> {
    private categoryRepo;
    constructor(categoryRepo: CategoryRepository.Repository);
    execute(input: Input): Promise<CategoryOutput>;
}
export declare type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
};
