const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: false,
  },
  series: {
    type: [Types.ObjectId],
    ref: "Serie",
    required: true,
  },
});

const User = model("User", userSchema, "users");

module.exports = User;
