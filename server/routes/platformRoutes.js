require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const {
  getPlatforms,
  createPlatforms,
  updatePlatforms,
  deletePlatforms,
} = require("../controller/platformsController");
const {
  createPlatformSchema,
  updatePlatformSchema,
} = require("../schemas/platformsSchema");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getPlatforms);
router.post("/", validate(createPlatformSchema), auth, createPlatforms);
router.put(
  "/:idPlatform",
  validate(updatePlatformSchema),
  auth,
  updatePlatforms
);
router.delete("/:idPlatform", auth, deletePlatforms);

module.exports = router;
