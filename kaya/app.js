const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();

const indexRouter = require("./routes");
const diaryRouter = require("./routes/diary");
const modifyRouter = require("./routes/modify");
const completeRouter = require("./routes/complete");

const app = express();
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database connected successfull");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use("/diary", diaryRouter);
app.use("/modify", modifyRouter);
app.use("/complete", completeRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen("1202", () => {
  console.log("1202번 포트에 연결을 성공하였습니다.");
});
