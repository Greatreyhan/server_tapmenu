import {z, ZodType} from "zod"

export class PageValidation{
    static readonly CREATE : ZodType = z.object({
        id_screen: z.number().positive(),
        name: z.string().min(1).max(100),
        endpoint: z.string().min(1).max(100)
    });

    static readonly GET : ZodType = z.object({
        id: z.number().positive(),
        id_screen: z.number().positive()
    });

    static readonly UPDATE : ZodType = z.object({
        id: z.number().positive(),
        id_screen: z.number().positive(),
        name: z.string().min(1).max(100),
        endpoint: z.string().min(1).max(100)
    });
    
    static readonly DELETE : ZodType = z.object({
        id: z.number().positive(),
        id_screen: z.number().positive()
    })

}
