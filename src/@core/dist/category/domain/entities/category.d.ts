import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
export declare type CategoryProperties = {
    name: string;
    description?: string | null;
    is_active?: boolean;
    created_at?: Date;
};
export declare class Category extends Entity<CategoryProperties> {
    readonly props: CategoryProperties;
    constructor(props: CategoryProperties, id?: UniqueEntityId);
    get name(): string;
    private set name(value);
    get description(): string | null | undefined;
    private set description(value);
    get is_active(): boolean | undefined;
    private set is_active(value);
    get created_at(): Date;
    update(name: string, description: string): void;
    static validate(props: CategoryProperties): void;
    activate(): void;
    deactivate(): void;
}
