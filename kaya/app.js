const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");

const indexRouter = require("./routes");

const app = express();
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

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
