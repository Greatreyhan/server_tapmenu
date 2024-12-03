"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageValidation = void 0;
const zod_1 = require("zod");
class PageValidation {
}
exports.PageValidation = PageValidation;
PageValidation.CREATE = zod_1.z.object({
    id_screen: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100),
    endpoint: zod_1.z.string().min(1).max(100)
});
PageValidation.GET = zod_1.z.object({
    id: zod_1.z.number().positive(),
    id_screen: zod_1.z.number().positive()
});
PageValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    id_screen: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100),
    endpoint: zod_1.z.string().min(1).max(100)
});
PageValidation.DELETE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    id_screen: zod_1.z.number().positive()
});
