"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoty_output_1 = require("../dto/categoty.output");
class UpdateCategoryUseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = await this.categoryRepo.findById(input.id);
        entity.update(input.name, input.description);
        if (input.is_active === true)
            entity.activate();
        if (input.is_active === false)
            entity.deactivate();
        await this.categoryRepo.update(entity);
        return categoty_output_1.CategoryOutputMapper.toOutput(entity);
    }
}
exports.default = UpdateCategoryUseCase;
