import ValueObject from "../value-objects/value-object";
import { deepFreeze } from "./object"

class StubValueObject extends ValueObject {}

describe('object Unit Tests', () => {

    it('should not freeze a scalar value', () => {
        const str = deepFreeze('a');
        expect(typeof str).toBe('string');

        let boolean = deepFreeze(true);
        expect(typeof boolean).toBe('boolean');
        
        boolean = deepFreeze(false);
        expect(typeof boolean).toBe('boolean');

        const num = deepFreeze(5);
        expect(typeof num).toBe('number');
    })

    it('should be a imuutable object', () => {

        const obj = deepFreeze({
            prop1: 'value1',
            deep: {prop2: 'value2', prop3: new Date()}
        });
        const vo = new StubValueObject(obj);

        expect(() => {
            (vo as any).value.prop1 = 'teste'
        })
        .toThrowError();

        expect(() => {
            (vo as any).value.deep.prop2 = 'teste'
        })
        .toThrowError();

        expect(() => {
            (vo as any).value.deep.prop3 = 'teste'
        })
        .toThrowError();



    })
})
