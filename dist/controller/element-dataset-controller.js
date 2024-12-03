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
exports.DatasetOnElementController = void 0;
const element_dataset_services_1 = require("../service/element-dataset-services");
class DatasetOnElementController {
    static assign(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield element_dataset_services_1.DatasetOnElementService.create(req.user, request);
                res.status(200).json({
                    status: "OK",
                    message: "Assign Dataset-Element Success",
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
                const id_element = Number(req.params.id_element);
                console.log(id_dataset, id_element);
                const response = yield element_dataset_services_1.DatasetOnElementService.get(id_dataset, id_element);
                res.status(200).json({
                    status: "OK",
                    message: "Get Dataset-Element Success",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getElement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_dataset = Number(req.params.id_dataset);
                const response = yield element_dataset_services_1.DatasetOnElementService.getElement(id_dataset);
                res.status(200).json({
                    status: "OK",
                    message: "Get Dataset-Element Success",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getDataset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id_element = Number(req.params.id_element);
                const response = yield element_dataset_services_1.DatasetOnElementService.getDataset(id_element);
                res.status(200).json({
                    status: "OK",
                    message: "Get Dataset-Element Success",
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
                const id_element = Number(req.params.id_element);
                const response = yield element_dataset_services_1.DatasetOnElementService.remove(id_dataset, id_element);
                res.status(200).json({
                    status: "OK",
                    message: "Remove Dataset-Element Success",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.DatasetOnElementController = DatasetOnElementController;
