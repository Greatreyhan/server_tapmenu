import { Screen, User } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { CreateScreenRequest, ScreenResponse, SearchScreenRequest, toScreenResponse, UpdateScreenRequest } from "../model/screen-model";
import { ScreenValidation } from "../validation/screen-validation";

export class ScreenService{

    static async checkScreenExist(id: number, id_user: string): Promise<Screen>{
        const screen = await prismaClient.screen.findUnique({
            where: {
                id: id,
                id_user : id_user
            }
        });

        if(!screen){
            throw new ResponseError(404, "Screen not found!")
        }

        return screen;
    }

    static async create(user: User, request: CreateScreenRequest): Promise<ScreenResponse>{
        const createRequest = Validation.validate(ScreenValidation.CREATE, request)

        const record = {
            ...createRequest,
            ...{id_user: user.email}
        }

        const screen = await prismaClient.screen.create({
            data: record
        })

        return toScreenResponse(screen)
    }


    static async get(user: User, id_screen: number): Promise<ScreenResponse> {
        const screen = await this.checkScreenExist(id_screen, user.email)
        return toScreenResponse(screen)
    }

    static async update(user: User, request: UpdateScreenRequest): Promise<ScreenResponse>{
        const updateRequest = Validation.validate(ScreenValidation.UPDATE, request)
        await this.checkScreenExist(updateRequest.id, user.email)
        console.log(updateRequest)
        const screen = await prismaClient.screen.update({
            where:{
                id: updateRequest.id,
                id_user : user.email
            },
            data: updateRequest
        })

        return toScreenResponse(screen)
    }

    static async remove(user: User, id_screen: number): Promise<ScreenResponse>{
        await this.checkScreenExist(id_screen, user.email)

        const screen = await prismaClient.screen.delete({
            where:{
                id: id_screen,
                id_user: user.email
            }
        })

        return toScreenResponse(screen)
    }

    static async search(user: User, request: SearchScreenRequest): Promise<Pageable<ScreenResponse>>{
        const datasetSearch = Validation.validate(ScreenValidation.SEARCH, request)
        const skip = (datasetSearch.page - 1) * datasetSearch.size;

        const filters = [];

        if(datasetSearch.name){
            filters.push({
                name :{
                    contains: datasetSearch.name
                }
            })
        }

        const screens = await prismaClient.screen.findMany({
            where: {
                id_user : user.email,
                AND: filters
            },
            take : datasetSearch.size,
            skip : skip
        })

        const total = await prismaClient.dataset.count({
            where: {
                id_user : user.email,
                AND: filters
            },
            take : datasetSearch.size,
            skip : skip
        })

        return {
            status: 'OK',
            message: "Success search screen",
            data: screens.map(data => toScreenResponse(data)),
            paging: {
                current_page: datasetSearch.page,
                total_page: Math.ceil(total/datasetSearch.size),
                size: datasetSearch.size
            }
        }
    }


}