"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const invalid_uuid_error_1 = require("../../errors/invalid-uuid.error");
const unique_entity_id_vo_1 = require("../unique-entity-id.vo");
describe("UniqueEntityId Unit tests", () => {
    const validateSpy = jest.spyOn(unique_entity_id_vo_1.default.prototype, "validate");
    it("should throw error when uuid is invalid", () => {
        expect(() => new unique_entity_id_vo_1.default("fake id")).toThrow(new invalid_uuid_error_1.default());
        expect(validateSpy).toHaveBeenCalled();
    });
    it("should accept a uuid passed in constructor", () => {
        const uuid = "011a2da2-70e3-4a0a-b6fc-42e9ad976963";
        const vo = new unique_entity_id_vo_1.default(uuid);
        expect(vo.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });
    it("should no args constructor generate a valid uuid", () => {
        const vo = new unique_entity_id_vo_1.default();
        expect((0, uuid_1.validate)(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});
