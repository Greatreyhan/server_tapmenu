import { DatasetsOnElements } from "@prisma/client";

export type DatasetOnElementResponse ={
    id_dataset: number;
    id_element: number;
    assigned_at: Date;
}

export type CreateDatasetOnElementRequest = {
    id_dataset: number;
    id_element: number;
    id_page : number;
}

export type GetDatasetOnElementRequest = {
    id_dataset: number;
    id_element: number;
    id_page : number;
}

export type ListDatasetRequest = {
    id_element: number;
}

export type ListElementRequest = {
    id_dataset: number;
}

export function toDatasetOnElementResponse(data: DatasetsOnElements): DatasetOnElementResponse{
    
    return{
        id_dataset: data.id_dataset,
        id_element: data.id_element,
        assigned_at: data.assigned_at ?? new Date(),
    }
}