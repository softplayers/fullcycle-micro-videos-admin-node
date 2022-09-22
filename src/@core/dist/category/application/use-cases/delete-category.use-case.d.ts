import UseCase from "../../../@seedwork/application/use-case";
import CategoryRepository from "../../domain/repository/category.repository";
export default class DeleteCategoryUseCase implements UseCase<Input, void> {
    private categoryRepo;
    constructor(categoryRepo: CategoryRepository.Repository);
    execute(input: Input): Promise<void>;
}
export declare type Input = {
    id: string;
};
