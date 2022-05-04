const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const getUser = async (email) => {
    return await prisma.$queryRaw`
        select id, password from users where email = ${email}`
}

const createUser = async (name, email, password) => {
    await prisma.$queryRaw`
        insert into users(name, email${!!password ? Prisma.sql`, password` : Prisma.empty}) values (${name}, ${email}${!!password ? Prisma.sql`, ${password}` : Prisma.empty})`
}

module.exports = { getUser, createUser }