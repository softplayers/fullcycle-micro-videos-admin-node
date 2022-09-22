"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_contracts_1 = require("../repository-contracts");
describe('Search Unit Tests', () => {
    describe('SearhParams Unit Tests', () => {
        test('page prop', () => {
            const params = new repository_contracts_1.SearchParams();
            expect(params.page).toBe(1);
            const arrange = [
                { page: null, expected: 1 },
                { page: undefined, expected: 1 },
                { page: '', expected: 1 },
                { page: 'fake', expected: 1 },
                { page: 0, expected: 1 },
                { page: -1, expected: 1 },
                { page: true, expected: 1 },
                { page: false, expected: 1 },
                { page: {}, expected: 1 },
                { page: 1, expected: 1 },
                { page: 2, expected: 2 },
                { page: 5.5, expected: 5 },
            ];
            arrange.forEach(i => {
                expect(new repository_contracts_1.SearchParams({ page: i.page }).page).toBe(i.expected);
            });
        });
        test('per_page prop', () => {
            const params = new repository_contracts_1.SearchParams();
            expect(params.per_page).toBe(15);
            const arrange = [
                { per_page: null, expected: 15 },
                { per_page: undefined, expected: 15 },
                { per_page: '', expected: 15 },
                { per_page: 'fake', expected: 15 },
                { per_page: 0, expected: 15 },
                { per_page: -1, expected: 15 },
                { per_page: true, expected: 15 },
                { per_page: false, expected: 15 },
                { per_page: {}, expected: 15 },
                { per_page: 1, expected: 1 },
                { per_page: 2, expected: 2 },
                { per_page: 5.5, expected: 5 },
                { per_page: 10, expected: 10 },
            ];
            arrange.forEach(i => {
                expect(new repository_contracts_1.SearchParams({ per_page: i.per_page }).per_page).toBe(i.expected);
            });
        });
        test('sort prop', () => {
            const params = new repository_contracts_1.SearchParams();
            expect(params.sort).toBeNull();
            const arrange = [
                { sort: null, expected: null },
                { sort: undefined, expected: null },
                { sort: '', expected: null },
                { sort: 0, expected: null },
                { sort: -1, expected: '-1' },
                { sort: true, expected: 'true' },
                { sort: false, expected: null },
                { sort: {}, expected: '[object Object]' },
                { sort: 'field', expected: 'field' },
            ];
            arrange.forEach(i => {
                expect(new repository_contracts_1.SearchParams({ sort: i.sort }).sort).toBe(i.expected);
            });
        });
        test('sort_dir prop', () => {
            let params = new repository_contracts_1.SearchParams({ sort_dir: 'asc' });
            expect(params.sort_dir).toBeNull();
            params = new repository_contracts_1.SearchParams({ sort: null, sort_dir: 'asc' });
            expect(params.sort_dir).toBeNull();
            params = new repository_contracts_1.SearchParams({ sort: undefined, sort_dir: 'asc' });
            expect(params.sort_dir).toBeNull();
            params = new repository_contracts_1.SearchParams({ sort: '', sort_dir: 'asc' });
            expect(params.sort_dir).toBeNull();
            const arrange = [
                { sort_dir: null, expected: 'asc' },
                { sort_dir: undefined, expected: 'asc' },
                { sort_dir: '', expected: 'asc' },
                { sort_dir: 0, expected: 'asc' },
                { sort_dir: 'fake', expected: 'asc' },
                { sort_dir: 'asc', expected: 'asc' },
                { sort_dir: 'ASC', expected: 'asc' },
                { sort_dir: 'desc', expected: 'desc' },
                { sort_dir: 'DESC', expected: 'desc' },
            ];
            arrange.forEach(i => {
                expect(new repository_contracts_1.SearchParams({ sort: 'field', sort_dir: i.sort_dir }).sort_dir).toBe(i.expected);
            });
        });
        test('filter prop', () => {
            const params = new repository_contracts_1.SearchParams();
            expect(params.filter).toBeNull();
            const arrange = [
                { filter: null, expected: null },
                { filter: undefined, expected: null },
                { filter: '', expected: null },
                { filter: 0, expected: null },
                { filter: -1, expected: '-1' },
                { filter: true, expected: 'true' },
                { filter: false, expected: null },
                { filter: {}, expected: '[object Object]' },
                { filter: 'field', expected: 'field' },
            ];
            arrange.forEach(i => {
                expect(new repository_contracts_1.SearchParams({ filter: i.filter }).filter).toBe(i.expected);
            });
        });
    });
    describe('SearhResult Unit Tests', () => {
        test('contructor props', () => {
            let result = new repository_contracts_1.SearchResult({
                items: ["entity1", "entity2"],
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: null
            });
            expect(result.toJSON()).toStrictEqual({
                items: ["entity1", "entity2"],
                total: 4,
                current_page: 1,
                per_page: 2,
                last_page: 2,
                sort: null,
                sort_dir: null,
                filter: null
            });
            result = new repository_contracts_1.SearchResult({
                items: ["entity1", "entity2"],
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: "name",
                sort_dir: "asc",
                filter: "test"
            });
            expect(result.toJSON()).toStrictEqual({
                items: ["entity1", "entity2"],
                total: 4,
                current_page: 1,
                per_page: 2,
                last_page: 2,
                sort: "name",
                sort_dir: "asc",
                filter: "test"
            });
        });
        test('should set last_page=1 when per_page field is greater than total field', () => {
            let result = new repository_contracts_1.SearchResult({
                items: [],
                total: 4,
                current_page: 1,
                per_page: 15,
                sort: null,
                sort_dir: null,
                filter: null
            });
            expect(result.last_page).toBe(1);
        });
        test('last_page prop when total is not a multiple of per_page', () => {
            let result = new repository_contracts_1.SearchResult({
                items: [],
                total: 101,
                current_page: 1,
                per_page: 20,
                sort: null,
                sort_dir: null,
                filter: null
            });
            expect(result.last_page).toBe(6);
        });
    });
});
