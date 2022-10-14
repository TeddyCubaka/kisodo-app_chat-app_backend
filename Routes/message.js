const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

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

router.get("/", auth, messageCtrl.fingAllMessage);
router.post("/", auth, messageCtrl.writeMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);

module.exports = router;
