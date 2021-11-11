const express = require("express");
const { validate } = require("express-validation");

const { userLogin, userSignUp } = require("../controller/userControllers");
const {
  userLoginRequestSchema,
  userSignUpRequestSchema,
} = require("../schemas/userRequestSchemas");

const router = express.Router();

router.post("/login", validate(userLoginRequestSchema), userLogin);

router.post("/register", validate(userSignUpRequestSchema), userSignUp);

module.exports = router;
