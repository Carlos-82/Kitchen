const express = require("express");
const recipesRouter = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");
recipesRouter.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("login")
    }
})
recipesRouter.get("/recipes", async (req, res, next) => {
    const userId = req.session.currentUser._id;
    const recipes = await User.findOne({
            "_id": userId
        })
        .populate("recipe")
    res.render("recipes/mainpage", {
        recipes
    });
});
recipesRouter.get("/addrecipe",(req,res,next,) => {
    res.render("recipes/create");
});
recipesRouter.post("/addrecipe",(req,res,next,) => {
    const createdRecipe = {nameRecipe:req.body.nameRecipe,
    typeOfCuisine:req.body.typeOfCuisine,
    dishType:req.body.dishType,
    difficultyLevel:req.body.difficultyLevel,
    numberOfPortions:req.body.numberOfPortions,
    preparationTime:req.body.preparationTime,
    cookingTime:req.body.cookingTime,
    ingredients:req.body.ingredients,
    preparation:req.body.preparation,
    linktoTheOriginalRecipe:req.body.linkToTheOriginalRecipe,
    notes:req.body.notes,
    recipeImage:req.body.recipeImage,
    };
    const userId = req.session.currentUser._id;
    const theRecipe = new Recipe(createdRecipe);
    theRecipe.save((error) => {
        if(error){next(error);return;

        }User.findOneAndUpdate({ "_id": userId}, { $push: { recipe: recipe.id } }, { new: true })      
        .then((user) => {
            res.redirect("recipes/mainpage")
        })
        .catch((error) => {
            console.log(error);
        })
    });


    }); 

module.exports=recipesRouter;
