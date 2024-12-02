import { z, ZodType } from "zod"

export class ElementValidation {
    static readonly CREATE: ZodType = z.object({
        id_page: z.number().positive(),
        name: z.string().min(1).max(100),
        type: z.string().min(1).max(100),
        content:  z.record(z.unknown()).optional(), 
        properties:  z.record(z.unknown()).optional(), 
        style:  z.record(z.unknown()).optional(), 
    });

    static readonly GET: ZodType = z.object({
        id: z.number().positive(),
        id_page: z.number().positive()
    });

    static readonly SEARCH: ZodType = z.object({
        id_page: z.number().positive()
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        id_page: z.number().positive(),
        name: z.string().min(1).max(100).optional(),
        type: z.string().min(1).max(100).optional(),
        content:  z.record(z.unknown()).optional(), 
        properties:  z.record(z.unknown()).optional(), 
        style:  z.record(z.unknown()).optional(), 
    });

    static readonly DELETE: ZodType = z.object({
        id: z.number().positive(),
        id_page: z.number().positive()
    })

}
