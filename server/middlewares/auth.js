const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new Error("Not authorized");
    error.code = 401;
    next(error);
  } else {
    const [, token] = authHeader.split(" ");

    if (!token) {
      const error = new Error("Token is missing");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = await jwt.verify(token, process.env.SECRET);
        req.userId = user.id;
        next();
      } catch (error) {
        error.message = "Token no valid";
        next(error);
      }
    }
  }
};

module.exports = auth;
