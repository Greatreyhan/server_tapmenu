import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"

export class UserService{
    static async register(request: CreateUserRequest) : Promise<UserResponse>{
        const registerReq = Validation.validate(UserValidation.REGISTER, request);

        const checkUser = await prismaClient.user.count({
            where: {
                email : registerReq.email
            }
        })

        if(checkUser != 0){
            throw new ResponseError(400, "User Already Exist!")    
        }

        registerReq.password = await bcrypt.hash(registerReq.password, 10)

        const user = await prismaClient.user.create({
            data: registerReq
        })

        return toUserResponse(user);
    }
}