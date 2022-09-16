import UseCase from "../../../@seedwork/application/use-case";
import { Category } from "../../../category/domain/entities/category";
import CategoryRepository from "../../../category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/categoty.output";

export default class CreateCategoryUseCase implements UseCase<Input, CategoryOutput> {
    constructor(private categoryRepo: CategoryRepository.Repository) { }

    async execute(input: Input): Promise<CategoryOutput> {
        const entity: Category = new Category(input);
        await this.categoryRepo.insert(entity);
        return CategoryOutputMapper.toOutput(entity);
    }
}

export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
}
