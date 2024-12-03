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
exports.PageService = void 0;
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const page_mode_1 = require("../model/page-mode");
const page_validation_1 = require("../validation/page-validation");
const screen_services_1 = require("./screen-services");
class PageService {
    static checkPageExist(id, id_screen) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield database_1.prismaClient.page.findUnique({
                where: {
                    id: id,
                    id_screen: id_screen
                }
            });
            if (!page) {
                throw new response_error_1.ResponseError(404, "Page not found!");
            }
            return page;
        });
    }
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(page_validation_1.PageValidation.CREATE, request);
            yield screen_services_1.ScreenService.checkScreenExist(request.id_screen, user.email);
            const page = yield database_1.prismaClient.page.create({
                data: createRequest
            });
            return (0, page_mode_1.toPageResponse)(page);
        });
    }
    static get(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequest = validation_1.Validation.validate(page_validation_1.PageValidation.GET, request);
            yield screen_services_1.ScreenService.checkScreenExist(request.id_screen, user.email);
            const page = yield this.checkPageExist(getRequest.id, getRequest.id_screen);
            return (0, page_mode_1.toPageResponse)(page);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(page_validation_1.PageValidation.UPDATE, request);
            yield screen_services_1.ScreenService.checkScreenExist(request.id_screen, user.email);
            yield this.checkPageExist(updateRequest.id, updateRequest.id_screen);
            const page = yield database_1.prismaClient.page.update({
                where: {
                    id: updateRequest.id,
                    id_screen: updateRequest.id_screen
                },
                data: updateRequest
            });
            return (0, page_mode_1.toPageResponse)(page);
        });
    }
    static remove(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteRequest = validation_1.Validation.validate(page_validation_1.PageValidation.DELETE, request);
            yield screen_services_1.ScreenService.checkScreenExist(request.id_screen, user.email);
            yield this.checkPageExist(deleteRequest.id, deleteRequest.id_screen);
            const page = yield database_1.prismaClient.page.delete({
                where: {
                    id: deleteRequest.id,
                    id_screen: deleteRequest.id_screen
                }
            });
            return (0, page_mode_1.toPageResponse)(page);
        });
    }
}
exports.PageService = PageService;
