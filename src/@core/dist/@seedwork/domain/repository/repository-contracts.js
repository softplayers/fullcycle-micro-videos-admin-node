"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = exports.SearchParams = void 0;
class SearchParams {
    constructor(props = {}) {
        this._per_page = 15;
        this.page = props.page;
        this.per_page = props.per_page;
        this.sort = props.sort;
        this.sort_dir = props.sort_dir;
        this.filter = props.filter;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        let _page = +value;
        if (Number.isNaN(_page) || _page < 1) {
            _page = 1;
        }
        this._page = parseInt(_page);
    }
    get per_page() {
        return this._per_page;
    }
    set per_page(value) {
        let _per_page = +value;
        if (value === true || Number.isNaN(_per_page) || _per_page < 1) {
            _per_page = 15;
        }
        this._per_page = parseInt(_per_page);
    }
    get sort() {
        return this._sort;
    }
    set sort(value) {
        this._sort = !value ? null : `${value}`;
    }
    get sort_dir() {
        return this._sort_dir;
    }
    set sort_dir(value) {
        if (!this._sort) {
            this._sort_dir = null;
            return;
        }
        const dir = `${value}`.toLocaleLowerCase();
        this._sort_dir = dir !== "asc" && dir !== "desc" ? "asc" : dir;
    }
    get filter() {
        return this._filter;
    }
    set filter(value) {
        this._filter = !value ? null : `${value}`;
    }
}
exports.SearchParams = SearchParams;
class SearchResult {
    constructor(props) {
        this.items = props.items;
        this.total = props.total;
        this.current_page = props.current_page;
        this.per_page = props.per_page;
        this.last_page = Math.ceil(this.total / this.per_page);
        this.sort = props.sort;
        this.sort_dir = props.sort_dir;
        this.filter = props.filter;
    }
    toJSON() {
        return {
            items: this.items,
            total: this.total,
            current_page: this.current_page,
            per_page: this.per_page,
            last_page: this.last_page,
            sort: this.sort,
            sort_dir: this.sort_dir,
            filter: this.filter,
        };
    }
}
exports.SearchResult = SearchResult;
;
