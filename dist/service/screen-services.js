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
exports.ScreenService = void 0;
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const screen_model_1 = require("../model/screen-model");
const screen_validation_1 = require("../validation/screen-validation");
class ScreenService {
    static checkScreenExist(id, id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const screen = yield database_1.prismaClient.screen.findUnique({
                where: {
                    id: id,
                    id_user: id_user
                }
            });
            if (!screen) {
                throw new response_error_1.ResponseError(404, "Screen not found!");
            }
            return screen;
        });
    }
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(screen_validation_1.ScreenValidation.CREATE, request);
            const record = Object.assign(Object.assign({}, createRequest), { id_user: user.email });
            const screen = yield database_1.prismaClient.screen.create({
                data: record
            });
            return (0, screen_model_1.toScreenResponse)(screen);
        });
    }
    static get(user, id_screen) {
        return __awaiter(this, void 0, void 0, function* () {
            const screen = yield this.checkScreenExist(id_screen, user.email);
            return (0, screen_model_1.toScreenResponse)(screen);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(screen_validation_1.ScreenValidation.UPDATE, request);
            yield this.checkScreenExist(updateRequest.id, user.email);
            console.log(updateRequest);
            const screen = yield database_1.prismaClient.screen.update({
                where: {
                    id: updateRequest.id,
                    id_user: user.email
                },
                data: updateRequest
            });
            return (0, screen_model_1.toScreenResponse)(screen);
        });
    }
    static remove(user, id_screen) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkScreenExist(id_screen, user.email);
            const screen = yield database_1.prismaClient.screen.delete({
                where: {
                    id: id_screen,
                    id_user: user.email
                }
            });
            return (0, screen_model_1.toScreenResponse)(screen);
        });
    }
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const datasetSearch = validation_1.Validation.validate(screen_validation_1.ScreenValidation.SEARCH, request);
            const skip = (datasetSearch.page - 1) * datasetSearch.size;
            const filters = [];
            if (datasetSearch.name) {
                filters.push({
                    name: {
                        contains: datasetSearch.name
                    }
                });
            }
            const screens = yield database_1.prismaClient.screen.findMany({
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
                message: "Success search screen",
                data: screens.map(data => (0, screen_model_1.toScreenResponse)(data)),
                paging: {
                    current_page: datasetSearch.page,
                    total_page: Math.ceil(total / datasetSearch.size),
                    size: datasetSearch.size
                }
            };
        });
    }
}
exports.ScreenService = ScreenService;
