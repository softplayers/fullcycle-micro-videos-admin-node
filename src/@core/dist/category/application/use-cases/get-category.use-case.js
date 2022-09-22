"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoty_output_1 = require("../dto/categoty.output");
class GetCategoryUseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = await this.categoryRepo.findById(input.id);
        return categoty_output_1.CategoryOutputMapper.toOutput(entity);
    }
}
exports.default = GetCategoryUseCase;
