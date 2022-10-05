import {default as DefaultUseCase} from "../../../@seedwork/application/use-case";
import CategoryRepository from "../../../category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/categoty.output";

export namespace GetCategoryUseCase {

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private categoryRepo: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<Output> {
        const entity = await this.categoryRepo.findById(input.id);
        return CategoryOutputMapper.toOutput(entity);
        }
    }

    export type Input = {
        id: string;
    }

    export type Output = CategoryOutput;
}

export default GetCategoryUseCase;
