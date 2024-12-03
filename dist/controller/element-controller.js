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
exports.ElementController = void 0;
const element_service_1 = require("../service/element-service");
class ElementController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id_page = Number(req.params.id_page);
                const response = yield element_service_1.ElementService.create(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Create Element Success",
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
                request.id_page = Number(req.params.id_page);
                request.id = Number(req.params.id_element);
                const response = yield element_service_1.ElementService.get(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Get Element Success",
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
                request.id_screen = Number(req.params.id_screen);
                request.id_page = Number(req.params.id_page);
                request.id = Number(req.params.id_element);
                const response = yield element_service_1.ElementService.update(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Update Element Success",
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
                request.id_screen = Number(req.params.id_screen);
                request.id_page = Number(req.params.id_page);
                request.id = Number(req.params.id_element);
                const response = yield element_service_1.ElementService.remove(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Remove Element Success",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    id_page: Number(req.params.id_page),
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10
                };
                const response = yield element_service_1.ElementService.list(req.user, request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ElementController = ElementController;
