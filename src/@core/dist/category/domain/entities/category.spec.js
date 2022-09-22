"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("./category");
const unique_entity_id_vo_1 = require("#seedwork/domain/value-objects/unique-entity-id.vo");
describe("Category Tests", () => {
    beforeEach(() => {
        category_1.Category.validate = jest.fn();
    });
    test("Contructor of category", () => {
        const now = new Date();
        const fullProps = {
            name: "movie",
            description: "description",
            is_active: true,
            created_at: now,
        };
        let category = new category_1.Category({ name: "Movie" });
        expect(category_1.Category.validate).toHaveBeenCalled();
        expect(category.props).toMatchObject({
            name: "Movie",
            description: null,
            is_active: true,
        });
        expect(category.props.created_at).toBeInstanceOf(Date);
        category = new category_1.Category({
            name: "Movie",
            description: "some description",
            is_active: false,
        });
        expect(category.props).toMatchObject({
            name: "Movie",
            description: "some description",
            is_active: false,
        });
        expect(category.props.created_at).toBeInstanceOf(Date);
        category = new category_1.Category({
            name: "Movie 2",
            description: "some description 2",
        });
        expect(category.props).toMatchObject({
            name: "Movie 2",
            description: "some description 2",
            is_active: true,
        });
        category = new category_1.Category({ name: "Movie 2", is_active: false });
        expect(category.props).toMatchObject({
            name: "Movie 2",
            description: null,
            is_active: false,
        });
        category = new category_1.Category(fullProps);
        expect(category.name).toBe("movie");
        expect(category.description).toBe("description");
        expect(category.is_active).toBeTruthy();
        expect(category.created_at).toBe(now);
        expect(category.props).toMatchObject(fullProps);
    });
    test('getter and setter of name field', () => {
        const category = new category_1.Category({ name: 'Movie' });
        expect(category.name).toBe('Movie');
        category['name'] = "other name";
        expect(category.name).toBe('other name');
    });
    test('getter and setter of description field', () => {
        let category = new category_1.Category({ name: 'Movie' });
        expect(category.description).toBeNull();
        category = new category_1.Category({ name: 'Movie', description: 'some description' });
        expect(category.description).toBe('some description');
        category = new category_1.Category({ name: 'Movie' });
        category['description'] = "some description";
        expect(category.description).toBe('some description');
        category = new category_1.Category({ name: 'Movie' });
        category['description'] = undefined;
        expect(category.description).toBeNull();
    });
    test('getter and setter of is_active field', () => {
        let category = new category_1.Category({ name: 'Movie' });
        expect(category.is_active).toBeTruthy();
        category = new category_1.Category({ name: 'Movie', is_active: false });
        expect(category.is_active).toBeFalsy();
        category = new category_1.Category({ name: 'Movie', is_active: true });
        expect(category.is_active).toBeTruthy();
    });
    test('getter of created_at field', () => {
        let category = new category_1.Category({ name: 'Movie' });
        expect(category.created_at).toBeInstanceOf(Date);
        const created_at = new Date();
        category = new category_1.Category({ name: 'Movie', created_at });
        expect(category.created_at).toBe(created_at);
    });
    test('id field', () => {
        let category = new category_1.Category({ name: 'Movie' });
        expect(category.uniqueEntityId).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(unique_entity_id_vo_1.default);
        category = new category_1.Category({ name: 'Movie' }, undefined);
        expect(category.uniqueEntityId).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(unique_entity_id_vo_1.default);
        category = new category_1.Category({ name: 'Movie' }, new unique_entity_id_vo_1.default());
        expect(category.uniqueEntityId).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(unique_entity_id_vo_1.default);
    });
    it("should update a category", () => {
        const category = new category_1.Category({ name: "Movie" });
        category.update("Documentary", "some description");
        expect(category_1.Category.validate).toHaveBeenCalledTimes(2);
        expect(category.name).toBe("Documentary");
        expect(category.description).toBe("some description");
    });
    it("should active a category", () => {
        const category = new category_1.Category({
            name: "Filmes",
            is_active: false,
        });
        category.activate();
        expect(category.is_active).toBeTruthy();
    });
    test("should disable a category", () => {
        const category = new category_1.Category({
            name: "Filmes",
            is_active: true,
        });
        category.deactivate();
        expect(category.is_active).toBeFalsy();
    });
});
