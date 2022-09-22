export default abstract class ValueObject<Type = any> {
    protected readonly _value: Type;
    constructor(value: Type);
    get value(): Type;
    toString: () => string;
}
