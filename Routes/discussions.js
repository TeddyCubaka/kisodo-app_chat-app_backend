const express = require("express");
const router = express.Router();

const discutCtrl = require("../Controllers/discussions");

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

router.get('/', discutCtrl.findAlldiscussion)
router.post('/', discutCtrl.createDiscussion)
router.post('/add_message', discutCtrl.insertMessage)
router.get('/:id', discutCtrl.findOneDiscussion)

module.exports = router;