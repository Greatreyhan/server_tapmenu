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