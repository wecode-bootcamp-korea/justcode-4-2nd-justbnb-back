const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createReservation = async (userId, accommodationsId, checkIn, checkOut, members) => {
    await prisma.$queryRaw`
        insert into accommodations_reservation(user_id, accommodations_id, check_in, check_out, members) 
            values(${userId}, ${accommodationsId}, ${checkIn}, ${checkOut}, ${members})`
}

const getAccommodations = async (accommodationsId) => {
    return await prisma.$queryRaw`
        select host_id from accommodations where id = ${accommodationsId}`
}

module.exports = { createReservation, getAccommodations }