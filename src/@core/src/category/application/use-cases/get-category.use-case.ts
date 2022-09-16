import UseCase from "../../../@seedwork/application/use-case";
import CategoryRepository from "../../../category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/categoty.output";

export default class GetCategoryUseCase implements UseCase<Input, CategoryOutput> {
    constructor(private categoryRepo: CategoryRepository.Repository) { }

    async execute(input: Input): Promise<CategoryOutput> {
       const entity = await this.categoryRepo.findById(input.id);
       return CategoryOutputMapper.toOutput(entity);
    }
}

export type Input = {
    id: string;
}
