const express = require("express");
const router = express.Router();

const { getList, getDetails } = require("../services/users");

router.get("/", (_, res, next) => {
  getList()
    .then((list) => res.json({ list }))
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  getDetails({ id: req.params.id })
    .then((user) => res.json({ user }))
    .catch(next);
});

module.exports = router;
