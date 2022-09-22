"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySearchableRepository = exports.InMemoryRepository = void 0;
const not_found_error_1 = require("../errors/not-found.error");
const repository_contracts_1 = require("./repository-contracts");
class InMemoryRepository {
    constructor() {
        this.items = [];
    }
    async insert(entity) {
        this.items.push(entity);
        return entity;
    }
    async findById(id) {
        const idStr = `${id}`;
        return this._get(idStr);
    }
    async findAll() {
        return this.items;
    }
    async update(entity) {
        await this._get(entity.id);
        const index = this.items.findIndex(item => item.id === entity.id);
        this.items[index] = entity;
        return entity;
    }
    async delete(id) {
        const idStr = `${id}`;
        await this._get(idStr);
        const index = this.items.findIndex(item => item.id === idStr);
        this.items.splice(index, 1);
    }
    async _get(id) {
        const idStr = `${id}`;
        const item = this.items.find(item => item.id == idStr);
        if (!item) {
            throw new not_found_error_1.default(`Entity not found with id '${id}'`);
        }
        return item;
    }
}
exports.InMemoryRepository = InMemoryRepository;
class InMemorySearchableRepository extends InMemoryRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = [];
    }
    async search(props) {
        const itemsFiltered = await this.applyFilter(this.items, props.filter);
        const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir);
        const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.per_page);
        return new repository_contracts_1.SearchResult({
            items: itemsPaginated,
            total: itemsFiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter,
        });
    }
    async applySort(items, sort, sort_dir) {
        if (!sort || !this.sortableFields.includes(sort)) {
            return [...items];
        }
        const sortedItems = [...items].sort((a, b) => {
            if (a.props[sort] < b.props[sort])
                return -1;
            if (a.props[sort] > b.props[sort])
                return 1;
            return 0;
        });
        if (sort_dir === 'desc') {
            sortedItems.reverse();
        }
        return sortedItems;
    }
    async applyPaginate(items, page, per_page) {
        const start = (page - 1) * per_page;
        let limit = start + per_page;
        return items.slice(start, limit);
    }
}
exports.InMemorySearchableRepository = InMemorySearchableRepository;
