"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const dataset_controller_1 = require("../controller/dataset-controller");
const product_controller_1 = require("../controller/product-controller");
const screen_controller_1 = require("../controller/screen-controller");
const page_controller_1 = require("../controller/page-controller");
const element_controller_1 = require("../controller/element-controller");
const element_dataset_controller_1 = require("../controller/element-dataset-controller");
exports.privateRouter = express_1.default.Router();
exports.privateRouter.use(auth_middleware_1.authMiddleware);
// USER API
exports.privateRouter.get("/api/users/current", user_controller_1.UserController.get);
exports.privateRouter.patch("/api/users", user_controller_1.UserController.update);
exports.privateRouter.delete("/api/users", user_controller_1.UserController.logout);
// Dataset API
exports.privateRouter.post("/api/datasets", dataset_controller_1.DatasetController.create);
exports.privateRouter.get("/api/datasets/:id_dataset(\\d+)", dataset_controller_1.DatasetController.get);
exports.privateRouter.patch("/api/datasets/:id_dataset(\\d+)", dataset_controller_1.DatasetController.update);
exports.privateRouter.delete("/api/datasets/:id_dataset(\\d+)", dataset_controller_1.DatasetController.remove);
exports.privateRouter.get("/api/datasets", dataset_controller_1.DatasetController.search);
// Product API
exports.privateRouter.post("/api/datasets/:id_dataset(\\d+)/products", product_controller_1.ProductController.create);
exports.privateRouter.get("/api/datasets/:id_dataset(\\d+)/products/:id_product(\\d+)", product_controller_1.ProductController.get);
exports.privateRouter.patch("/api/datasets/:id_dataset(\\d+)/products/:id_product(\\d+)", product_controller_1.ProductController.update);
exports.privateRouter.delete("/api/datasets/:id_dataset(\\d+)/products/:id_product(\\d+)", product_controller_1.ProductController.remove);
exports.privateRouter.get("/api/datasets/:id_dataset(\\d+)/products", product_controller_1.ProductController.search);
// Screen API
exports.privateRouter.post("/api/screens", screen_controller_1.ScreenController.create);
exports.privateRouter.get("/api/screens/:id_screen(\\d+)", screen_controller_1.ScreenController.get);
exports.privateRouter.patch("/api/screens/:id_screen(\\d+)", screen_controller_1.ScreenController.update);
exports.privateRouter.delete("/api/screens/:id_screen(\\d+)", screen_controller_1.ScreenController.remove);
// Page API
exports.privateRouter.post("/api/screens/:id_screen(\\d+)/pages", page_controller_1.PageController.create);
exports.privateRouter.get("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)", page_controller_1.PageController.get);
exports.privateRouter.patch("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)", page_controller_1.PageController.update);
exports.privateRouter.delete("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)", page_controller_1.PageController.remove);
// Element API
exports.privateRouter.post("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)/elements", element_controller_1.ElementController.create);
exports.privateRouter.get("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)/elements/:id_element(\\d+)", element_controller_1.ElementController.get);
exports.privateRouter.patch("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)/elements/:id_element(\\d+)", element_controller_1.ElementController.update);
exports.privateRouter.delete("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)/elements/:id_element(\\d+)", element_controller_1.ElementController.remove);
exports.privateRouter.get("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)/elements", element_controller_1.ElementController.list);
// DatasetOnElement API
exports.privateRouter.post("/api/dataset-element", element_dataset_controller_1.DatasetOnElementController.assign);
exports.privateRouter.get("/api/dataset-element/:id_dataset/:id_element", element_dataset_controller_1.DatasetOnElementController.get);
exports.privateRouter.get("/api/on-dataset/:id_dataset", element_dataset_controller_1.DatasetOnElementController.getElement);
exports.privateRouter.get("/api/on-element/:id_element", element_dataset_controller_1.DatasetOnElementController.getDataset);
exports.privateRouter.delete("/api/dataset-element/:id_dataset/:id_element", element_dataset_controller_1.DatasetOnElementController.remove);
