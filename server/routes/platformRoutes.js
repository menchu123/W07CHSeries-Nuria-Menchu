const express = require("express");
const {
  getPlatforms,
  createPlatforms,
  updatePlatforms,
} = require("../controller/platformsController");
require("dotenv").config();

const router = express.Router();

router.get("/", getPlatforms);
router.post("/", createPlatforms);
router.put("/:idPlatform", updatePlatforms);
router.delete("/:idPlatform");

module.exports = router;
