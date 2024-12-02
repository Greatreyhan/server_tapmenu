import { Element, User } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { CreateElementRequest, DeleteElementRequest, ElementResponse, GetElementRequest, ListElementRequest, toElementResponse, UpdateElementRequest } from "../model/element-model";
import { ElementValidation } from "../validation/element-validation";
import { PageService } from "./page-services";
import { ResponseError } from "../error/response-error";
import { ScreenService } from "./screen-services";
import { Pageable } from "../model/page";

export class ElementService{

    static async checkElementExist(id: number, id_page: number): Promise<Element>{
        const element = await prismaClient.element.findUnique({
            where: {
                id: id,
                id_page : id_page
            }
        });

        if(!element){
            throw new ResponseError(404, "Element not found!");
        }

        return element;
    }

    static async create(user: User, request: CreateElementRequest): Promise<ElementResponse>{
        const createRequest = Validation.validate(ElementValidation.CREATE, request);
        await PageService.checkPageExist(request.id_page, request.id_screen);
        
        const element = await prismaClient.element.create({
            data: {
                id_page: createRequest.id_page,
                name: createRequest.name,
                type: createRequest.type,
                content: createRequest.content ?? "", // Handle nullability for JSON fields
                properties: createRequest.properties ?? "",
                style: createRequest.style ?? "",
            }
        });


        return toElementResponse(element)
    }

    static async get(user: User, request: GetElementRequest): Promise<ElementResponse>{
        const getRequest = Validation.validate(ElementValidation.GET, request);
        await ScreenService.checkScreenExist(request.id_screen, user.email);
        await PageService.checkPageExist(request.id_page, request.id_screen);
        const element = await this.checkElementExist(getRequest.id, getRequest.id_page);

        return toElementResponse(element)
    }

    static async update(user: User, request: UpdateElementRequest): Promise<ElementResponse>{
        const updateRequest = Validation.validate(ElementValidation.UPDATE, request)
        await ScreenService.checkScreenExist(request.id_screen, user.email);
        await PageService.checkPageExist(request.id_page, request.id_screen);
        await this.checkElementExist(updateRequest.id, updateRequest.id_page);

        const element = await prismaClient.element.update({
            where:{
                id: updateRequest.id,
                id_page : updateRequest.id_page
            },
            data: {
                id_page: updateRequest.id_page,
                name: updateRequest.name,
                type: updateRequest.type,
                content: updateRequest.content ?? "", // Handle nullability for JSON fields
                properties: updateRequest.properties ?? "",
                style: updateRequest.style ?? "",
            }
        })

        return toElementResponse(element)
    }

    static async remove(user: User, request: DeleteElementRequest): Promise<ElementResponse>{
        const deleteRequest = Validation.validate(ElementValidation.DELETE, request);
        await ScreenService.checkScreenExist(request.id_screen, user.email);
        await PageService.checkPageExist(request.id_page, request.id_screen);
        await this.checkElementExist(deleteRequest.id, deleteRequest.id_page);


        const element = await prismaClient.element.delete({
            where:{
                id: deleteRequest.id,
                id_page : deleteRequest.id_page
            }
        })

        return toElementResponse(element)
    }

    static async list(user: User, request: ListElementRequest): Promise<Pageable<ElementResponse>>{
        const datasetSearch = Validation.validate(ElementValidation.SEARCH, request);
        let skip = (datasetSearch.page - 1) * datasetSearch.size;    
    
        const products = await prismaClient.element.findMany({
            where: {
                id_page: request.id_page,
            },
            take: datasetSearch.size ?? 10,
            skip: (isNaN(skip)) ? 0 : skip,
        });
    
        const total = await prismaClient.element.count({
            where: {
                id_page: request.id_page,
            }
        });
    
        return {
            status: 'OK',
            message: 'Success get list elements',
            data: products.map((el) => toElementResponse(el)),
            paging: {
                current_page: datasetSearch.page,
                total_page: Math.ceil(total / datasetSearch.size),
                size: datasetSearch.size,
            },
        };
    }

}