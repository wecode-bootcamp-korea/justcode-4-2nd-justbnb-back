const { PrismaClient, Prisma } = require("@prisma/client");

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
            (select json_arrayagg(ct.convenience_name) from accommodation_convenience ac join convenience ct on ac.convenience_id = ct.id where ac.accommodations_id = acc.id) convenience_name,
            (select json_arrayagg(ai.image_url) from accommodations_images ai where ai.accommodations_id = acc.id) image_url
        from accommodations acc 
        ${city === 'all' ? 
            Prisma.empty : Prisma.sql`where acc.city = ${city}`}`
}

const getAccommodationsInfo = async (id) => {
    return await prisma.$queryRaw`
        select 
            acc.id,
            ur.name host_name,
            acc.name accommodations_name,
            description,
            acc.city,
            acc.location,
            SUBSTRING_INDEX(acc.location, ' ', 1) district,
            SUBSTRING_INDEX(SUBSTRING_INDEX(acc.location, ' ', 2), ' ', -1) neighborhood,
            acc.location,
            acc.lat,
            acc.long,
            acc.build_type,
            acc.room_type,
            acc.animal_yn,
            acc.charge,
            acc.total_members
        from accommodations acc
        join users ur
        on acc.host_id = ur.id
        where acc.id = ${id}`
}

const getAccommodationsImages = async (accommodationsId) => {
    return await prisma.$queryRaw`
        select 
            json_arrayagg(image_url) image_url
        from accommodations_images
        where accommodations_id = ${accommodationsId}`
}

const getAccommodationsConvenience = async (accommodationsId) => {
    return await prisma.$queryRaw`
        select 
            json_arrayagg(convenience_name) convenience_name
        from accommodation_convenience ac
        join convenience ct
        on ac.convenience_id = ct.id
        where ac.accommodations_id = ${accommodationsId}`
}

module.exports = { 
    getUser, 
    createAccommodations, 
    getAccommodations, 
    createAccommodationsImg, 
    createConvenience, 
    getAccommodationsList, 
    getAccommodationsInfo, 
    getAccommodationsImages, 
    getAccommodationsConvenience 
}