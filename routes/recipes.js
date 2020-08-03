const express = require("express");
const recipesRouter = express.Router();

const User = require("../models/user");
const Recipe = require("../models/recipe");
const parser = require("./../config/cloudinary");

//middleware
recipesRouter.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("/login");
    }
});

recipesRouter.get("/mainpage", async (req, res, next) => {
    console.log("entramos en la ruta")
    const userId = req.session.currentUser._id;
    try {
        const user = await User.findOne({
                _id: userId
            })
            .populate("recipesId");
        console.log("informacion del usuario", user)
        res.render("recipes/mainpage", {
            user
        });
    } catch (error) {
        next(error)
    }

});

recipesRouter.get("/create", (req, res, next) => {
    res.render("recipes/create");
});

recipesRouter.post("/create", parser.single("foodimage"), (req, res, next) => {
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
        linkToTheOriginalRecipe: req.body.linkToTheOriginalRecipe,
        notes: req.body.notes,
        recipeImage: req.file.secure_url,
        userId: req.session.currentUser._id
    };

    const userId = req.session.currentUser._id;
    const theRecipe = new Recipe(createdRecipe);
    theRecipe.save()
        .then(recipeCreated => {
            return User.updateOne({
                _id: userId,
            }, {
                $push: {
                    recipesId: recipeCreated._id
                },
            }, {
                new: true,
            })
        })
        .then((recipe) => {
            res.redirect("/mainpage");
        })
        .catch((error) => {
            console.log(error);
        });

});
//route to detailrecipe
recipesRouter.get("/detailrecipe/:recipeId", (req, res, next) => {
    const recipeId = req.params.recipeId;
    Recipe.findById(recipeId)
        .then(recipe => {
            console.log(recipe)
            res.render("recipes/detailrecipe", {
                recipe
            })
        })
        .catch((error) => {
            console.log(error);

        })
});

recipesRouter.get("/detailrecipe/:recipeId/editrecipe", (req, res, next) => {
    const recipeId = req.params.recipeId;
    Recipe.findById(recipeId)
        .then(recipe => {
            console.log(recipe)
            res.render("recipes/editrecipe", {
                recipe
            })
        })
        .catch((error) => {
            console.log(error);
        })
});
recipesRouter.post("/detailrecipe/:recipeId/editrecipe", parser.single("foodimage"), (req, res, next) => {
    const recipeId = req.params.recipeId;
    const editedRecipe = {
        nameRecipe: req.body.nameRecipe,
        typeOfCuisine: req.body.typeOfCuisine,
        dishType: req.body.dishType,
        difficultyLevel: req.body.difficultyLevel,
        numberOfPortions: req.body.numberOfPortions,
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
        ingredients: req.body.ingredients,
        method: req.body.method,
        linkToTheOriginalRecipe: req.body.linkToTheOriginalRecipe,
        notes: req.body.notes,
        recipeImage: req.file.secure_url,
        userId: req.session.currentUser._id
    };
    Recipe.findByIdAndUpdate(recipeId, editedRecipe, {
            new: true
        })
        .then(recipe => {
            console.log("Hola", recipe)
            res.redirect(`/detailrecipe/${recipeId}`)
        })
        .catch(error => {
            console.log(error)
        })

});

//delete route
recipesRouter.get("/detailrecipe/:recipeId/delete", (req, res, next) => {
    const recipeId = req.params.recipeId
    console.log(recipeId)
    Recipe.findByIdAndDelete(recipeId)
        .then(recipe => console.log("The following Personal challenge has been deleted: " + recipe))
        .catch(err => console.log("error while finding and deleting the personal challenge: " + err))

    console.log("previusly user: " + req.session.currentUser)

    User.findByIdAndUpdate({
            "_id": req.session.currentUser._id
        }, {
            $pull: {
                recipesId: recipeId
            }
        })
        .then(() => res.render("recipes/mainpage"))
        .catch(err => console.log("error while deleting a personal challenge from DB: " + err))
})






//route to user profile
recipesRouter.get("/profile", async (req, res, next) => {
    const userId = req.session.currentUser._id;

    const recipes = await User.findOne({
        _id: userId,
    });
    res.render("recipes/profile", {
        recipes,
    });
});

recipesRouter.get("/editprofile", (req, res, next) => {
    const id = req.session.currentUser;

    User.findById(id).then((user) => res.render("recipes/editprofile", {
        user
    }));
});

recipesRouter.post(
    "/editprofile",
    parser.single("userImage"),
    (req, res, next) => {
        const id = req.session.currentUser._id;
        console.log(req.file)
        const modifications = {
            userName: req.body.userName,
            name: req.body.name,
            email: req.body.email,
            aboutMe: req.body.aboutMe,
            userImage: req.file.secure_url
        };
        console.log("modificaciones", modifications)


        User.findByIdAndUpdate(
            id, modifications, {
                new: true
            }).then((user) => {
            req.session.currentUser = user
            res.redirect("profile");
        });
    }
);


module.exports = recipesRouter;