import supertest from "supertest"
import { DatasetTest, ProductTest, UserTest } from "./test-utils"
import {web} from "../src/application/web"
describe("POST /api/datasets/:id_dataset(\\d+)/products", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
    })

    afterEach(async () =>{
        await ProductTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should create new product", async () => {
        const dataset = await DatasetTest.get();
        const response = await supertest(web)
            .post(`/api/datasets/${dataset.id}/products`)
            .set("X-API-TOKEN", "test")
            .send({
                image: "link",
                title: "test",
                description: "test",
                price: 1000,
                click: 100,
                qty: 10,
                status: true,
                type: "FOOD", // Use a valid ProductType value
            });
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test")
    })
})

describe("GET /api/datasets/:id_dataset/products/:id_product", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
        await ProductTest.create()
    })

    afterEach(async () =>{
        await ProductTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should get product", async() =>{
        const dataset = await DatasetTest.get()
        const product = await ProductTest.get()
        console.info(dataset.id, product.id)
        const response = await supertest(web)
            .get(`/api/datasets/${dataset.id}/products/${product.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test")
    })
})

describe("PATCH /api/datasets/:id_dataset/products/:id_product", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
        await ProductTest.create()
    })

    afterEach(async () =>{
        await ProductTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should get product", async() =>{
        const dataset = await DatasetTest.get()
        const product = await ProductTest.get()
        console.info(dataset.id, product.id)
        const response = await supertest(web)
            .patch(`/api/datasets/${dataset.id}/products/${product.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                image: "link",
                title: "test",
                description: "test",
                price: 100,
                click: 100,
                qty: 10,
                status: true,
                type: "FOOD", // Use a valid ProductType value
            });
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test")
    })
})

describe("DELETE /api/datasets/:id_dataset/products/:id_product", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
        await ProductTest.create()
    })

    afterEach(async () =>{
        await ProductTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should delete product", async() =>{
        const dataset = await DatasetTest.get()
        const product = await ProductTest.get()
        console.info(dataset.id, product.id)
        const response = await supertest(web)
            .delete(`/api/datasets/${dataset.id}/products/${product.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test")
    })
})

describe("GET /api/datasets/:id_dataset/products", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
        await ProductTest.create()
    })

    afterEach(async () =>{
        await ProductTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should search product", async() =>{
        const dataset = await DatasetTest.get()
        const response = await supertest(web)
            .get(`/api/datasets/${dataset.id}/products`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test")
    })
})