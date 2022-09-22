"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../category/domain/entities/category");
const categoty_output_1 = require("../dto/categoty.output");
class CreateCategoryUseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = new category_1.Category(input);
        await this.categoryRepo.insert(entity);
        return categoty_output_1.CategoryOutputMapper.toOutput(entity);
    }
}
exports.default = CreateCategoryUseCase;
