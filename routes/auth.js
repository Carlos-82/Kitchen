const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");

const bcrypt = require("bcryptjs");
const {
    router
} = require("../app");
const bcryptSalt = 10;

//renderiza el formulario signup
authRouter.get("/signup", (req, res, next) => {
    res.render("auth/signup", {
        errorMessage: "",
    });
});

//Post
authRouter.post("/signup", (req, res, next) => {
    const {
        userName,
        email,
        password
    } = req.body;
    if (userName === "" || email === "" || password === "") {
        res.render("auth/signup", {
            errorMessage: "Indicates a valid User Name, Email and/or Password"
        })
        return
    }

    User.findOne({
            email
        })
        .then((foundEmail) => {
            if (foundEmail) {
                res.render("auth/signup", {
                    errorMessage: "The email already exists"
                });
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);

            User.create({
                    userName,
                    email,
                    password: hashPass
                })
                .then(() => {
                    res.redirect("/");
                })
                .catch((error) => {
                    console.log(error)
                });
        })

        .catch((error) => {
            next(error);
        })
})



module.exports = authRouter;