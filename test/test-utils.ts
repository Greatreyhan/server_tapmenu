import { Screen, Dataset, Product, Page } from "@prisma/client";
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

    static async get(): Promise<Dataset>{
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

export class ProductTest{

    static async delete(){

        await prismaClient.product.deleteMany({
            where:{
                dataset:{
                    id_user: "test@gmail.com"
                }
            }
        })

    }

    static async create(){
        const dataset = await DatasetTest.get()
        await prismaClient.product.create({
            data:{
                id_dataset: dataset.id,
                image: "link",
                title: "test",
                description: "test",
                price: 1000,
                click: 100,
                qty: 10,
                status: true,
                type: "FOOD",
            }
        })
    }

    static async get(): Promise<Product>{
        const dataset = await prismaClient.product.findFirst({
            where:{
                dataset:{
                    id_user: "test@gmail.com"
                }
            }
        });

        if(!dataset){
            throw new Error("Product not found!")
        }

        return dataset;
    }

}


export class ScreenTest{

    static async delete(){
        await prismaClient.screen.deleteMany({
            where:{
                id_user: "test@gmail.com"
            }
        })
    }

    static async create(){
        await prismaClient.screen.create({
            data:{
                id_user: "test@gmail.com",
                name: "Test",
                endpoint: "test"
            }
        })
    }

    static async get(): Promise<Screen>{
        const screen = await prismaClient.screen.findFirst({
            where:{
                id_user: "test@gmail.com",
            }
        });

        if(!screen){
            throw new Error("Screen not found!")
        }

        return screen;
    }

}


export class PageTest{

    static async delete(){

        await prismaClient.page.deleteMany({
            where:{
                screen:{
                    id_user: "test@gmail.com"
                }
            }
        })

    }

    static async create(){
        const screen = await ScreenTest.get()
        await prismaClient.page.create({
            data:{
                id_screen: screen.id,
                name: "Test",
                endpoint: "test"
            }
        })
    }

    static async get(): Promise<Page>{
        const page = await prismaClient.page.findFirst({
            where:{
                screen:{
                    id_user: "test@gmail.com"
                }
            }
        });

        if(!page){
            throw new Error("Page not found!")
        }

        return page;
    }

}
