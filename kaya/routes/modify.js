const express = require("express");
const { Diary } = require("../models");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const diary_selected = await Diary.findOne({
      where: { id: req.params.id },
    });
    const diarys = await Diary.findAll({});
    res.render("modify", { diary_selected, diarys });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route("/:id/complete").patch(async (req, res, next) => {
  const { id, date, catego, friend, title, comment } = req.body;
  try {
    await Diary.update(
      {
        date: date,
        category: catego,
        friends: friend,
        title: title,
        comment: comment,
      },
      { where: { id: id } }
    );
    res.redirect("/diary/id/detail");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
