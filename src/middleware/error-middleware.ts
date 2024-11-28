import {Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) =>{
    if(error instanceof ZodError){
        res.status(400).json({
            status: 'Error',
            message: 'Validation Error : '+JSON.stringify(error),
            data: {}
        })
    }
    else if(error instanceof ResponseError){
        res.status(error.status).json({
            status: 'Error',
            message: error.message,
            data: {}
        })
    }
    else {
        res.status(500).json({
            status: 'Error',
            message: error.message,
            data: {}
        })
    }
}