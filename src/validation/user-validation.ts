import { z, ZodType } from "zod";

export class UserValidation{
    
    static readonly REGISTER: ZodType = z.object({
        email : z.string().min(1).max(100),
        username : z.string().min(1).max(100),
        password : z.string().min(1).max(100),
        address : z.string().optional(),
        whatsapp_number : z.string().optional(),
    })

    static readonly LOGIN: ZodType = z.object({
        email : z.string().min(1).max(100),
        password : z.string().min(1).max(100)
    })

    static readonly UPDATE: ZodType = z.object({
        username : z.string().min(1).max(100).optional(),
        password : z.string().min(1).max(100).optional(),
        address : z.string().optional(),
        whatsapp_number : z.string().optional(),
    })

}