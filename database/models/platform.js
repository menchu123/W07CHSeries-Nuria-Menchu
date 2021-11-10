const { Schema, model } = require("mongoose");

const platformSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Platform = model("Platform", platformSchema, "platforms");

module.exports = Platform;
