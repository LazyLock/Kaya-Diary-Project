const express = require("express");
const { Diary } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const diarys = await Diary.findAll({});
    res.render("main", {diarys});
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
