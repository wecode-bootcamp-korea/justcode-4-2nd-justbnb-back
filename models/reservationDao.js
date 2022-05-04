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

const getReservationList = async (userId) => {
    return await prisma.$queryRaw`
        select 
            ac.id,
            ac.name,
            (select name from users where id = ar.user_id) user_name,
            DATE_FORMAT(ar.check_in, '%Y.%m.%d') check_in,
            DATE_FORMAT(ar.check_out, '%Y.%m.%d') check_out,
            ar.members,
            (ac.charge * ar.members) total_charge,
            (select json_arrayagg(ai.image_url) from accommodations_images ai where ai.accommodations_id = ac.id) image_url
        from 
        accommodations ac
        join accommodations_reservation ar
        on ac.id = ar.accommodations_id
        where ac.host_id = ${userId}        
        order by ac.id`
}

const getReservation = async (userId) => {
    return await prisma.$queryRaw`
        select 
            ac.id,
            ac.name,
            (select name from users where id = ar.user_id) user_name,
            DATE_FORMAT(ar.check_in, '%Y.%m.%d') check_in,
            DATE_FORMAT(ar.check_out, '%Y.%m.%d') check_out,
            ar.members,
            (ac.charge * ar.members) total_charge,
            (select json_arrayagg(ai.image_url) from accommodations_images ai where ai.accommodations_id = ac.id) image_url
        from 
        accommodations ac
        join accommodations_reservation ar
        on ac.id = ar.accommodations_id
        where ar.user_id = ${userId}
        order by ac.id`
}

module.exports = { createReservation, getAccommodations, getReservationList, getReservation }