const express = require("express");

const router = express.Router();

const { getAllUser,getUser ,signup,login,} = require("../controllers/user-controller");



router.get("/user", getAllUser);

router.get("/user/:id", getUser);

router.post("/auth/signup", signup);

router.post("/api/login",login);

module.exports = router;