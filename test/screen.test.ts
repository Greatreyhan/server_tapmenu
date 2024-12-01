import supertest from "supertest"
import { DatasetTest, ScreenTest, UserTest } from "./test-utils"
import {web} from "../src/application/web"
describe("POST /api/screens", () =>{

    beforeEach(async () =>{
        await UserTest.create()
    })

    afterEach(async () =>{
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should create new screen", async() =>{
        const response = await supertest(web)
            .post("/api/screens")
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test",
                endpoint: "test"
            })
        
        console.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("Test")
    })
})


describe("GET /api/screens/:id_screen", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
    })

    afterEach(async () =>{
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should get screen", async() =>{
        const screen = await ScreenTest.get()
        console.info(screen.id)
        const response = await supertest(web)
            .get(`/api/screens/${screen.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("Test")
    })
})

describe("PATCH /api/screens/:id_screen", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
    })

    afterEach(async () =>{
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should update screen", async() =>{
        const screen = await ScreenTest.get()
        const response = await supertest(web)
            .patch(`/api/screens/${screen.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test1",
                endpoint: "test1"
            })
        
        console.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("Test1")
    })
})

describe("DELETE /api/screens/:id_screen", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
    })

    afterEach(async () =>{
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should update screen", async() =>{
        const screen = await ScreenTest.get()
        console.info(screen.id)
        const response = await supertest(web)
            .delete(`/api/screens/${screen.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test1")
    })
})