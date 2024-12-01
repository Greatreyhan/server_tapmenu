import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { DatasetController } from "../controller/dataset-controller";
import { ProductController } from "../controller/product-controller";
import { ScreenController } from "../controller/screen-controller";
import { PageController } from "../controller/page-controller";

export const privateRouter = express.Router();
privateRouter.use(authMiddleware);


// USER API
privateRouter.get("/api/users", UserController.get);
privateRouter.patch("/api/users", UserController.update);
privateRouter.delete("/api/users", UserController.logout);

// Dataset API
privateRouter.post("/api/datasets", DatasetController.create);
privateRouter.get("/api/datasets/:id_dataset(\\d+)", DatasetController.get);
privateRouter.patch("/api/datasets/:id_dataset(\\d+)", DatasetController.update);
privateRouter.delete("/api/datasets/:id_dataset(\\d+)", DatasetController.remove);
privateRouter.get("/api/datasets", DatasetController.search);

// Product API
privateRouter.post("/api/datasets/:id_dataset(\\d+)/products", ProductController.create);
privateRouter.get("/api/datasets/:id_dataset(\\d+)/products/:id_product(\\d+)", ProductController.get);
privateRouter.patch("/api/datasets/:id_dataset(\\d+)/products/:id_product(\\d+)", ProductController.update);
privateRouter.delete("/api/datasets/:id_dataset(\\d+)/products/:id_product(\\d+)", ProductController.remove);
privateRouter.get("/api/datasets/:id_dataset(\\d+)/products", ProductController.search);

// Screen API
privateRouter.post("/api/screens", ScreenController.create);
privateRouter.get("/api/screens/:id_screen(\\d+)", ScreenController.get);
privateRouter.patch("/api/screens/:id_screen(\\d+)", ScreenController.update);
privateRouter.delete("/api/screens/:id_screen(\\d+)", ScreenController.remove);

// Page API
privateRouter.post("/api/screens/:id_screen(\\d+)/pages", PageController.create);
privateRouter.get("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)", PageController.get);
privateRouter.patch("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)", PageController.update);
privateRouter.delete("/api/screens/:id_screen(\\d+)/pages/:id_page(\\d+)", PageController.remove);