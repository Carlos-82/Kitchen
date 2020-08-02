const express = require("express");
const recipesRouter = express.Router();

const User = require("../models/user");
const Recipe = require("../models/recipe");
const parser = require("./../config/cloudinary");
const {
    get
} = require("mongoose");


recipesRouter.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("/login")
    }
})

recipesRouter.get("/mainpage", async (req, res, next) => {
    const userId = req.session.currentUser._id;

    const recipes = await User.findOne({
            "_id": userId
        })
        .populate("recipe")
    res.render("recipes/mainpage", {
        recipes
    });
})

recipesRouter.get("/create", (req, res, next) => {
    res.render("recipes/create");
});

recipesRouter.post("/create", parser.single('foodimage'), (req, res, next, ) => {
    const createdRecipe = {
        nameRecipe: req.body.nameRecipe,
        typeOfCuisine: req.body.typeOfCuisine,
        dishType: req.body.dishType,
        difficultyLevel: req.body.difficultyLevel,
        numberOfPortions: req.body.numberOfPortions,
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
        ingredients: req.body.ingredients,
        method: req.body.method,
        linktoTheOriginalRecipe: req.body.linkToTheOriginalRecipe,
        notes: req.body.notes,
        recipeImage: req.file.secure_url,
    };
    const userId = req.session.currentUser._id;
    const theRecipe = new Recipe(createdRecipe);
    theRecipe.save((error) => {
        if (error) {
            next(error);
            return;
        }
        User.update({
                userId
            }, {
                $push: {
                    theRecipe: createdRecipe.id
                }
            }, {
                new: true
            })
            .then((user) => {
                res.redirect("mainpage")
            })
            .catch((error) => {
                console.log(error);
            })
    });
});



recipesRouter.get("/userprofile", (req, res, next) => {
    const userId = req.session.currentUser._id;
    res.render("recipes/profile")
})



module.exports = recipesRouter;