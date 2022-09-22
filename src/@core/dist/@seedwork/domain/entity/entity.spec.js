"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_vo_1 = require("../value-objects/unique-entity-id.vo");
const entity_1 = require("./entity");
const uuid_1 = require("uuid");
class StubEntity extends entity_1.default {
}
describe('Entity Unit Tests', () => {
    it('should set props and id', () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.uniqueEntityId).toBeInstanceOf(unique_entity_id_vo_1.default);
        expect(entity.id).not.toBeNull();
        expect((0, uuid_1.validate)(entity.id)).toBeTruthy();
    });
    it('should accept a valid uuid', () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const uniqueEntityId = new unique_entity_id_vo_1.default();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.uniqueEntityId).toBeInstanceOf(unique_entity_id_vo_1.default);
        expect(entity.id).toBe(uniqueEntityId.value);
    });
    it('should convert a entity to a JavaScript Object', () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const uniqueEntityId = new unique_entity_id_vo_1.default();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(Object.assign({ id: entity.id }, arrange));
    });
});
