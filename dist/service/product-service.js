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
exports.ProductService = void 0;
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const product_model_1 = require("../model/product-model");
const product_validation_1 = require("../validation/product-validation");
const dataset_services_1 = require("./dataset-services");
const response_error_1 = require("../error/response-error");
class ProductService {
    static checkProductExist(id, id_dataset) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield database_1.prismaClient.product.findUnique({
                where: {
                    id: id,
                    id_dataset: id_dataset
                }
            });
            if (!product) {
                throw new response_error_1.ResponseError(404, "Dataset not found!");
            }
            return product;
        });
    }
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(product_validation_1.ProductValidation.CREATE, request);
            yield dataset_services_1.DatasetService.checkDatasetExist(request.id_dataset, user.email);
            const product = yield database_1.prismaClient.product.create({
                data: createRequest
            });
            return (0, product_model_1.toProductResponse)(product);
        });
    }
    static get(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequest = validation_1.Validation.validate(product_validation_1.ProductValidation.GET, request);
            yield dataset_services_1.DatasetService.checkDatasetExist(request.id_dataset, user.email);
            const product = yield this.checkProductExist(getRequest.id, getRequest.id_dataset);
            return (0, product_model_1.toProductResponse)(product);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(product_validation_1.ProductValidation.UPDATE, request);
            yield dataset_services_1.DatasetService.checkDatasetExist(request.id_dataset, user.email);
            yield this.checkProductExist(updateRequest.id, updateRequest.id_dataset);
            const product = yield database_1.prismaClient.product.update({
                where: {
                    id: updateRequest.id,
                    id_dataset: updateRequest.id_dataset
                },
                data: updateRequest
            });
            return (0, product_model_1.toProductResponse)(product);
        });
    }
    static remove(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteRequest = validation_1.Validation.validate(product_validation_1.ProductValidation.DELETE, request);
            yield dataset_services_1.DatasetService.checkDatasetExist(request.id_dataset, user.email);
            yield this.checkProductExist(deleteRequest.id, deleteRequest.id_dataset);
            const product = yield database_1.prismaClient.product.delete({
                where: {
                    id: deleteRequest.id,
                    id_dataset: deleteRequest.id_dataset
                }
            });
            return (0, product_model_1.toProductResponse)(product);
        });
    }
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const datasetSearch = validation_1.Validation.validate(product_validation_1.ProductValidation.SEARCH, request);
            let skip = (datasetSearch.page - 1) * datasetSearch.size;
            const filters = [];
            if (datasetSearch.title) {
                filters.push({
                    title: {
                        contains: datasetSearch.title,
                    },
                });
            }
            if (datasetSearch.description) {
                filters.push({
                    description: {
                        contains: datasetSearch.description,
                    },
                });
            }
            if (datasetSearch.price_max && datasetSearch.price_min) {
                filters.push({
                    price: {
                        gte: datasetSearch.price_min,
                        lte: datasetSearch.price_max,
                    },
                });
            }
            if (datasetSearch.click_max && datasetSearch.click_min) {
                filters.push({
                    click: {
                        gte: datasetSearch.click_min,
                        lte: datasetSearch.click_max,
                    },
                });
            }
            if (datasetSearch.qty_max && datasetSearch.qty_min) {
                filters.push({
                    qty: {
                        gte: datasetSearch.qty_min,
                        lte: datasetSearch.qty_max,
                    },
                });
            }
            if (datasetSearch.status) {
                filters.push({
                    status: {
                        equals: datasetSearch.status,
                    },
                });
            }
            if (datasetSearch.type) {
                filters.push({
                    type: {
                        equals: datasetSearch.type,
                    },
                });
            }
            const products = yield database_1.prismaClient.product.findMany({
                where: {
                    id_dataset: request.id_dataset,
                    AND: filters,
                },
                take: (_a = datasetSearch.size) !== null && _a !== void 0 ? _a : 10,
                skip: (isNaN(skip)) ? 0 : skip,
            });
            const total = yield database_1.prismaClient.product.count({
                where: {
                    id_dataset: request.id_dataset,
                    AND: filters,
                },
            });
            return {
                status: 'OK',
                message: 'Success search data',
                data: products.map((product) => (0, product_model_1.toProductResponse)(product)),
                paging: {
                    current_page: datasetSearch.page,
                    total_page: Math.ceil(total / datasetSearch.size),
                    size: datasetSearch.size,
                },
            };
        });
    }
}
exports.ProductService = ProductService;
