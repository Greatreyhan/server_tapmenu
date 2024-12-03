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
exports.PageController = void 0;
const page_services_1 = require("../service/page-services");
class PageController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id_screen = Number(req.params.id_screen);
                const response = yield page_services_1.PageService.create(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Create Page Success",
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
                request.id_screen = Number(req.params.id_screen);
                request.id = Number(req.params.id_page);
                const response = yield page_services_1.PageService.get(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Get Page Success",
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
                request.id = Number(req.params.id_page);
                request.id_screen = Number(req.params.id_screen);
                console.log(request);
                const response = yield page_services_1.PageService.update(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Update Page Success",
                    data: response
                });
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
                request.id = Number(req.params.id_page);
                request.id_screen = Number(req.params.id_screen);
                const response = yield page_services_1.PageService.remove(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Remove Page Success",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.PageController = PageController;
