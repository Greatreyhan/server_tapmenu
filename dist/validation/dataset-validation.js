"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetValidation = void 0;
const zod_1 = require("zod");
class DatasetValidation {
}
exports.DatasetValidation = DatasetValidation;
DatasetValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100)
});
DatasetValidation.UPDATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    id: zod_1.z.number().positive()
});
DatasetValidation.SEARCH = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    page: zod_1.z.number().min(1).max(100).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
