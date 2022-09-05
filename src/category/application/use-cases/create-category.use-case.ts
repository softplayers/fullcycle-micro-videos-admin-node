import UseCase from "../../../@seedwork/application/use-case";
import { Category } from "../../../category/domain/entities/category";
import CategoryRepository from "../../../category/domain/repository/category.repository";
import { CategoryOutput } from "../dto/categoty.output.dto";

export default class CreateCategoryUseCase implements UseCase<Input, CategoryOutput> {
    constructor(private categoryRepo: CategoryRepository.Repository) { }

    async execute(input: Input): Promise<CategoryOutput> {
        const entity: Category = new Category(input);
        await this.categoryRepo.insert(entity);
        return entity.toJSON();
    }
}

export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
}
