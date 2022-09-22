"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteCategoryUseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const entity = await this.categoryRepo.delete(input.id);
        return;
    }
}
exports.default = DeleteCategoryUseCase;
