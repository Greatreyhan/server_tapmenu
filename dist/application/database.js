"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
exports.prismaClient = new client_1.PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});
exports.prismaClient.$on("error", (e) => {
    console.info(e);
});
// prismaClient.$on("warn", (e)=>{
//     logger.error(e)
// })
// prismaClient.$on("info", (e)=>{
//     logger.error(e)
// })
// prismaClient.$on("query", (e)=>{
//     logger.error(e)
// })
