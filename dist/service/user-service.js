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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerReq = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            const checkUser = yield database_1.prismaClient.user.count({
                where: {
                    email: registerReq.email
                }
            });
            if (checkUser != 0) {
                throw new response_error_1.ResponseError(400, "User Already Exist!");
            }
            registerReq.password = yield bcrypt_1.default.hash(registerReq.password, 10);
            const user = yield database_1.prismaClient.user.create({
                data: registerReq
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginReq = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            const user = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: loginReq.email
                }
            });
            if (!user) {
                throw new response_error_1.ResponseError(401, "Email or password is invalid");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(loginReq.password, user.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, "Email or password is invalid");
            }
            const updatedUser = yield database_1.prismaClient.user.update({
                where: {
                    email: loginReq.email
                },
                data: {
                    token: (0, uuid_1.v4)()
                }
            });
            const response = (0, user_model_1.toUserResponse)(updatedUser);
            response.token = updatedUser.token;
            return response;
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            if (updateRequest.username) {
                user.username = updateRequest.username;
            }
            if (updateRequest.whatsapp_number) {
                user.whatsapp_number = updateRequest.whatsapp_number;
            }
            if (updateRequest.address) {
                user.address = updateRequest.address;
            }
            if (updateRequest.password) {
                user.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            const result = yield database_1.prismaClient.user.update({
                where: {
                    email: user.email
                },
                data: user
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
                where: {
                    email: user.email
                },
                data: {
                    token: null
                }
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
}
exports.UserService = UserService;
