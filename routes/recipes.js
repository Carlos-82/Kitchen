const express = require("express");
const recipesRouter = express.Router();

const User = require("../models/user");
const Recipe = require("../models/recipe");

recipesRouter.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("/login")
    }
})

recipesRouter.get("/recipes", async (req, res, next) => {
    const userId = req.session.currentUser._id;

    const recipes = await User.findOne({
            "_id": userId
        })
        .populate("recipe")
    res.render("recipes", {
        recipes
    });
})

module.exports = recipesRouter;