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

const updatePlatforms = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const updatedPlatform = await Platform.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (updatedPlatform) {
      res.json(updatedPlatform);
    } else {
      const error = new Error("Platform not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Update failed";
    next(error);
  }
};

module.exports = { getPlatforms, createPlatforms, updatePlatforms };
