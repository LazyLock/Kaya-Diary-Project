const express = require("express");
const { Diary } = require("../models");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    await Diary.destroy({ where: { id: req.params.id } });
    const diarys = await Diary.findAll({});
    res.render("main", { diarys });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
