import { NextFunction,Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateScreenRequest, UpdateScreenRequest } from "../model/screen-model";
import { ScreenService } from "../service/screen-services";

export class ScreenController{
    static async create(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: CreateScreenRequest = req.body as CreateScreenRequest;
            const response = await ScreenService.create(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Create Screen Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction){
        try{
            const id_screen = Number(req.params.id_screen)
            const response = await ScreenService.get(req.user!, id_screen);
            res.status(200).json({
                status: "OK",
                message: "Get Screen Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: UpdateScreenRequest = req.body as UpdateScreenRequest;
            request.id = Number(req.params.id_screen)
            const response = await ScreenService.update(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Update Screen Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction){
        try{
            const id_screen = Number(req.params.id_screen)
            const response = await ScreenService.remove(req.user!, id_screen);
            res.status(200).json({
                status: "OK",
                message: "Remove Screen Success",
                data: {response}
            })
        }
        catch(e){
            next(e)
        }
    }
}