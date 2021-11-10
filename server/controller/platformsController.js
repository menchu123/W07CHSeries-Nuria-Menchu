const Platform = require("../../database/models/platform");

const getPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.json(platforms);
};

const createPlatforms = async (req, res, next) => {
  try {
    const platform = req.body;
    const newPlatform = await Platform.create(platform);
    res.status(201).json(newPlatform);
  } catch (error) {
    error.code = 400;
    error.message = "Not permitted";
    next(error);
  }
};

module.exports = { getPlatforms, createPlatforms };
