import {z, ZodType} from "zod"

export class DatasetOnElementValidation{
    static readonly ASSIGN : ZodType = z.object({
        id_dataset: z.number().positive(),
        id_element: z.number().positive()
    });

    static readonly GET : ZodType = z.object({
        id_dataset: z.number().positive(),
        id_element: z.number().positive()
    });

    static readonly DELETE : ZodType = z.object({
        id_dataset: z.number().positive(),
        id_element: z.number().positive()   
    });
}
