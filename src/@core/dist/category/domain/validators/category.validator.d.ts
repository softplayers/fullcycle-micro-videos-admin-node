import ClassValidatorFields from "../../../@seedwork/domain/validators/class-validator-fields";
import { CategoryProperties } from "../entities/category";
export declare class CategoryRules {
    name: string;
    description: string;
    is_active: string;
    created_at: Date;
    constructor({ name, description, is_active, created_at, }: CategoryProperties);
}
export declare class CategoryValidator extends ClassValidatorFields<CategoryRules> {
    validate(data: CategoryProperties): boolean;
}
export default class CategoryValidatorFactory {
    static create(): CategoryValidator;
}
