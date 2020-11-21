const express = require("express"),
  app = express(),
  mysql = require("mysql"), // import mysql module
  cors = require("cors"),
  bodyParser = require("body-parser");

// setup database
db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rancho",
});

// make server object that contain port property and the value for our server.
var server = {
  port: 4050,
};

// routers
const usersRouter = require("./routes/militars");
const arranchadosRouter = require("./routes/arranchados");
// use the modules
app.use(cors());
app.use(bodyParser.json());
// use router
app.use("/militars", usersRouter);
app.use("/arranchados", arranchadosRouter);

app.listen(server.port, () =>
  console.log(`Server started, listening on port: ${server.port}`)
);
