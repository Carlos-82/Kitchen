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
            errorMessage: "Indicate a valid User Name, Email and/or Password"
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
                    res.redirect("/mainpage");
                })
                .catch((error) => {
                    console.log(error)
                });
        })

        .catch((error) => {
            next(error);
        })
});

// GET login
authRouter.get("/login", (req, res, next) => {
    res.render("auth/login", {
        errorMessage: ""
    });
});

// POST /login
authRouter.post("/login", (req, res, next) => {
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
    if (emailInput === "" || passwordInput === "") {
        res.render("auth/login", {
            errorMessage: "Enter both email and password to log in, please!.",
        });
        return;
    }
    User.findOne({
        email: emailInput
    }, (err, theUser) => {
        if (err || theUser === null) {
            res.render("auth/login", {
                errorMessage: `Uuups! There isn't an account with email ${emailInput}.`,
            });
            return;
        }
        if (!bcrypt.compareSync(passwordInput, theUser.password)) {
            res.render("auth/login", {
                errorMessage: "Invalid password. We are so sorry",
            });
            return;
        }
        req.session.currentUser = theUser;
        res.redirect("/mainpage");
    });

});

authRouter.get('/logout', (req, res, next) => {
    if (!req.session.current) {
        res.redirect('/');
        return
    }
    req.session.destroy((err) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect('/');
    })
})

module.exports = authRouter;