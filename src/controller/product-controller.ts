import { NextFunction,Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateProductRequest, GetProductRequest, SearchProductRequest, UpdateProductRequest } from "../model/product-model";
import { ProductService } from "../service/product-service";
import { ProductType } from "@prisma/client";

export class ProductController{
    static async create(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: CreateProductRequest = req.body as CreateProductRequest;
            request.id_dataset = Number(req.params.id_dataset)
            const response = await ProductService.create(req.user!, request);
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
            const request: GetProductRequest = req.body as GetProductRequest;
            request.id_dataset = Number(req.params.id_dataset)
            request.id = Number(req.params.id_product)
            const response = await ProductService.get(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Get Product Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: UpdateProductRequest = req.body as UpdateProductRequest;
            request.id = Number(req.params.id_product)
            request.id_dataset = Number(req.params.id_dataset)
            console.log(request)
            const response = await ProductService.update(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Update Product Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }

    static async search(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request : SearchProductRequest = {
                id_dataset : Number(req.params.id_dataset),
                title: req.query.title as string,
                description: req.query.description as string,
                price_max: req.query.price_max ? Number(req.query.price_max) : 0,
                price_min: req.query.price_min ? Number(req.query.price_min) : 0,
                click_max: req.query.click_max ? Number(req.query.click_max) : 0,
                click_min: req.query.click_min ? Number(req.query.click_min) : 0,
                qty_max: req.query.qty_max ? Number(req.query.qty_max) : 0,
                qty_min: req.query.qty_min ? Number(req.query.qty_min) : 0,
                status: req.query.status ? Boolean(req.query.status) : true,
                type: req.query.type as ProductType,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10
            }
            const response = await ProductService.search(req.user!, request);
            res.status(200).json(response)
        }
        catch(e){
            next(e)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request: UpdateProductRequest = req.body as UpdateProductRequest;
            request.id = Number(req.params.id_product)
            request.id_dataset = Number(req.params.id_dataset)
            const response = await ProductService.remove(req.user!, request);
            res.status(200).json({
                status: "OK",
                message: "Remove Product Success",
                data: response
            })
        }
        catch(e){
            next(e)
        }
    }
}