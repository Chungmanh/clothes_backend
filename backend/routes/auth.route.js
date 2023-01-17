const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const middleware = require("../middlewarea/middlewareController");

router.post("/register", function (req, res) {
  authController.registerUser(req, res);
});

router.post("/login", function (req, res) {
  authController.loginUser(req, res);
});
// router.post("/register", authController.registerUser(req, res));
module.exports = router;
