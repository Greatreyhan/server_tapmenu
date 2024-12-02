import { NextFunction,Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateDatasetOnElementRequest, GetDatasetOnElementRequest } from "../model/element-dataset-model";
import { DatasetOnElementService } from "../service/element-dataset-services";

export class DatasetOnElementController{

    static async assign(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: CreateDatasetOnElementRequest = req.body as CreateDatasetOnElementRequest;
            const response = await DatasetOnElementService.create(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Assign Dataset-Element Success",
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
            const id_element = Number(req.params.id_element)
            console.log(id_dataset, id_element)
            const response = await DatasetOnElementService.get(id_dataset, id_element);
            res.status(200).json({
                status: "OK",
                message: "Get Dataset-Element Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async getElement(req: UserRequest, res: Response, next: NextFunction){
        try{
            const id_dataset = Number(req.params.id_dataset)
            const response = await DatasetOnElementService.getElement(id_dataset);
            res.status(200).json({
                status: "OK",
                message: "Get Dataset-Element Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async getDataset(req: UserRequest, res: Response, next: NextFunction){
        try{
            const id_element = Number(req.params.id_element)
            const response = await DatasetOnElementService.getDataset(id_element);
            res.status(200).json({
                status: "OK",
                message: "Get Dataset-Element Success",
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
            const id_element = Number(req.params.id_element)
            const response = await DatasetOnElementService.remove(id_dataset, id_element);
            res.status(200).json({
                status: "OK",
                message: "Remove Dataset-Element Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

}