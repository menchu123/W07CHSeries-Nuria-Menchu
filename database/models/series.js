const { Schema, model, Types } = require("mongoose");

const seriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  viewed: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    max: 10,
    min: 0,
  },
  platform: {
    type: String,
    required: true,
  },
});

const Serie = model("Serie", seriesSchema, "series");

module.exports = Serie;
