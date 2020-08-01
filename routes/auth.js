const express = require("express");
const router = express.Router();

const User = require("../models/user");

const bcrypt = require("bcryptjs");
const { authRouter } = require("../app");
const bcryptSalt = 10;









// GET /login
router.get("/login", (req, res, next) => {
  res.render("auth/login", { errorMessage: "" });
});
// POST /login
router.post("/login", (req, res, next) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (emailInput === "" || passwordInput === "") {
    res.render("auth/login", {
      errorMessage: "Enter both email and password to log in, please!.",
    });
    return;
  }

  User.findOne({ email: emailInput }, (err, theUser) => {
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
    res.redirect("/recipes");
  });
});
module.exports = router;
