"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementValidation = void 0;
const zod_1 = require("zod");
class ElementValidation {
}
exports.ElementValidation = ElementValidation;
ElementValidation.CREATE = zod_1.z.object({
    id_page: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100),
    type: zod_1.z.string().min(1).max(100),
    content: zod_1.z.record(zod_1.z.unknown()).optional(),
    properties: zod_1.z.record(zod_1.z.unknown()).optional(),
    style: zod_1.z.record(zod_1.z.unknown()).optional(),
});
ElementValidation.GET = zod_1.z.object({
    id: zod_1.z.number().positive(),
    id_page: zod_1.z.number().positive()
});
ElementValidation.SEARCH = zod_1.z.object({
    id_page: zod_1.z.number().positive()
});
ElementValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    id_page: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100).optional(),
    type: zod_1.z.string().min(1).max(100).optional(),
    content: zod_1.z.record(zod_1.z.unknown()).optional(),
    properties: zod_1.z.record(zod_1.z.unknown()).optional(),
    style: zod_1.z.record(zod_1.z.unknown()).optional(),
});
ElementValidation.DELETE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    id_page: zod_1.z.number().positive()
});
