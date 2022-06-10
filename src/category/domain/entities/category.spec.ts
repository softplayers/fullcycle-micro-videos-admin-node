import {Category} from './category';

describe("Category Tests", () => {
    test("Contructor of category", () => {
        const category = new Category("movie");
        expect(category.name).toBe('movie')
    });
});