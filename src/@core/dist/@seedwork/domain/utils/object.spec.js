"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_object_1 = require("../value-objects/value-object");
const object_1 = require("./object");
class StubValueObject extends value_object_1.default {
}
describe('object Unit Tests', () => {
    it('should not freeze a scalar value', () => {
        const str = (0, object_1.deepFreeze)('a');
        expect(typeof str).toBe('string');
        let boolean = (0, object_1.deepFreeze)(true);
        expect(typeof boolean).toBe('boolean');
        boolean = (0, object_1.deepFreeze)(false);
        expect(typeof boolean).toBe('boolean');
        const num = (0, object_1.deepFreeze)(5);
        expect(typeof num).toBe('number');
    });
    it('should be a imuutable object', () => {
        const obj = (0, object_1.deepFreeze)({
            prop1: 'value1',
            deep: { prop2: 'value2', prop3: new Date() }
        });
        const vo = new StubValueObject(obj);
        expect(() => {
            vo.value.prop1 = 'teste';
        })
            .toThrowError();
        expect(() => {
            vo.value.deep.prop2 = 'teste';
        })
            .toThrowError();
        expect(() => {
            vo.value.deep.prop3 = 'teste';
        })
            .toThrowError();
    });
});
