"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_validator_1 = require("./category.validator");
describe("CategoryValidator Tests", () => {
    let validator;
    beforeEach(() => {
        validator = category_validator_1.default.create();
    });
    test("Invalidation cases for name field", () => {
        expect({ validator, data: null }).containsErrorMessages({
            name: [
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
        });
        expect({ validator, data: { name: null } }).containsErrorMessages({
            name: [
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
        });
        expect({ validator, data: { name: "" } }).containsErrorMessages({
            name: ["name should not be empty"],
        });
        expect({ validator, data: { name: 5 } }).containsErrorMessages({
            name: [
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
        });
        expect({
            validator,
            data: { name: "t".repeat(256) },
        }).containsErrorMessages({
            name: ["name must be shorter than or equal to 255 characters"],
        });
    });
    test("Invalidation cases for description field", () => {
        expect({ validator, data: { description: 5 } }).containsErrorMessages({
            description: ["description must be a string"],
        });
    });
    test("Invalidation cases for is_active field", () => {
        expect({ validator, data: { is_active: 5 } }).containsErrorMessages({
            is_active: ["is_active must be a boolean value"],
        });
        expect({ validator, data: { is_active: 0 } }).containsErrorMessages({
            is_active: ["is_active must be a boolean value"],
        });
        expect({ validator, data: { is_active: 1 } }).containsErrorMessages({
            is_active: ["is_active must be a boolean value"],
        });
    });
    test("Valid cases for fields", () => {
        const arrange = [
            { name: "name" },
            { name: "name", description: undefined },
            { name: "name", description: null },
            { name: "name", is_active: true },
            { name: "name", is_active: false },
        ];
        arrange.forEach((item) => {
            const isValid = validator.validate(item);
            expect(isValid).toBeTruthy();
            expect(validator.validatedData).toStrictEqual(new category_validator_1.CategoryRules(item));
        });
    });
});
