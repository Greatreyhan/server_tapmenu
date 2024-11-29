import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt"
export class UserTest{

    static async delete(){

        await prismaClient.user.deleteMany({
            where:{
                email : "test@gmail.com"
            }
        })

    }

    static async create(){
        await prismaClient.user.create({
            data:{
                email: "test@gmail.com",
                username: "test",
                password: await bcrypt.hash("test",10),
                token: "test"
            }
        })
    }

}

export class DatasetTest{

    static async delete(){
        await prismaClient.dataset.deleteMany({
            where:{
                id_user: "test@gmail.com"
            }
        })
    }

    static async create(){
        await prismaClient.dataset.create({
            data:{
                id_user: "test@gmail.com",
                name: "Test"
            }
        })
    }

    static async get(){
        const dataset = await prismaClient.dataset.findFirst({
            where:{
                id_user: "test@gmail.com",
            }
        });

        if(!dataset){
            throw new Error("Dataset not found!")
        }

        return dataset;
    }

}