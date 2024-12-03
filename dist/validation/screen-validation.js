"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenValidation = void 0;
const zod_1 = require("zod");
class ScreenValidation {
}
exports.ScreenValidation = ScreenValidation;
ScreenValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    endpoint: zod_1.z.string().min(1).max(100)
});
ScreenValidation.UPDATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    id: zod_1.z.number().positive(),
    endpoint: zod_1.z.string().min(1).max(100).optional()
});
ScreenValidation.SEARCH = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    page: zod_1.z.number().min(1).max(100).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
