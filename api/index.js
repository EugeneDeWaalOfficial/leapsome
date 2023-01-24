var express = require("express");
var router = express.Router();

router.use("/praise", require("./praise"));
router.use("/users", require("./users"));

module.exports = router;
