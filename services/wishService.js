const wishDao = require("../models/wishDao");
const errService = require("./errorService");

const getWish = async (userId, accommodationsId, res) => {
    return await wishDao.getWish(userId, accommodationsId);
}

const getWishList = async (userId, city, res) => {
    return await wishDao.getWishList(userId, city);
}

const getMyWishList = async (userId, res) => {
    return await wishDao.getMyWishList(userId);
}

const createWish = async (userId, accommodationsId, res) => {
    await wishDao.createWish(userId, accommodationsId);
}

const deleteWish = async (userId, accommodationsId, res) => {
    await wishDao.deleteWish(userId, accommodationsId);
}

module.exports = { getWish, getWishList, getMyWishList, createWish, deleteWish }