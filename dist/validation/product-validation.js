"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
var ProductType;
(function (ProductType) {
    ProductType["FOOD"] = "FOOD";
    ProductType["BEVERAGES"] = "BEVERAGES";
    ProductType["SNACK"] = "SNACK";
    ProductType["DESSERTS"] = "DESSERTS";
    ProductType["OTHER"] = "OTHER";
})(ProductType || (ProductType = {}));
class ProductValidation {
}
exports.ProductValidation = ProductValidation;
ProductValidation.CREATE = zod_1.z.object({
    id_dataset: zod_1.z.number().positive(),
    image: zod_1.z.string().min(1).max(100),
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1).max(255),
    price: zod_1.z.number().positive(),
    click: zod_1.z.number().positive().optional(),
    qty: zod_1.z.number().positive().optional(),
    status: zod_1.z.boolean().optional(),
    type: zod_1.z.nativeEnum(ProductType)
});
ProductValidation.GET = zod_1.z.object({
    id_dataset: zod_1.z.number().positive(),
    id: zod_1.z.number().positive()
});
ProductValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    id_dataset: zod_1.z.number().positive(),
    image: zod_1.z.string().min(1).max(100).optional(),
    title: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().min(1).max(255).optional(),
    price: zod_1.z.number().positive().optional(),
    click: zod_1.z.number().positive().optional(),
    qty: zod_1.z.number().positive().optional(),
    status: zod_1.z.boolean().optional(),
    type: zod_1.z.nativeEnum(ProductType).optional()
});
ProductValidation.SEARCH = zod_1.z.object({
    id_dataset: zod_1.z.number().positive(), // Keeps this mandatory and positive
    image: zod_1.z.string().min(1).max(100).optional(),
    title: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().min(1).max(255).optional(),
    price_max: zod_1.z.number().min(0).optional(), // Allows 0 and undefined
    price_min: zod_1.z.number().min(0).optional(),
    click_max: zod_1.z.number().min(0).optional(),
    click_min: zod_1.z.number().min(0).optional(),
    qty_max: zod_1.z.number().min(0).optional(),
    qty_min: zod_1.z.number().min(0).optional(),
    status: zod_1.z.boolean().optional(),
    type: zod_1.z.nativeEnum(ProductType).optional(),
    page: zod_1.z.number().min(1).max(100).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
ProductValidation.DELETE = zod_1.z.object({
    id_dataset: zod_1.z.number().positive(),
    id: zod_1.z.number().positive()
});
