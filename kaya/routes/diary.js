const express = require("express");
const { Diary } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { date, catego, friend, title, comment } = req.body;
  try {
    await Diary.create({
      date: date,
      category: catego,
      friends: friend,
      title: title,
      comment: comment,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id/detail", async (req, res, next) => {
  try {
    const diary_selected = await Diary.findOne({
      where: { id: req.params.id },
    });
    const diarys = await Diary.findAll({});
    res.render("diary_detail", { diary_selected, diarys });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
