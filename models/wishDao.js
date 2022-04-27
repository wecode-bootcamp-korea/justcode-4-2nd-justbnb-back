const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const getWish = async (userId, accommodationsId) => {
    return await prisma.$queryRaw`
        select 
            ifnull((select REPLACE(user_id, user_id, 'Y') from wish_list where user_id = ur.id and accommodations_id = ${accommodationsId}), 'N') wish_yn
        from users ur
        where ur.id = ${userId}`
}

const getWishList = async (userId, city) => {
    return await prisma.$queryRaw`
        select 
            ac.id,
            ifnull((select REPLACE(user_id, user_id, 'Y') from wish_list where accommodations_id = ac.id and user_id = ${userId}), 'N') wish_yn
        from accommodations ac
        where 1=1
        ${city === 'all' ? Prisma.empty : Prisma.sql`and acc.city = ${city}`}`
}

const getMyWishList = async (userId) => {
    return await prisma.$queryRaw`
        select
            ac.id,
            ac.name accommodations_name,
            json_arrayagg(ai.image_url) image_url
        from accommodations ac
        join wish_list wl
        on ac.id = wl.accommodations_id
        join accommodations_images ai
        on ai.accommodations_id = wl.accommodations_id
        where wl.user_id = ${userId}
        group by ac.id`
}

const createWish = async (userId, accommodationsId) => {
    await prisma.$queryRaw`
        insert into wish_list(user_id, accommodations_id) values(${userId}, ${accommodationsId})`
}

const deleteWish = async (userId, accommodationsId) => {
    await prisma.$queryRaw`
        delete from wish_list where user_id = ${userId} and accommodations_id = ${accommodationsId}`
}

module.exports = { getWish, getWishList, getMyWishList, createWish, deleteWish }