const express = require("express");
const router = express.Router();

const { getList, create } = require("../services/praise");

router.get("/", (_, res, next) => {
  getList()
    .then((list) => res.json({ list }))
    .catch(next);
});

router.post("/", async (req, res, next) => {
  create({
    sender: req.body.sender,
    receiver: req.body.receiver,
    content: req.body.content,
  })
    .then((praise) => res.json({ praise }))
    .catch(next);
});

module.exports = router;
