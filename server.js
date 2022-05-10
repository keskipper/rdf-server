const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
//db.sequelize.sync({ force: false, alter: true });

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to rollerderbyfinder server application." });
});

require('./app/routes/user.routes')(app);
require('./app/routes/game.routes')(app);
require('./app/routes/jct_users_games.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});