import {default as DefaultUseCase} from "../../../@seedwork/application/use-case";
import CategoryRepository from "../../domain/repository/category.repository";

export namespace DeleteCategoryUseCase {

    export class UseCase implements DefaultUseCase<Input, void> {
        constructor(private categoryRepo: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<void> {
        const entity = await this.categoryRepo.delete(input.id);
        return;
        }
    }

    export type Input = {
        id: string;
    }

}

export default DeleteCategoryUseCase;
