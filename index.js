const express = require("express"),
  morgan = require("morgan"),
  app = express(),
  mysql = require("mysql"), // import mysql module
  cors = require("cors"),
  bodyParser = require("body-parser");

// setup database
db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rancho_test",
  multipleStatements: true,
});

// make server object that contain port property and the value for our server.
var server = {
  port: 4050,
};

app.use(morgan("tiny"));

// routers
const usersRouter = require("./routes/militars");
const arranchadosRouter = require("./routes/arranchados");
// use the modules
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
// use router
app.use("/militars", usersRouter);
app.use("/arranchados", arranchadosRouter);

app.listen(server.port, () =>
  console.log(`Server started, listening on port: ${server.port}`)
);
