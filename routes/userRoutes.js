const express = require("express");
const { model } = require("mongoose");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");  // Import validateToken middleware

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser );

router.get("/current", validateToken, currentUser);

module.exports = router;


