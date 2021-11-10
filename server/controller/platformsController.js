const Platform = require("../../database/models/platform");

const getPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.json(platforms);
};

const createPlatforms = async (req, res, next) => {
  try {
    const newPlatform = await Platform.create(req.body);
    res.json(newPlatform);
  } catch (error) {
    error.code = 400;
    error.message = "Not permitted";
    next(error);
  }
};

module.exports = { getPlatforms, createPlatforms };
