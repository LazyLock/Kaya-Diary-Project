const express = require("express");
const { Diary } = require("../models");

const router = express.Router();

router.post("/:id", async (req, res, next) => {
  const { date, catego, friend, title, comment } = req.body;
  const id = req.params.id;
  try {
    const diary_selected = await Diary.update(
      {
        date: date,
        category: catego,
        friends: friend,
        title: title,
        comment: comment,
      },
      { where: { id: id } }
    );
    const diarys = await Diary.findAll();
    res.render("diary_detail",  { diary_selected, diarys });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
