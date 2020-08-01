const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    nameRecipe: {
        type: String
    },
    typeOfCuisine: {
        type: String
    },
    dishType: {
        type: String,
        enum: [
            "breakfast",
            "main course",
            "side dish",
            "drink",
            "dessert",
            "appetizer",
            "other",
        ],
    },
    difficultyLevel: {
        type: String
    },
    numberofportions: {
        type: Number,
        min: 0
    },
    preparationTime: {
        type: Number,
        min: 0
    },
    cookingTime: {
        type: Number,
        min: 0
    },
    ingredients: {
        type: String
    },
    preparation: {
        type: String
    },
    linkToTheOriginalRecipe: {
        type: String
    },
    notes: {
        type: String
    },
    recipeImage: {
        type: String,
        default: "/models/images/jap8bits.jpg"
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
