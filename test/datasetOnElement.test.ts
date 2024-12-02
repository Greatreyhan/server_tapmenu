import supertest from "supertest"
import { DatasetOnElementTest, DatasetTest, ElementTest, PageTest, ScreenTest, UserTest } from "./test-utils"
import {web} from "../src/application/web"

describe("POST /api/dataset-element", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
        await ScreenTest.create()
        await PageTest.create()
        await ElementTest.create()
    })

    afterEach(async () =>{
        await DatasetOnElementTest.delete()
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should create new relation between dataset and element", async() =>{
        const dataset = await DatasetTest.get()
        const element = await ElementTest.get()
        const page = await PageTest.get()
        console.log(dataset.id, element.id, page.id)
        const response = await supertest(web)
            .post("/api/dataset-element")
            .set("X-API-TOKEN", "test")
            .send({
                id_page : page.id,
                id_element : element.id,
                id_dataset: dataset.id
            })
        expect(response.status).toBe(200)
    })
})

describe("POST /api/datasetonelement", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
        await ScreenTest.create()
        await PageTest.create()
        await ElementTest.create()
        await DatasetOnElementTest.create()

    })

    afterEach(async () =>{
        await DatasetOnElementTest.delete()
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should create get relation between dataset and element", async() =>{
        const dataset = await DatasetTest.get()
        const element = await ElementTest.get()
        const response = await supertest(web)
            .get(`/api/dataset-element/${dataset.id}/${element.id}`)
            .set("X-API-TOKEN", "test")
        console.log(dataset.id, element.id)
        console.log(response.body)

        expect(response.status).toBe(200)
    })
})

describe("GET /api/dataset-element/", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
        await ScreenTest.create()
        await PageTest.create()
        await ElementTest.create()
        await DatasetOnElementTest.create()

    })

    afterEach(async () =>{
        await DatasetOnElementTest.delete()
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should create get relation between dataset and element", async() =>{
        const dataset = await DatasetTest.get()
        const response = await supertest(web)
            .get(`/api/on-dataset/${dataset.id}`)
            .set("X-API-TOKEN", "test")

        console.log(response.body)

        expect(response.status).toBe(200)
    })
})

describe("GET /api/dataset-element/", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
        await ScreenTest.create()
        await PageTest.create()
        await ElementTest.create()
        await DatasetOnElementTest.create()

    })

    afterEach(async () =>{
        await DatasetOnElementTest.delete()
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should create get relation between dataset and element", async() =>{
        const element = await ElementTest.get()
        const response = await supertest(web)
            .get(`/api/on-element/${element.id}`)
            .set("X-API-TOKEN", "test")
            
        console.log(response.body)

        expect(response.status).toBe(200)
    })
})


describe("DELETE /api/dataset-element/", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await DatasetTest.create()
        await ScreenTest.create()
        await PageTest.create()
        await ElementTest.create()
        await DatasetOnElementTest.create()

    })

    afterEach(async () =>{
        await DatasetOnElementTest.delete()
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await DatasetTest.delete()
        await UserTest.delete()
    })

    it("Should create get relation between dataset and element", async() =>{
        const element = await ElementTest.get()
        const dataset = await DatasetTest.get()
        const response = await supertest(web)
            .delete(`/api/dataset-element/${dataset.id}/${element.id}`)
            .set("X-API-TOKEN", "test")
        console.log(dataset.id,element.id)
        console.log(response.body)

        expect(response.status).toBe(200)
    })
})
