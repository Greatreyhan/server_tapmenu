import { Page, User } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreatePageRequest, DeletePageRequest, GetPageRequest, PageResponse, toPageResponse, UpdatePageRequest } from "../model/page-mode";
import { PageValidation } from "../validation/page-validation";
import { ScreenService } from "./screen-services";

export class PageService{

    static async checkPageExist(id: number, id_screen: number): Promise<Page>{
        const page = await prismaClient.page.findUnique({
            where: {
                id: id,
                id_screen : id_screen
            }
        });

        if(!page){
            throw new ResponseError(404, "Page not found!");
        }

        return page;
    }

    static async create(user: User, request: CreatePageRequest): Promise<PageResponse>{
        const createRequest = Validation.validate(PageValidation.CREATE, request);
        await ScreenService.checkScreenExist(request.id_screen, user.email);

        const page = await prismaClient.page.create({
            data: createRequest
        })

        return toPageResponse(page)
    }

    static async get(user: User, request: GetPageRequest): Promise<PageResponse>{
        const getRequest = Validation.validate(PageValidation.GET, request);
        await ScreenService.checkScreenExist(request.id_screen, user.email);
        const page = await this.checkPageExist(getRequest.id, getRequest.id_screen);

        return toPageResponse(page)
    }

    static async update(user: User, request: UpdatePageRequest ): Promise<PageResponse>{
        const updateRequest = Validation.validate(PageValidation.UPDATE, request);
        await ScreenService.checkScreenExist(request.id_screen, user.email);
        await this.checkPageExist(updateRequest.id, updateRequest.id_screen);

        const page = await prismaClient.page.update({
            where:{
                id: updateRequest.id,
                id_screen : updateRequest.id_screen
            },
            data: updateRequest
        })

        return toPageResponse(page)
    } 

    static async remove(user: User, request: DeletePageRequest): Promise<PageResponse>{
        const deleteRequest = Validation.validate(PageValidation.DELETE, request);
        await ScreenService.checkScreenExist(request.id_screen, user.email);
        await this.checkPageExist(deleteRequest.id, deleteRequest.id_screen);

        const page = await prismaClient.page.delete({
            where:{
                id: deleteRequest.id,
                id_screen : deleteRequest.id_screen
            }
        })

        return toPageResponse(page)
    }

}