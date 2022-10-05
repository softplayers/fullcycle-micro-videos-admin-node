import {v4, validate} from 'uuid';
import InvalidUUidError from '../errors/invalid-uuid.error';
import ValueObject from './value-object';

export class UniqueEntityId extends ValueObject<string> {

    constructor(id?: string) {
        super(id || v4());
        this.validate();
    }

    private validate() {
        const isValid = validate(this.value);
        if (!isValid) {
            throw new InvalidUUidError();
        }
    }
    
}

export default UniqueEntityId;
