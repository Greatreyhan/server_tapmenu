import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, UpdateUserRequest, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { NextFunction } from "express";

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

    static async login(request: LoginUserRequest) : Promise<UserResponse>{
        const loginReq = Validation.validate(UserValidation.LOGIN, request);

        const user = await prismaClient.user.findUnique({
            where:{
                email: loginReq.email
            }
        })

        if(!user){
            throw new ResponseError(401, "Email or password is invalid");
        }

        const isPasswordValid = await bcrypt.compare(loginReq.password, user.password)

        if(!isPasswordValid){
            throw new ResponseError(401, "Email or password is invalid");
        }

        const updatedUser = await prismaClient.user.update({
            where: {
                email : loginReq.email
            },
            data: {
                token: uuid()
            }
        })

        const response = toUserResponse(updatedUser);
        response.token = updatedUser.token!;
        return response;
    }

    static async get(user: User): Promise<UserResponse>{
        return toUserResponse(user)
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse>{
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        if(updateRequest.username){
            user.username = updateRequest.username;
        }

        if(updateRequest.whatsapp_number){
            user.whatsapp_number = updateRequest.whatsapp_number;
        }

        if(updateRequest.address){
            user.address = updateRequest.address;
        }

        if(updateRequest.password){
            user.password = await bcrypt.hash(updateRequest.password,10);
        }

        const result = await prismaClient.user.update({
            where:{
                email:user.email
            },
            data: user
        })

        return toUserResponse(result);
    }

    static async delete(user:User): Promise<UserResponse>{
        const result = await prismaClient.user.update({
            where:{
                email: user.email
            },
            data:{
                token: null
            }
        })

        return toUserResponse(result)
    }
}