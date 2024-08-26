const express = require("express");
const {
    getFoods,
    getFood,
    createFood,
    deleteFood,
    updateFood,
} = require('../controllers/foodController')

const router = express.Router();

//get all food
router.get("/", getFoods);

//get a single food
router.get("/:id", getFood);

//post a new food
router.post("/", createFood);

//delete a food
router.delete("/:id", deleteFood);

//update a food
router.patch("/:id", updateFood);

module.exports = router;