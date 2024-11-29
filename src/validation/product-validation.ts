import {z, ZodType} from "zod"

enum ProductType {
    FOOD = "FOOD",
    BEVERAGES = "BEVERAGES",
    SNACK = "SNACK",
    DESSERTS = "DESSERTS",
    OTHER = "OTHER",
  }

export class ProductValidation{
    static readonly CREATE : ZodType = z.object({
        id_dataset: z.number().positive(),
        image: z.string().min(1).max(100),
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(255),
        price: z.number().positive(),
        click: z.number().positive().optional(),
        qty: z.number().positive().optional(),
        status: z.boolean().optional(),
        type: z.nativeEnum(ProductType)
    });

    static readonly GET : ZodType = z.object({
        id_dataset: z.number().positive(),
        id: z.number().positive()
    });

    static readonly UPDATE : ZodType = z.object({
        id: z.number().positive(),
        id_dataset: z.number().positive(),
        image: z.string().min(1).max(100).optional(),
        title: z.string().min(1).max(100).optional(),
        description: z.string().min(1).max(255).optional(),
        price: z.number().positive().optional(),
        click: z.number().positive().optional(),
        qty: z.number().positive().optional(),
        status: z.boolean().optional(),
        type: z.nativeEnum(ProductType).optional()
    });

    static readonly SEARCH: ZodType = z.object({
        id_dataset: z.number().positive(), // Keeps this mandatory and positive
        image: z.string().min(1).max(100).optional(),
        title: z.string().min(1).max(100).optional(),
        description: z.string().min(1).max(255).optional(),
        price_max: z.number().min(0).optional(), // Allows 0 and undefined
        price_min: z.number().min(0).optional(),
        click_max: z.number().min(0).optional(),
        click_min: z.number().min(0).optional(),
        qty_max: z.number().min(0).optional(),
        qty_min: z.number().min(0).optional(),
        status: z.boolean().optional(),
        type: z.nativeEnum(ProductType).optional()
    });
    

    static readonly DELETE : ZodType = z.object({
        id_dataset: z.number().positive(),
        id: z.number().positive()
    })

}
