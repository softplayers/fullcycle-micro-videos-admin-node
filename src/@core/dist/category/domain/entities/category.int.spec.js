"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("./category");
describe("Category Integration Tests", () => {
    describe("Create", () => {
        it("should be invalid when create", () => {
            expect(() => new category_1.Category({ name: null })).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });
            expect(() => new category_1.Category({ name: '' })).containsErrorMessages({
                name: [
                    "name should not be empty"
                ],
            });
            expect(() => new category_1.Category({ name: 't'.repeat(256) })).containsErrorMessages({
                name: [
                    "name must be shorter than or equal to 255 characters"
                ],
            });
            expect(() => new category_1.Category({ name: 22 })).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });
        });
        it("should be invalid when create category with invalid description", () => {
            expect(() => new category_1.Category({ name: "teste", description: 5 })).containsErrorMessages({
                description: [
                    "description must be a string"
                ],
            });
        });
        it("should be invalid when create category with invalid is_active property", () => {
            expect(() => new category_1.Category({ name: "teste", is_active: "false" })).containsErrorMessages({
                is_active: [
                    "is_active must be a boolean value"
                ],
            });
        });
        it("should create when properties are valid", () => {
            expect.assertions(0);
            new category_1.Category({ name: "teste" });
            new category_1.Category({ name: "teste", description: "description" });
            new category_1.Category({ name: "teste", description: null });
            new category_1.Category({ name: "teste", description: null, is_active: false });
            new category_1.Category({ name: "teste", description: null, is_active: true });
        });
    });
    describe("Update", () => {
        it("should be invalid when create category with invalid name property", () => {
            const category = new category_1.Category({ name: "Name" });
            expect(() => category.update(null, "description")).containsErrorMessages({
                name: [
                    "name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"
                ],
            });
            expect(() => category.update("", "description")).containsErrorMessages({
                name: [
                    "name should not be empty"
                ],
            });
            expect(() => category.update('t'.repeat(256), "description")).containsErrorMessages({
                name: [
                    "name must be shorter than or equal to 255 characters"
                ],
            });
            expect(() => category.update(22, "description")).containsErrorMessages({
                name: [
                    "name must be a string", "name must be shorter than or equal to 255 characters"
                ],
            });
        });
        it("should be invalid when create category with invalid description property", () => {
            const category = new category_1.Category({ name: "Name" });
            expect(() => category.update("Name", 5)).containsErrorMessages({
                description: [
                    "description must be a string",
                ],
            });
        });
        it("should update category when properties are valid", () => {
            expect.assertions(0);
            const category = new category_1.Category({ name: "teste" });
            category.update("teste", "description");
            category.update("teste", null);
            category.update("teste", undefined);
        });
    });
});
