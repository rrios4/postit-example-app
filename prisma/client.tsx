import { PrismaClient } from "@prisma/client";

declare global {
    namespace NodeJS {
        interface Global {}
    }
}
//  Add prisma to the nodejs global type
interface CustomNodeJsGlobal extends NodeJS.Global {
    prisma: PrismaClient
}

// Prevent multiple intances of prisma client in development
declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "development") global.prisma = prisma

export default prisma