"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetOnElementValidation = void 0;
const zod_1 = require("zod");
class DatasetOnElementValidation {
}
exports.DatasetOnElementValidation = DatasetOnElementValidation;
DatasetOnElementValidation.ASSIGN = zod_1.z.object({
    id_dataset: zod_1.z.number().positive(),
    id_element: zod_1.z.number().positive()
});
DatasetOnElementValidation.GET = zod_1.z.object({
    id_dataset: zod_1.z.number().positive(),
    id_element: zod_1.z.number().positive()
});
DatasetOnElementValidation.DELETE = zod_1.z.object({
    id_dataset: zod_1.z.number().positive(),
    id_element: zod_1.z.number().positive()
});
