const Platform = require("../../database/models/platform");

const getPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.json(platforms);
};

const createPlatforms = async (req, res, next) => {
  const { admin } = req.userInfo;
  if (!admin) {
    const error = new Error("You wish");
    error.code = 401;
    next(error);
  } else {
    const newPlatform = await Platform.create(req.body);
    res.json(newPlatform);
  }
};

const updatePlatforms = async (req, res, next) => {
  const { admin } = req.userInfo;
  if (!admin) {
    const error = new Error("You wish");
    error.code = 401;
    next(error);
  } else {
    const { idPlatform } = req.params;
    const updatedPlatform = await Platform.findByIdAndUpdate(
      idPlatform,
      req.body,
      {
        new: true,
      }
    );
    if (updatedPlatform) {
      res.json(updatedPlatform);
    } else {
      const error = new Error("Platform not found");
      error.code = 404;
      next(error);
    }
  }
};

const deletePlatforms = async (req, res, next) => {
  const { admin } = req.userInfo;
  if (!admin) {
    const error = new Error("You wish");
    error.code = 401;
    next(error);
  } else {
    try {
      const { idPlatform } = req.params;
      const deletedPlatform = await Platform.findByIdAndDelete(idPlatform);
      if (deletedPlatform) {
        res.json(deletePlatforms);
      } else {
        const error = new Error("Not found");
        error.code = 404;
        next(error);
      }
    } catch (error) {
      error.code = 400;
      error.message = "Cannot delete sorry :(";
      next(error);
    }
  }
};

module.exports = {
  getPlatforms,
  createPlatforms,
  updatePlatforms,
  deletePlatforms,
};
