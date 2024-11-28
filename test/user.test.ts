import supertest from "supertest"
import {web} from "../src/application/web"
import { logger } from "../src/application/logging";
describe('POST /api/users', () =>{
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
                email: "joinreyhan@gmail.com",
                username: "reyhan",
                password: "12345678"
            });
        
        console.info(response.body)
        // expect(response.status).toBe(400)
        // expect(response.body.status).toBe("Error")
    })
})