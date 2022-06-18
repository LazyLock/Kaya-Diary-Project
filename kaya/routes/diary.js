const express = require("express");
const { Diary } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { date, catego, friend, title, comment } = req.body;
  try {
    await Diary.create({
      date,
      catego,
      friend,
      title,
      comment,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
