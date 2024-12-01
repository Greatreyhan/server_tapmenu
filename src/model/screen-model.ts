import { Screen } from "@prisma/client";

export type ScreenResponse ={
    id: number;
    name: string;
    endpoint: string;
}

export type CreateScreenRequest = {
    name: string;
    endpoint: string;
}

export type UpdateScreenRequest = {
    id: number,
    name: string;
    endpoint: string;
}

export type SearchScreenRequest = {
    name?: string;
    endpoint: string;
    page: number;
    size: number;
}

export function toScreenResponse(screen: Screen): ScreenResponse{
    return{
        id: screen.id,
        name: screen.name,
        endpoint: screen.endpoint
    }
}