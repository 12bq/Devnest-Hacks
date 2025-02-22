const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);