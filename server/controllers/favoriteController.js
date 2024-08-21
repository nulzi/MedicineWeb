const { StatusCodes } = require("http-status-codes");
const query = require("../config/db");
const CustomError = require("../utils/CustomError");

const getFavorites = async (req, res) => { };

const addFavorite = async (req, res, next) => {
  try {
    const itemSeq = Number(req.params.drugId);
    const { userId } = req.user;

    let sql = 'select * from Favorites where userId = ? and drugId = ?';
    const values = [userId, itemSeq];
    let results = await query(sql, values);

    if (results.length !== 0) {
      throw new Error('Already Added to favorites.');
    }

    sql = 'insert into Favorites (userId, drugId) values (?)';
    results = await query(sql, [values]);

    return res.status(StatusCodes.OK).end();
  } catch (error) {
    let statusCode;

    if (error.message === "Already Added to favorites.") {
      statusCode = StatusCodes.CONFLICT;
    }

    return next(new CustomError(error.message, statusCode));
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const itemSeq = Number(req.params.drugId);
    const { userId } = req.user;

    let sql = 'select * from Favorites where userId = ? and drugId = ?';
    const values = [userId, itemSeq];
    let results = await query(sql, values);

    if (results.length === 0) {
      throw new Error('No favorites to remove.');
    }

    sql = 'delete from Favorites where favoriteId = ?';
    const value = results[0].favoriteId;
    results = await query(sql, value);

    return res.status(StatusCodes.OK).end();
  } catch (error) {
    let statusCode;

    if (error.message === "No favorites to remove.") {
      statusCode = StatusCodes.NOT_FOUND;
    }

    return next(new CustomError(error.message, statusCode));
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
