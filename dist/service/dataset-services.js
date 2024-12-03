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
exports.DatasetService = void 0;
const dataset_model_1 = require("../model/dataset-model");
const dataset_validation_1 = require("../validation/dataset-validation");
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
class DatasetService {
    static checkDatasetExist(id, id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataset = yield database_1.prismaClient.dataset.findUnique({
                where: {
                    id: id,
                    id_user: id_user
                }
            });
            if (!dataset) {
                throw new response_error_1.ResponseError(404, "Dataset not found!");
            }
            return dataset;
        });
    }
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(dataset_validation_1.DatasetValidation.CREATE, request);
            const record = Object.assign(Object.assign({}, createRequest), { id_user: user.email });
            const dataset = yield database_1.prismaClient.dataset.create({
                data: record
            });
            return (0, dataset_model_1.toDatasetResponse)(dataset);
        });
    }
    static get(user, id_dataset) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataset = yield this.checkDatasetExist(id_dataset, user.email);
            return (0, dataset_model_1.toDatasetResponse)(dataset);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(dataset_validation_1.DatasetValidation.UPDATE, request);
            yield this.checkDatasetExist(updateRequest.id, user.email);
            const dataset = yield database_1.prismaClient.dataset.update({
                where: {
                    id: updateRequest.id,
                    id_user: user.email
                },
                data: updateRequest
            });
            return (0, dataset_model_1.toDatasetResponse)(dataset);
        });
    }
    static remove(user, id_dataset) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkDatasetExist(id_dataset, user.email);
            const dataset = yield database_1.prismaClient.dataset.delete({
                where: {
                    id: id_dataset,
                    id_user: user.email
                }
            });
            return (0, dataset_model_1.toDatasetResponse)(dataset);
        });
    }
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const datasetSearch = validation_1.Validation.validate(dataset_validation_1.DatasetValidation.SEARCH, request);
            const skip = (datasetSearch.page - 1) * datasetSearch.size;
            const filters = [];
            if (datasetSearch.name) {
                filters.push({
                    name: {
                        contains: datasetSearch.name
                    }
                });
            }
            const datasets = yield database_1.prismaClient.dataset.findMany({
                where: {
                    id_user: user.email,
                    AND: filters
                },
                take: datasetSearch.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.dataset.count({
                where: {
                    id_user: user.email,
                    AND: filters
                },
                take: datasetSearch.size,
                skip: skip
            });
            return {
                status: 'OK',
                message: "Success search data",
                data: datasets.map(data => (0, dataset_model_1.toDatasetResponse)(data)),
                paging: {
                    current_page: datasetSearch.page,
                    total_page: Math.ceil(total / datasetSearch.size),
                    size: datasetSearch.size
                }
            };
        });
    }
}
exports.DatasetService = DatasetService;
