import { Element, User } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateDatasetOnElementRequest, DatasetOnElementResponse, toDatasetOnElementResponse } from "../model/element-dataset-model";
import { DatasetOnElementValidation } from "../validation/element-dataset-validation";
import { DatasetService } from "./dataset-services";
import { ElementService } from "./element-service";

export class DatasetOnElementService{

    static async create(user: User, request: CreateDatasetOnElementRequest): Promise<DatasetOnElementResponse>{
        const createRequest = Validation.validate(DatasetOnElementValidation.ASSIGN, request);
        await DatasetService.checkDatasetExist(request.id_dataset, user.email);
        await ElementService.checkElementExist(request.id_element, request.id_page);
        
        const assign = await prismaClient.datasetsOnElements.create({
            data: {
                id_dataset: createRequest.id_dataset,
                id_element: createRequest.id_element
            }
        });


        return toDatasetOnElementResponse(assign)
    }

    static async checkDatasetOnElementExist(id_dataset: number, id_element: number): Promise<DatasetOnElementResponse>{
        const data = await prismaClient.datasetsOnElements.findFirst({
            where: {
                    id_dataset: id_dataset,
                    id_element: id_element,
            },
        });
        if(!data){
            throw new ResponseError(404, "Assignment not found!")
        }

        return data;
    }

    static async get(id_dataset: number, id_element: number): Promise<DatasetOnElementResponse> {
        const data = await this.checkDatasetOnElementExist(id_dataset, id_element)
        return toDatasetOnElementResponse(data)
    }

    static async getDataset(id_element: number): Promise<DatasetOnElementResponse> {
        const data = await prismaClient.datasetsOnElements.findFirst({
            where: {
                    id_element: id_element,
            },
        });
        console.log(data)
        if(!data){
            throw new ResponseError(404, "Assignment not found!")
        }

        return toDatasetOnElementResponse(data)
        
    }

    static async getElement(id_dataset: number): Promise<DatasetOnElementResponse> {
        const data = await prismaClient.datasetsOnElements.findFirst({
            where: {
                    id_dataset: id_dataset,
            },
        });
        console.log(data)
        if(!data){
            throw new ResponseError(404, "Assignment not found!")
        }

        return toDatasetOnElementResponse(data)
        
    }

    static async remove(id_dataset: number, id_element: number): Promise<DatasetOnElementResponse>{
        console.log(id_dataset,id_element)
        await this.checkDatasetOnElementExist(id_dataset,id_element)
        const dataset = await prismaClient.datasetsOnElements.delete({
            where:{
                id_dataset_id_element:{
                    id_dataset: id_dataset,
                    id_element: id_element
                }
            }
        })

        return toDatasetOnElementResponse(dataset)
    }

}