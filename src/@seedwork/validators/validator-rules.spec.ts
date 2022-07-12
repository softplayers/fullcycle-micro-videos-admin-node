import ValidationError from "../errors/validation-error";
import ValidatorRule from "./validator-rules";

describe('ValidatorRules Unit Tests', () => {

    test('values method', () => {
        const validator = ValidatorRule.values('some value', 'field');

        expect(validator).toBeInstanceOf(ValidatorRule);
        expect(validator['value']).toBe('some value');
        expect(validator['property']).toBe('field');
    });

    test('required validation rule', () => {
        let arrange: any[] = [
            { value: null, property: 'field', messageError: 'The field is required' },
            { value: undefined, property: 'field', messageError: 'The field is required' },
            { value: "", property: 'field', messageError: 'The field is required' },
        ];

        arrange.forEach(item => {
            expect(() => ValidatorRule.values(item.value, item.property).required()).toThrow(new ValidationError(item.messageError));
        });

        arrange = [
            { value: "teste", property: 'field', messageError: '' },
            { value: 0, property: 'field', messageError: '' },
            { value: false, property: 'field', messageError: '' },
        ];

        arrange.forEach(item => {
            expect(() => ValidatorRule.values(item.value, item.property).required()).not.toThrow(new ValidationError(item.messageError));
        });
    })
});