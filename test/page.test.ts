import supertest from "supertest"
import { DatasetTest, PageTest, ProductTest, ScreenTest, UserTest } from "./test-utils"
import {web} from "../src/application/web"
describe("POST /api/screens/:id_screen(\\d+)/pages", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
    })

    afterEach(async () =>{
        await PageTest.delete()
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should create new Page", async () => {
        const screen = await ScreenTest.get();
        const response = await supertest(web)
            .post(`/api/screens/${screen.id}/pages`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test",
                endpoint: "test"
            });
        
        console.info(response.body)
        expect(response.status).toBe(200)
    })
})

describe("GET /api/screens/:id_screen(\\d+)/pages/:id_pages(\\d+)", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
        await PageTest.create()
    })

    afterEach(async () =>{
        await PageTest.delete()
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should get page", async() =>{
        const screen = await ScreenTest.get()
        const page = await PageTest.get()
        console.info(screen.id, page.id)
        const response = await supertest(web)
            .get(`/api/screens/${screen.id}/pages/${page.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test")
    })
})

describe("PATCH /api/screens/:id_screen(\\d+)/pages/:id_pages(\\d+)", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
        await PageTest.create()
    })

    afterEach(async () =>{
        await PageTest.delete()
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should get page", async() =>{
        const screen = await ScreenTest.get()
        const page = await PageTest.get()
        console.info(screen.id, page.id)
        const response = await supertest(web)
            .patch(`/api/screens/${screen.id}/pages/${page.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test1",
                endpoint: "test1"
            });
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test")
    })
})

describe("DELETE /api/screens/:id_screen(\\d+)/pages/:id_pages(\\d+)t", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
        await PageTest.create()
    })

    afterEach(async () =>{
        await PageTest.delete()
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should delete page", async() =>{
        const screen = await ScreenTest.get()
        const page = await PageTest.get()
        console.info(screen.id, page.id)
        const response = await supertest(web)
            .delete(`/api/screens/${screen.id}/pages/${page.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
        // expect(response.body.data.name).toBe("Test")
    })
})

