import {z, ZodType} from "zod"

export class ScreenValidation{
    static readonly CREATE : ZodType = z.object({
        name: z.string().min(1).max(100),
        endpoint: z.string().min(1).max(100)
    });

    static readonly UPDATE : ZodType = z.object({
        name: z.string().min(1).max(100).optional(),
        id: z.number().positive(),
        endpoint: z.string().min(1).max(100).optional()    
    }
    );

    static readonly SEARCH : ZodType = z.object({
        name: z.string().min(1).max(100),
        page: z.number().min(1).max(100).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
