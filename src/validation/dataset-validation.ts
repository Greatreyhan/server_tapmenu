import {z, ZodType} from "zod"

export class DatasetValidation{
    static readonly CREATE : ZodType = z.object({
        name: z.string().min(1).max(100)
    });

    static readonly UPDATE : ZodType = z.object({
        name: z.string().min(1).max(100),
        id: z.number().positive()
    });

    static readonly SEARCH : ZodType = z.object({
        name: z.string().min(1).max(100).optional(),
        page: z.number().min(1).max(100).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
