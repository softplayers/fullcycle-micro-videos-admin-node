import { Category } from "category/domain/entities/category";

class CreateCategoryUseCase {
    execute(input: any) {
        const entity: Category = new Category(input);
        // Repository
    }
}