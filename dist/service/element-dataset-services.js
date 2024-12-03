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
exports.DatasetOnElementService = void 0;
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const element_dataset_model_1 = require("../model/element-dataset-model");
const element_dataset_validation_1 = require("../validation/element-dataset-validation");
const dataset_services_1 = require("./dataset-services");
const element_service_1 = require("./element-service");
class DatasetOnElementService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(element_dataset_validation_1.DatasetOnElementValidation.ASSIGN, request);
            yield dataset_services_1.DatasetService.checkDatasetExist(request.id_dataset, user.email);
            yield element_service_1.ElementService.checkElementExist(request.id_element, request.id_page);
            const assign = yield database_1.prismaClient.datasetsOnElements.create({
                data: {
                    id_dataset: createRequest.id_dataset,
                    id_element: createRequest.id_element
                }
            });
            return (0, element_dataset_model_1.toDatasetOnElementResponse)(assign);
        });
    }
    static checkDatasetOnElementExist(id_dataset, id_element) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.prismaClient.datasetsOnElements.findFirst({
                where: {
                    id_dataset: id_dataset,
                    id_element: id_element,
                },
            });
            if (!data) {
                throw new response_error_1.ResponseError(404, "Assignment not found!");
            }
            return data;
        });
    }
    static get(id_dataset, id_element) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.checkDatasetOnElementExist(id_dataset, id_element);
            return (0, element_dataset_model_1.toDatasetOnElementResponse)(data);
        });
    }
    static getDataset(id_element) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.prismaClient.datasetsOnElements.findFirst({
                where: {
                    id_element: id_element,
                },
            });
            console.log(data);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Assignment not found!");
            }
            return (0, element_dataset_model_1.toDatasetOnElementResponse)(data);
        });
    }
    static getElement(id_dataset) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.prismaClient.datasetsOnElements.findFirst({
                where: {
                    id_dataset: id_dataset,
                },
            });
            console.log(data);
            if (!data) {
                throw new response_error_1.ResponseError(404, "Assignment not found!");
            }
            return (0, element_dataset_model_1.toDatasetOnElementResponse)(data);
        });
    }
    static remove(id_dataset, id_element) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id_dataset, id_element);
            yield this.checkDatasetOnElementExist(id_dataset, id_element);
            const dataset = yield database_1.prismaClient.datasetsOnElements.delete({
                where: {
                    id_dataset_id_element: {
                        id_dataset: id_dataset,
                        id_element: id_element
                    }
                }
            });
            return (0, element_dataset_model_1.toDatasetOnElementResponse)(dataset);
        });
    }
}
exports.DatasetOnElementService = DatasetOnElementService;
