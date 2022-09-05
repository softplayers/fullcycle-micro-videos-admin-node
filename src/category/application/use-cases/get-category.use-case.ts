import UseCase from "../../../@seedwork/application/use-case";
import CategoryRepository from "../../../category/domain/repository/category.repository";
import { CategoryOutput } from "../dto/categoty.output.dto";

export default class GetCategoryUseCase implements UseCase<Input, CategoryOutput> {
    constructor(private categoryRepo: CategoryRepository.Repository) { }

    async execute(input: Input): Promise<CategoryOutput> {
       return (await this.categoryRepo.findById(input.id)).toJSON();
    }
}

export type Input = {
    id: string;
}
