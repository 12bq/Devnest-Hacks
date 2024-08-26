const Food = require("../models/foodModel");
const mongoose = require("mongoose");

//get all foods
const getFoods = async (req, res) => {
  const foods = await Food.find({}).sort({ createdAt: -1 });

  res.status(200).json(foods);
};

//get a single food
const getFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such food" });
  }

  const food = await Food.findById(id);

  if (!food) {
    return res.status(404).json({ error: "No such food" });
  }

  res.status(200).json(food);
};

//create a new food
const createFood = async (req, res) => {
  const { title, date } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!date) {
    emptyFields.push("date");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all of the fields", emptyFields });
  }

  //add doc to db
  try {
    const food = await Food.create({ title, date });
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a food
const deleteFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such food" });
  }

  const food = await Food.findOneAndDelete({ _id: id });

  if (!food) {
    return res.status(404).json({ error: "No such food" });
  }

  res.status(200).json(food);
};

//update a food
const updateFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such food" });
  }

  const food = await Food.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!food) {
    return res.status(404).json({ error: "No such food" });
  }

  res.status(200).json(food);
};

module.exports = {
  getFoods,
  getFood,
  createFood,
  deleteFood,
  updateFood,
};
