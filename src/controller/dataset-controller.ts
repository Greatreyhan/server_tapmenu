import { NextFunction,Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateDatasetRequest, SearchDatasetRequest, UpdateDatasetRequest } from "../model/dataset-model";
import { DatasetService } from "../service/dataset-services";

export class DatasetController{
    static async create(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: CreateDatasetRequest = req.body as CreateDatasetRequest;
            const response = await DatasetService.create(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Create Dataset Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction){
        try{
            const id_dataset = Number(req.params.id_dataset)
            const response = await DatasetService.get(req.user!, id_dataset);
            res.status(200).json({
                status: "OK",
                message: "Get Dataset Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: UpdateDatasetRequest = req.body as UpdateDatasetRequest;
            request.id = Number(req.params.id_dataset)
            const response = await DatasetService.update(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Update Dataset Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction){
        try{
            const id_dataset = Number(req.params.id_dataset)
            const response = await DatasetService.remove(req.user!, id_dataset);
            res.status(200).json({
                status: "OK",
                message: "Remove Dataset Success",
                data: {response}
            })
        }
        catch(e){
            next(e)
        }
    }

    static async search(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request : SearchDatasetRequest = {
                name: req.query.name as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10
            }
            const response = await DatasetService.search(req.user!, request);
            const data = response.data
            res.status(200).json(response)
        }
        catch(e){
            next(e)
        }
    }
}