import ValueObject from './value-object';
export default class UniqueEntityId extends ValueObject<string> {
    constructor(id?: string);
    private validate;
}
