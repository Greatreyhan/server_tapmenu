import { Dataset } from "@prisma/client";

export type DatasetResponse ={
    id: number;
    name: string;
}

export type CreateDatasetRequest = {
    name: string;
}

export type UpdateDatasetRequest = {
    id: number,
    name: string;
}

export type SearchDatasetRequest = {
    name?: string;
    page: number;
    size: number;
}

export function toDatasetResponse(dataset: Dataset): DatasetResponse{
    return{
        id: dataset.id,
        name: dataset.name
    }
}