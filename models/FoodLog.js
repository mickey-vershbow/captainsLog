const { Schema, model } = require("../db/connection");

const FoodLogSchema = new Schema(
  {
    name: String,
    date: String,
    entry: String,
    isSeasick: Boolean,
  },
  { timestamps: true }
);

const FoodLog = model("FoodLog", FoodLogSchema);

module.exports = FoodLog;
