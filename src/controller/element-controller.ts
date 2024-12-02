import { NextFunction,Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateElementRequest, DeleteElementRequest, GetElementRequest, ListElementRequest, UpdateElementRequest } from "../model/element-model";
import { ElementService } from "../service/element-service";

export class ElementController{
    static async create(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: CreateElementRequest = req.body as CreateElementRequest;
            request.id_page = Number(req.params.id_page)
            const response = await ElementService.create(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Create Element Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: GetElementRequest = req.body as GetElementRequest;
            request.id_screen = Number(req.params.id_screen)
            request.id_page = Number(req.params.id_page)
            request.id = Number(req.params.id_element)
            const response = await ElementService.get(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Get Element Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: UpdateElementRequest = req.body as UpdateElementRequest;
            request.id_screen = Number(req.params.id_screen)
            request.id_page = Number(req.params.id_page)
            request.id = Number(req.params.id_element)
            const response = await ElementService.update(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Update Element Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: DeleteElementRequest = req.body as DeleteElementRequest;
            request.id_screen = Number(req.params.id_screen)
            request.id_page = Number(req.params.id_page)
            request.id = Number(req.params.id_element)
            const response = await ElementService.remove(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Remove Element Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request : ListElementRequest = {
                id_page : Number(req.params.id_page),
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10
            }
            const response = await ElementService.list(req.user!, request);
            res.status(200).json(response)
        }
        catch(e){
            next(e)
        }
    }
}