"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidUUidError extends Error {
    constructor(message) {
        super(message || 'ID must be a valid UUID');
        this.name = 'InvalidUUidError';
    }
}
exports.default = InvalidUUidError;
