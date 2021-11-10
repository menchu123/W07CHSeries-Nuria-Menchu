const express = require("express");
const { validate } = require("express-validation");
const {
  getPlatforms,
  createPlatforms,
  updatePlatforms,
} = require("../controller/platformsController");
const {
  createPlatformSchema,
  updatePlatformSchema,
} = require("../schemas/platformsSchema");
require("dotenv").config();

const router = express.Router();

router.get("/", getPlatforms);
router.post("/", validate(createPlatformSchema), createPlatforms);
router.put("/:idPlatform", validate(updatePlatformSchema), updatePlatforms);
router.delete("/:idPlatform");

module.exports = router;
