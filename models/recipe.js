const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    nameRecipe: String,
    typeOfCuisine: String,
    dishType: String,
    enum: ["breakfast", "main dish",
        "side dish", "drink", "dessert", "appetizer"
    ],
    difftultyLevel: String,
    numberofportions: Number,
    preparationTime: String,
    cookingTime: Number,
    ingredients: [String],
    preparation: String,
    linkToTheOriginalRecipe: String,
    notes: String,
    recipeImage: String,
});




const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;