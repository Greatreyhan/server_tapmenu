import express from "express";
import cors from "cors"; 
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { privateRouter } from "../route/private-api";

export const web = express();

// Enable CORS for all origins
web.use(cors());

// Parse JSON bodies
web.use(express.json());

// Register routes
web.use(publicRouter);
web.use(privateRouter);

// Error middleware
web.use(errorMiddleware);
