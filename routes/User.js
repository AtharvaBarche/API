const express = require('express');
const router = express.Router();

const controller = require("../controllers/UserController");

router.get("/",controller.getUser);
router.get("/profile:id", userController.getUserById);
router.post("/login",controller.login);
router.post("register",controller.register);
router.delete("/profile:id", controller.deletePost);
module.exports = router;