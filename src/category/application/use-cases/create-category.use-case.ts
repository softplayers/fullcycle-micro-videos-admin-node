import { Category } from "category/domain/entities/category";

export default class CreateCategoryUseCase {
    execute(input: Input): Promise<Output> {
        const entity: Category = new Category(input);
        // Repository
    }
}

export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
}

export type Output = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date
}
