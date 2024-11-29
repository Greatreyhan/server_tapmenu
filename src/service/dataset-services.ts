import { Dataset, User } from "@prisma/client";
import { CreateDatasetRequest, DatasetResponse, SearchDatasetRequest, toDatasetResponse, UpdateDatasetRequest } from "../model/dataset-model";
import { DatasetValidation } from "../validation/dataset-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";

export class DatasetService{

    static async checkDatasetExist(id: number, id_user: string): Promise<Dataset>{
        const dataset = await prismaClient.dataset.findUnique({
            where: {
                id: id,
                id_user : id_user
            }
        });

        if(!dataset){
            throw new ResponseError(404, "Dataset not found!")
        }

        return dataset;
    }

    static async create(user: User, request: CreateDatasetRequest): Promise<DatasetResponse>{
        const createRequest = Validation.validate(DatasetValidation.CREATE, request)

        const record = {
            ...createRequest,
            ...{id_user: user.email}
        }

        const dataset = await prismaClient.dataset.create({
            data: record
        })

        return toDatasetResponse(dataset)
    }

    static async get(user: User, id_dataset: number): Promise<DatasetResponse> {
        const dataset = await this.checkDatasetExist(id_dataset, user.email)
        return toDatasetResponse(dataset)
    }

    static async update(user: User, request: UpdateDatasetRequest): Promise<DatasetResponse>{
        const updateRequest = Validation.validate(DatasetValidation.UPDATE, request)
        await this.checkDatasetExist(updateRequest.id, user.email)

        const dataset = await prismaClient.dataset.update({
            where:{
                id: updateRequest.id,
                id_user : user.email
            },
            data: updateRequest
        })

        return toDatasetResponse(dataset)
    }

    static async remove(user: User, id_dataset: number): Promise<DatasetResponse>{
        await this.checkDatasetExist(id_dataset, user.email)

        const dataset = await prismaClient.dataset.delete({
            where:{
                id: id_dataset,
                id_user: user.email
            }
        })

        return toDatasetResponse(dataset)
    }

    static async search(user: User, request: SearchDatasetRequest): Promise<Pageable<DatasetResponse>>{
        const datasetSearch = Validation.validate(DatasetValidation.SEARCH, request)
        const skip = (datasetSearch.page - 1) * datasetSearch.size;

        const filters = [];

        if(datasetSearch.name){
            filters.push({
                name :{
                    contains: datasetSearch.name
                }
            })
        }

        const datasets = await prismaClient.dataset.findMany({
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
            message: "Success search data",
            data: datasets.map(data => toDatasetResponse(data)),
            paging: {
                current_page: datasetSearch.page,
                total_page: Math.ceil(total/datasetSearch.size),
                size: datasetSearch.size
            }
        }
    }
}