module.exports = app => {
    const jct_users_games = require("../controllers/jct_users_games.controller.js");
    var router = require("express").Router();
    // Create new
    router.post("/", jct_users_games.create);
    // Retrieve one by id
    router.get("/:id", jct_users_games.findOne);
    // Find one relation given a userId and a gameId
    router.post("/findRelation", jct_users_games.findRelation);
    // Delete one by id
    router.delete("/:id", jct_users_games.delete);
    
    app.use('/api/jct_users_games', router);
  };