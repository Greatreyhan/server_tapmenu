import { Product, User } from "@prisma/client";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { CreateProductRequest, DeleteProductRequest, GetProductRequest, ProductResponse, SearchProductRequest, toProductResponse, UpdateProductRequest } from "../model/product-model";
import { ProductValidation } from "../validation/product-validation";
import { DatasetService } from "./dataset-services";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";

export class ProductService{

    static async checkProductExist(id: number, id_dataset: number): Promise<Product>{
        const product = await prismaClient.product.findUnique({
            where: {
                id: id,
                id_dataset : id_dataset
            }
        });

        if(!product){
            throw new ResponseError(404, "Dataset not found!");
        }

        return product;
    }

    static async create(user: User, request: CreateProductRequest): Promise<ProductResponse>{
        const createRequest = Validation.validate(ProductValidation.CREATE, request);
        await DatasetService.checkDatasetExist(request.id_dataset, user.email);

        const product = await prismaClient.product.create({
            data: createRequest
        })

        return toProductResponse(product)
    }

    static async get(user: User, request: GetProductRequest): Promise<ProductResponse>{
        const getRequest = Validation.validate(ProductValidation.GET, request);
        await DatasetService.checkDatasetExist(request.id_dataset, user.email);
        const product = await this.checkProductExist(getRequest.id, getRequest.id_dataset);

        return toProductResponse(product)
    }

    static async update(user: User, request: UpdateProductRequest): Promise<ProductResponse>{
        const updateRequest = Validation.validate(ProductValidation.UPDATE, request);
        await DatasetService.checkDatasetExist(request.id_dataset, user.email);
        await this.checkProductExist(updateRequest.id, updateRequest.id_dataset);

        const product = await prismaClient.product.update({
            where:{
                id: updateRequest.id,
                id_dataset : updateRequest.id_dataset
            },
            data: updateRequest
        })

        return toProductResponse(product)
    } 

    static async remove(user: User, request: DeleteProductRequest): Promise<ProductResponse>{
        const deleteRequest = Validation.validate(ProductValidation.DELETE, request);
        await DatasetService.checkDatasetExist(request.id_dataset, user.email)
        await this.checkProductExist(deleteRequest.id, deleteRequest.id_dataset);

        const product = await prismaClient.product.delete({
            where:{
                id: deleteRequest.id,
                id_dataset : deleteRequest.id_dataset
            }
        })

        return toProductResponse(product)
    }

    static async search(user: User, request: SearchProductRequest): Promise<Pageable<ProductResponse>> {
        const datasetSearch = Validation.validate(ProductValidation.SEARCH, request);
        let skip = (datasetSearch.page - 1) * datasetSearch.size;    
        const filters = [];
    
        if (datasetSearch.title) {
            filters.push({
                title: {
                    contains: datasetSearch.title,
                },
            });
        }
    
        if (datasetSearch.description) {
            filters.push({
                description: {
                    contains: datasetSearch.description,
                },
            });
        }
    
        if (datasetSearch.price_max && datasetSearch.price_min) {
            filters.push({
                price: {
                    gte: datasetSearch.price_min,
                    lte: datasetSearch.price_max,
                },
            });
        }
    
        if (datasetSearch.click_max && datasetSearch.click_min) {
            filters.push({
                click: {
                    gte: datasetSearch.click_min,
                    lte: datasetSearch.click_max,
                },
            });
        }
    
        if (datasetSearch.qty_max && datasetSearch.qty_min) {
            filters.push({
                qty: {
                    gte: datasetSearch.qty_min,
                    lte: datasetSearch.qty_max,
                },
            });
        }
    
        if (datasetSearch.status) {
            filters.push({
                status: {
                    equals: datasetSearch.status,
                },
            });
        }
    
        if (datasetSearch.type) {
            filters.push({
                type: {
                    equals: datasetSearch.type,
                },
            });
        }
    
        const products = await prismaClient.product.findMany({
            where: {
                id_dataset: request.id_dataset,
                AND: filters,
            },
            take: datasetSearch.size ?? 10,
            skip: (isNaN(skip)) ? 0 : skip,
        });
    
        const total = await prismaClient.product.count({
            where: {
                id_dataset: request.id_dataset,
                AND: filters,
            },
        });
    
        return {
            status: 'OK',
            message: 'Success search data',
            data: products.map((product) => toProductResponse(product)),
            paging: {
                current_page: datasetSearch.page,
                total_page: Math.ceil(total / datasetSearch.size),
                size: datasetSearch.size,
            },
        };
    }
    

}