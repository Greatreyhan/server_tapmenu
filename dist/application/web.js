"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const public_api_1 = require("../route/public-api");
const error_middleware_1 = require("../middleware/error-middleware");
const private_api_1 = require("../route/private-api");
exports.web = (0, express_1.default)();
// Enable CORS for all origins
exports.web.use((0, cors_1.default)());
// Parse JSON bodies
exports.web.use(express_1.default.json());
// Register routes
exports.web.use(public_api_1.publicRouter);
exports.web.use(private_api_1.privateRouter);
// Error middleware
exports.web.use(error_middleware_1.errorMiddleware);
