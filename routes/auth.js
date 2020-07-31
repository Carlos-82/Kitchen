const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");

const bcrypt = require("bcryptjs");
const {
    router
} = require("../app");
const bcryptSalt = 10;