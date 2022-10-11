const express = require("express");
const router = express.Router();

const messageCtrl = require("../Controllers/messages");

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

router.post("/", messageCtrl.writeMessage);
router.get("/", messageCtrl.fingAllMessage)

module.exports = router;
