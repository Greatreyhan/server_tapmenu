import { Page } from "@prisma/client";

export type PageResponse = {
    id: number;
    name: string;
    endpoint: string;
}

export type  CreatePageRequest = {
    id_screen: number;
    name: string;
    endpoint: string;
}

export type  UpdatePageRequest = {
    id: number;
    id_screen: number;
    name: string;
    endpoint: string;
}

export type  DeletePageRequest = {
    id: number;
    id_screen: number;
}

export type SearchPageRequest = {
    id_screen: number;
    name?: string;
    endpoint?: string;
    page: number;
    size: number;
}

export type GetPageRequest = {
    id: number;
    id_screen: number;
}

export function toPageResponse(page: Page): PageResponse{
    return{
        id: page.id,
        name: page.name,
        endpoint: page.endpoint,
    }
}