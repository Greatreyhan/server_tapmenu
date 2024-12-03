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
exports.DatasetController = void 0;
const dataset_services_1 = require("../service/dataset-services");
class DatasetController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield dataset_services_1.DatasetService.create(req.user, request);
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
                const id_dataset = Number(req.params.id_dataset);
                const response = yield dataset_services_1.DatasetService.get(req.user, id_dataset);
                res.status(200).json({
                    status: "OK",
                    message: "Get Dataset Success",
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
                request.id = Number(req.params.id_dataset);
                const response = yield dataset_services_1.DatasetService.update(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Update Dataset Success",
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
                const id_dataset = Number(req.params.id_dataset);
                const response = yield dataset_services_1.DatasetService.remove(req.user, id_dataset);
                res.status(200).json({
                    status: "OK",
                    message: "Remove Dataset Success",
                    data: { response }
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
                    name: req.query.name,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10
                };
                const response = yield dataset_services_1.DatasetService.search(req.user, request);
                const data = response.data;
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.DatasetController = DatasetController;
