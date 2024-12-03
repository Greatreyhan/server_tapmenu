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
exports.ElementService = void 0;
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const element_model_1 = require("../model/element-model");
const element_validation_1 = require("../validation/element-validation");
const page_services_1 = require("./page-services");
const response_error_1 = require("../error/response-error");
const screen_services_1 = require("./screen-services");
class ElementService {
    static checkElementExist(id, id_page) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield database_1.prismaClient.element.findUnique({
                where: {
                    id: id,
                    id_page: id_page
                }
            });
            if (!element) {
                throw new response_error_1.ResponseError(404, "Element not found!");
            }
            return element;
        });
    }
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const createRequest = validation_1.Validation.validate(element_validation_1.ElementValidation.CREATE, request);
            yield page_services_1.PageService.checkPageExist(request.id_page, request.id_screen);
            const element = yield database_1.prismaClient.element.create({
                data: {
                    id_page: createRequest.id_page,
                    name: createRequest.name,
                    type: createRequest.type,
                    content: (_a = createRequest.content) !== null && _a !== void 0 ? _a : "", // Handle nullability for JSON fields
                    properties: (_b = createRequest.properties) !== null && _b !== void 0 ? _b : "",
                    style: (_c = createRequest.style) !== null && _c !== void 0 ? _c : "",
                }
            });
            return (0, element_model_1.toElementResponse)(element);
        });
    }
    static get(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequest = validation_1.Validation.validate(element_validation_1.ElementValidation.GET, request);
            yield screen_services_1.ScreenService.checkScreenExist(request.id_screen, user.email);
            yield page_services_1.PageService.checkPageExist(request.id_page, request.id_screen);
            const element = yield this.checkElementExist(getRequest.id, getRequest.id_page);
            return (0, element_model_1.toElementResponse)(element);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const updateRequest = validation_1.Validation.validate(element_validation_1.ElementValidation.UPDATE, request);
            yield screen_services_1.ScreenService.checkScreenExist(request.id_screen, user.email);
            yield page_services_1.PageService.checkPageExist(request.id_page, request.id_screen);
            yield this.checkElementExist(updateRequest.id, updateRequest.id_page);
            const element = yield database_1.prismaClient.element.update({
                where: {
                    id: updateRequest.id,
                    id_page: updateRequest.id_page
                },
                data: {
                    id_page: updateRequest.id_page,
                    name: updateRequest.name,
                    type: updateRequest.type,
                    content: (_a = updateRequest.content) !== null && _a !== void 0 ? _a : "", // Handle nullability for JSON fields
                    properties: (_b = updateRequest.properties) !== null && _b !== void 0 ? _b : "",
                    style: (_c = updateRequest.style) !== null && _c !== void 0 ? _c : "",
                }
            });
            return (0, element_model_1.toElementResponse)(element);
        });
    }
    static remove(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteRequest = validation_1.Validation.validate(element_validation_1.ElementValidation.DELETE, request);
            yield screen_services_1.ScreenService.checkScreenExist(request.id_screen, user.email);
            yield page_services_1.PageService.checkPageExist(request.id_page, request.id_screen);
            yield this.checkElementExist(deleteRequest.id, deleteRequest.id_page);
            const element = yield database_1.prismaClient.element.delete({
                where: {
                    id: deleteRequest.id,
                    id_page: deleteRequest.id_page
                }
            });
            return (0, element_model_1.toElementResponse)(element);
        });
    }
    static list(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const datasetSearch = validation_1.Validation.validate(element_validation_1.ElementValidation.SEARCH, request);
            let skip = (datasetSearch.page - 1) * datasetSearch.size;
            const products = yield database_1.prismaClient.element.findMany({
                where: {
                    id_page: request.id_page,
                },
                take: (_a = datasetSearch.size) !== null && _a !== void 0 ? _a : 10,
                skip: (isNaN(skip)) ? 0 : skip,
            });
            const total = yield database_1.prismaClient.element.count({
                where: {
                    id_page: request.id_page,
                }
            });
            return {
                status: 'OK',
                message: 'Success get list elements',
                data: products.map((el) => (0, element_model_1.toElementResponse)(el)),
                paging: {
                    current_page: datasetSearch.page,
                    total_page: Math.ceil(total / datasetSearch.size),
                    size: datasetSearch.size,
                },
            };
        });
    }
}
exports.ElementService = ElementService;
