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
exports.ScreenController = void 0;
const screen_services_1 = require("../service/screen-services");
class ScreenController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield screen_services_1.ScreenService.create(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Create Screen Success",
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
                const id_screen = Number(req.params.id_screen);
                const response = yield screen_services_1.ScreenService.get(req.user, id_screen);
                res.status(200).json({
                    status: "OK",
                    message: "Get Screen Success",
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
                request.id = Number(req.params.id_screen);
                const response = yield screen_services_1.ScreenService.update(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Update Screen Success",
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
                const id_screen = Number(req.params.id_screen);
                const response = yield screen_services_1.ScreenService.remove(req.user, id_screen);
                res.status(200).json({
                    status: "OK",
                    message: "Remove Screen Success",
                    data: { response }
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ScreenController = ScreenController;
