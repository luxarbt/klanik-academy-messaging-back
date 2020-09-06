const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
// const socket = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRouter");
const chatRequestRouter = require("./routes/chatRequestRouter");
const messageRouter = require("./routes/messageRouter");
const conversationRouter = require("./routes/conversationRouter");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/chat", chatRequestRouter);
app.use("/messages", messageRouter);
app.use("/conversation", conversationRouter);

/* const server = app.listen(8080, function () {
  console.log("Server is running on port 8080");
}); */

// const io = socket(server);
// eslint-disable-next-line no-shadow
/* io.on("connection", (socket) => {
  socket.on("message", function (message) {
    socket.emit("message", { message: message });
  });
}); */
// Set up default mongoose connection
const mongoDB = process.env.DB_URL + process.env.DB_NAME;
mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
