const User = require("../../database/models/user");
const bcrypt = require("bcrypt");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    debug(chalk.redBright("Wrong credentials"));
    const error = new Error("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      debug(chalk.redBright("Eeeeek Wrong password"));
      const error = new Error("Eeeeek Wrong password");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 72 * 60 * 60,
        }
      );
      res.json({ token });
    }
  }
};

// const createUser = async () => {
//   const user = User.create({
//     name: "Admin",
//     username: "admin",
//     password: await bcrypt.hash("adminbb", 10),
//     admin: true,
//     series: [],
//   });
// };
