import supertest from "supertest"
import { DatasetTest, UserTest } from "./test-utils"
import {web} from "../src/application/web"
describe("POST /api/datasets", () =>{

    beforeEach(async () =>{
        await UserTest.create()
    })

    afterEach(async () =>{
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should create new dataset", async() =>{
        const response = await supertest(web)
            .post("/api/datasets")
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test"
            })
        
        console.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("Test")
    })
})


describe("GET /api/datasets/:id_dataset", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
    })

    afterEach(async () =>{
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should get dataset", async() =>{
        const dataset = await DatasetTest.get()
        console.info(dataset.id)
        const response = await supertest(web)
            .get(`/api/datasets/${dataset.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("Test")
    })
})

describe("PATCH /api/datasets/:id_dataset", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
    })

    afterEach(async () =>{
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should update dataset", async() =>{
        const dataset = await DatasetTest.get()
        console.info(dataset.id)
        const response = await supertest(web)
            .patch(`/api/datasets/${dataset.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test1"
            })
        
        console.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("Test1")
    })
})

describe("DELETE /api/datasets/:id_dataset", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
    })

    afterEach(async () =>{
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should update dataset", async() =>{
        const dataset = await DatasetTest.get()
        console.info(dataset.id)
        const response = await supertest(web)
            .delete(`/api/datasets/${dataset.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test1")
    })
})

describe("GET /api/datasets", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
    })

    afterEach(async () =>{
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should search dataset", async() =>{
        const response = await supertest(web)
            .get(`/api/datasets`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
    })
})