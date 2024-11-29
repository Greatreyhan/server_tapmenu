import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { DatasetController } from "../controller/dataset-controller";

export const privateRouter = express.Router();
privateRouter.use(authMiddleware);


// USER API
privateRouter.get("/api/users", UserController.get);
privateRouter.patch("/api/users", UserController.update);
privateRouter.delete("/api/users", UserController.logout);

// Contact API
privateRouter.post("/api/datasets", DatasetController.create);
privateRouter.get("/api/datasets/:id_dataset(\\d+)", DatasetController.get);
privateRouter.patch("/api/datasets/:id_dataset(\\d+)", DatasetController.update);
privateRouter.delete("/api/datasets/:id_dataset(\\d+)", DatasetController.remove);
privateRouter.get("/api/datasets", DatasetController.search);
