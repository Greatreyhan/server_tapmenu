import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

export const privateRouter = express.Router();
privateRouter.use(authMiddleware);

privateRouter.get("/api/users", UserController.get);
privateRouter.patch("/api/users", UserController.update);
privateRouter.delete("/api/users", UserController.logout);