import supertest from "supertest"
import { DatasetTest, ElementTest, PageTest, ProductTest, ScreenTest, UserTest } from "./test-utils"
import {web} from "../src/application/web"
describe("POST /api/screens/:id_screen(\\d+)/pages", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
        await PageTest.create()
    })

    afterEach(async () =>{
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should create new Element", async () => {
        const screen = await ScreenTest.get();
        const page = await PageTest.get();
        const response = await supertest(web)
            .post(`/api/screens/${screen.id}/pages/${page.id}/elements`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test",
                type: "test"
            });
        
        console.info(response.body)
        expect(response.status).toBe(200)
    })
})


describe("GET /api/screens/:id_screen(\\d+)/pages", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
        await PageTest.create()
        await ElementTest.create()
    })

    afterEach(async () =>{
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should get Element", async () => {
        const screen = await ScreenTest.get();
        const page = await PageTest.get();
        const element = await ElementTest.get();
        const response = await supertest(web)
            .get(`/api/screens/${screen.id}/pages/${page.id}/elements/${element.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
    })
})

describe("PATCH /api/screens/:id_screen(\\d+)/pages", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
        await PageTest.create()
        await ElementTest.create()
    })

    afterEach(async () =>{
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should update Element", async () => {
        const screen = await ScreenTest.get();
        const page = await PageTest.get();
        const element = await ElementTest.get();
        const response = await supertest(web)
            .patch(`/api/screens/${screen.id}/pages/${page.id}/elements/${element.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test1",
                type: "test1"
            });
        
        console.info(response.body)
        expect(response.status).toBe(200)
    })
})

describe("DELETE /api/screens/:id_screen(\\d+)/pages", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
        await PageTest.create()
        await ElementTest.create()
    })

    afterEach(async () =>{
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should delete Element", async () => {
        const screen = await ScreenTest.get();
        const page = await PageTest.get();
        const element = await ElementTest.get();
        const response = await supertest(web)
            .delete(`/api/screens/${screen.id}/pages/${page.id}/elements/${element.id}`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
    })
})

describe("GET /api/screens/:id_screen(\\d+)/pages", () =>{

    beforeEach(async () =>{
        await UserTest.create()
        await ScreenTest.create()
        await PageTest.create()
        await ElementTest.create()
    })

    afterEach(async () =>{
        await ElementTest.delete()
        await PageTest.delete()
        await ScreenTest.delete()
        await UserTest.delete()
    })

    it("Should get list Element", async () => {
        const screen = await ScreenTest.get();
        const page = await PageTest.get();
        const response = await supertest(web)
            .get(`/api/screens/${screen.id}/pages/${page.id}/elements`)
            .set("X-API-TOKEN", "test")
        
        console.info(response.body)
        expect(response.status).toBe(200)
    })
})