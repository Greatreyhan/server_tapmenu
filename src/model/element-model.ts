import { Element } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export type ElementResponse = {
    id: number;
    name: string;
    type: string;
    content: JsonValue;
    properties: JsonValue;
    style: JsonValue;
}

export type  CreateElementRequest = {
    id_screen: number;
    id_page: number;
    name: string;
    type: string;
    content?: JsonValue;
    properties?: JsonValue;
    style?: JsonValue;
}

export type  UpdateElementRequest = {
    id: number;
    id_screen: number;
    id_page: number;
    name: string;
    type: string;
    content: JsonValue;
    properties: JsonValue;
    style: JsonValue;
}

export type  DeleteElementRequest = {
    id: number;
    id_screen: number;
    id_page: number;
}

export type GetElementRequest = {
    id: number;
    id_screen: number;
    id_page: number;
}

export type ListElementRequest = {
    id_page: number;
    page: number;
    size: number;
}

export function toElementResponse(element: Element): ElementResponse{
    return{
        id: element.id,
        name: element.name,
        type: element.type,
        content: element.content,
        properties: element.properties,
        style: element.style,
        
    }
}