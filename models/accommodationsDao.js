const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUser = async (userId) => {
    return await prisma.$queryRaw`
        select id, name from users where id = ${userId}`
}

const createAccommodations = async (userId, name, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers) => {
    await prisma.$queryRaw`
        insert into accommodations(host_id, name, description, city, location, lat, accommodations.long, build_type, room_type, charge, animal_yn, total_members) 
            values (${userId}, ${name}, ${description}, ${city}, ${location}, ${lat}, ${long}, ${buildType}, ${roomType}, ${charge}, ${animalYn}, ${totalMembers})`
}

const getAccommodations = async (userId) => {
    return await prisma.$queryRaw`
        select id from accommodations where host_id = ${userId}`
}

const createAccommodationsImg = async (accommodationsId, imageUrl) => {
    for(let i = 0; i < imageUrl.length; i++) {
        await prisma.$queryRaw`
            insert into accommodations_images(accommodations_id, image_url) values (${accommodationsId}, ${imageUrl[i]})`
    }    
}

const createConvenience = async (accommodationsId, convenienceId) => {
    for(let i = 0; i < convenienceId.length; i++) {
        await prisma.$queryRaw`
            insert into accommodation_convenience(accommodations_id, convenience_id) values (${accommodationsId}, ${convenienceId[i]})`
    }    
}

const getAccommodationsList = async (city) => {
    return await prisma.$queryRaw`
        select 
            acc.id,
            acc.name,
            acc.city,
            acc.lat,
            acc.long,
            acc.build_type,
            acc.room_type,
            acc.total_members,
            (select json_arrayagg(ct.Convenience_name) from accommodation_convenience ac join convenient ct on ac.convenience_id = ct.id where ac.accommodations_id = acc.id) convenience_name,
            (select json_arrayagg(ai.image_url) from accommodations_images ai where ai.accommodations_id = acc.id) image_url
        from accommodations acc 
        where acc.city = ${city}`
}

module.exports = { getUser, createAccommodations, getAccommodations, createAccommodationsImg, createConvenience, getAccommodationsList }