import supertest from "supertest"
import {web} from "../src/application/web"
import { logger } from "../src/application/logging";
import { UserTest } from "./test-utils";

describe('POST /api/users', () =>{

    afterEach(async () =>{
        await UserTest.delete();
    })

    it("Should reject register new user as request is invalid",async()=>{
        const response = await supertest(web)
            .post("/api/users")
            .send({
                email: "",
                username: "",
                password: ""
            });
        
        console.info(response.body)
        expect(response.status).toBe(400)
        expect(response.body.status).toBe("Error")
    })

    it("Should register new user as request is valid",async()=>{
        const response = await supertest(web)
            .post("/api/users")
            .send({
                email: "test@gmail.com",
                username: "test",
                password: "test"
            });
        
        console.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe("OK")
    })
})

describe('POST /api/login', () =>{

    afterEach(async () =>{
        await UserTest.delete();
    })

    beforeEach(async ()=>{
        await UserTest.create();
    })

    it("Should not login with invalid input",async()=>{
        const response = await supertest(web)
            .post("/api/login")
            .send({
                email: "",
                password: ""
            });
        
        expect(response.status).toBe(400)
        expect(response.body.status).toBe("Error")
    })

    it("Should login with test user",async()=>{
        const response = await supertest(web)
            .post("/api/login")
            .send({
                email: "test@gmail.com",
                password: "test"
            });
        
        console.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe("OK")
    })

})

describe('GET /api/users', () =>{

    afterEach(async () =>{
        await UserTest.delete();
    })

    beforeEach(async ()=>{
        await UserTest.create();
    })

    it("Should get User Data",async()=>{
        const response = await supertest(web)
            .get("/api/users")
            .set("X-API-TOKEN", "test");
        
        console.info(response)
        expect(response.status).toBe(200)
    })

})

describe('PATCH /api/users', () =>{

    afterEach(async () =>{
        await UserTest.delete();
    })

    beforeEach(async ()=>{
        await UserTest.create();
    })

    it("Should update User Data",async()=>{
        const response = await supertest(web)
            .patch("/api/users")
            .set("X-API-TOKEN", "test")
            .send({
                username: "test",
                password: "test"
            });
        
        console.info(response)
        expect(response.status).toBe(200)
    })

    it("Should not update User Data",async()=>{
        const response = await supertest(web)
            .patch("/api/users")
            .set("X-API-TOKEN", "test")
            .send({
                username: "",
                password: ""
            });
        
        console.info(response)
        expect(response.status).toBe(400)
    })

    it("Should not update User Data",async()=>{
        const response = await supertest(web)
            .patch("/api/users")
            .set("X-API-TOKEN", "")
            .send({
                username: "test",
                password: "test"
            });
        
        console.info(response)
        expect(response.status).toBe(401)
    })

})


describe('PATCH /api/users', () =>{

    afterEach(async () =>{
        await UserTest.delete();
    })

    beforeEach(async ()=>{
        await UserTest.create();
    })

    it("Should be to Logout User Data",async()=>{
        const response = await supertest(web)
            .delete("/api/users")
            .set("X-API-TOKEN", "test")

        
        console.info(response)
        expect(response.status).toBe(200)
    })

    it("Should be to Logout User Data",async()=>{
        const response = await supertest(web)
            .delete("/api/users")
            .set("X-API-TOKEN", "")

        
        console.info(response)
        expect(response.status).toBe(401)
    })
})


