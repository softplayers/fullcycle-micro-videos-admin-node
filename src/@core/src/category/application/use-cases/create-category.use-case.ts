import {default as DefaultUseCase} from "../../../@seedwork/application/use-case";
import { Category } from "../../../category/domain/entities/category";
import CategoryRepository from "../../../category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/categoty.output";

export namespace CreateCategoryUseCase {

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private categoryRepo: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<Output> {
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

    export type Output = CategoryOutput;
}

export default CreateCategoryUseCase;
