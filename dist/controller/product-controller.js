"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../service/product-service");
class ProductController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id_dataset = Number(req.params.id_dataset);
                const response = yield product_service_1.ProductService.create(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Create Dataset Success",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id_dataset = Number(req.params.id_dataset);
                request.id = Number(req.params.id_product);
                const response = yield product_service_1.ProductService.get(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Get Product Success",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(req.params.id_product);
                request.id_dataset = Number(req.params.id_dataset);
                console.log(request);
                const response = yield product_service_1.ProductService.update(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Update Product Success",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    id_dataset: Number(req.params.id_dataset),
                    title: req.query.title,
                    description: req.query.description,
                    price_max: req.query.price_max ? Number(req.query.price_max) : 0,
                    price_min: req.query.price_min ? Number(req.query.price_min) : 0,
                    click_max: req.query.click_max ? Number(req.query.click_max) : 0,
                    click_min: req.query.click_min ? Number(req.query.click_min) : 0,
                    qty_max: req.query.qty_max ? Number(req.query.qty_max) : 0,
                    qty_min: req.query.qty_min ? Number(req.query.qty_min) : 0,
                    status: req.query.status ? Boolean(req.query.status) : true,
                    type: req.query.type,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10
                };
                const response = yield product_service_1.ProductService.search(req.user, request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(req.params.id_product);
                request.id_dataset = Number(req.params.id_dataset);
                const response = yield product_service_1.ProductService.remove(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Remove Product Success",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ProductController = ProductController;
