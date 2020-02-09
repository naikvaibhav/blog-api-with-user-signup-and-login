let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const appConfig = require("./config/appConfig");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let blogRouter = require("./routes/blog");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
// app.use(globalRouteLoggerMiddleware.logIp);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(appConfig.apiVersion + "/users", usersRouter);
app.use(appConfig.apiVersion + "/blogs", blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//database connection
let db = mongoose.connect(appConfig.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// handling mongoose connection error
mongoose.connection.on("error", function(err) {
  console.log("database connection error");
  console.log(err);
}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on("open", function(err) {
  if (err) {
    console.log("database error");
    console.log(err);
  } else {
    console.log("database connection open success");
  }
});

//listen to port
app.listen(appConfig.port);
console.log("Connected to port no:", appConfig.port);

module.exports = app;
