import { NextFunction,Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateProductRequest, GetProductRequest, SearchProductRequest, UpdateProductRequest } from "../model/product-model";
import { ProductType } from "@prisma/client";
import { CreatePageRequest, DeletePageRequest, GetPageRequest, SearchPageRequest, UpdatePageRequest } from "../model/page-mode";
import { PageService } from "../service/page-services";

export class PageController{
    static async create(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: CreatePageRequest = req.body as CreatePageRequest;
            request.id_screen = Number(req.params.id_screen)
            const response = await PageService.create(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Create Page Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: GetPageRequest = req.body as GetPageRequest;
            request.id_screen = Number(req.params.id_screen)
            request.id = Number(req.params.id_page)
            const response = await PageService.get(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Get Page Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: UpdatePageRequest = req.body as UpdatePageRequest;
            request.id = Number(req.params.id_page)
            request.id_screen = Number(req.params.id_screen)
            console.log(request)
            const response = await PageService.update(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Update Page Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: DeletePageRequest = req.body as DeletePageRequest;
            request.id = Number(req.params.id_page)
            request.id_screen = Number(req.params.id_screen)
            const response = await PageService.remove(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Remove Page Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async search(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request : SearchPageRequest = {
                id_screen : Number(req.params.id_screen),
                name: req.query.name as string,
                endpoint: req.query.endpoint as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10
            }
            const response = await PageService.search(req.user!, request);
            res.status(200).json(response)
        }
        catch(e){
            next(e)
        }
    }
}