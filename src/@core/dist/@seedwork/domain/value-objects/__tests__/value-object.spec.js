"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_object_1 = require("../value-object");
class StubValueObject extends value_object_1.default {
}
describe('ValueObject Unit Tests', () => {
    it('should set value', () => {
        let vo = new StubValueObject('string value');
        expect(vo.value).toBe('string value');
        vo = new StubValueObject({ prop1: 'value1' });
        expect(vo.value).toStrictEqual({ prop1: 'value1' });
    });
    it('should convert to a string', () => {
        const date = new Date();
        const arrange = [
            { received: null, expected: "null" },
            { received: undefined, expected: "undefined" },
            { received: '', expected: "" },
            { received: 'fake test', expected: "fake test" },
            { received: 0, expected: "0" },
            { received: 1, expected: "1" },
            { received: 5, expected: "5" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
            { received: { prop1: 'value1' }, expected: JSON.stringify({ prop1: 'value1' }) },
        ];
        arrange.forEach(value => {
            let vo = new StubValueObject(value.received);
            expect(vo + "").toBe(value.expected);
        });
    });
});
