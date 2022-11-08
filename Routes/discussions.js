const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

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

router.get("/", auth, discutCtrl.findAlldiscussion);
router.post("/", auth, discutCtrl.createDiscussion);
router.post("/add_message", auth, discutCtrl.insertMessage);
router.get("/:id", auth, discutCtrl.findOneDiscussion);
router.get("/delete/:id", auth, discutCtrl.deleteDiscussion);
router.get("/inbox/:id", auth, discutCtrl.findInBox);
router.post("/image", discutCtrl.addMessageAsImage);

module.exports = router;
