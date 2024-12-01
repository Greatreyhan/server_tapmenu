import { Product, Prisma, ProductType } from "@prisma/client";

export type ProductResponse = {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
    click?: number;
    qty?: number;
    status?: boolean;
    type: ProductType;
}

export type  CreateProductRequest = {
    id_dataset: number;
    image: string;
    title: string;
    description: string;
    price: number;
    click?: number;
    qty?: number;
    status?: boolean;
    type: ProductType;
}

export type  UpdateProductRequest = {
    id: number;
    id_dataset: number;
    image?: string;
    title?: string;
    description?: string;
    price?: number;
    click?: number;
    qty?: number;
    status?: boolean;
    type?: ProductType;
}

export type SearchProductRequest = {
    id_dataset: number;
    title?: string;
    description?: string;
    price_max?: number;
    price_min?: number;
    click_max?: number;
    click_min?: number;
    qty_max?: number;
    qty_min?: number;
    status?: boolean;
    type?: ProductType;
    page: number;
    size: number;
}

export type GetProductRequest = {
    id_dataset: number;
    id: number;
}

export type DeleteProductRequest = {
    id_dataset: number;
    id: number;
}

export function toProductResponse(product: Product): ProductResponse{
    return{
        id: product.id,
        image: product.image,
        title: product.title,
        description: product.description,
        price: product.price,
        click: product.click,
        qty: product.qty,
        status: product.status,
        type: product.type
    }
}