const express = require("express");
const router = express.Router();

const userCtrl = require("../Controllers/user");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

router.post("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);
router.post("/:id", userCtrl.updateUser);
router.get("/", userCtrl.getAllUsers);

module.exports = router;
