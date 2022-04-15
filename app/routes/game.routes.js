module.exports = app => {
    const games = require("../controllers/game.controller.js");
    var router = require("express").Router();
    // Create new
    router.post("/", games.create);
    // Retrieve all
    router.get("/", games.findAll);
    // Retrieve one by id
    router.get("/:id", games.findOne);
    // Update by id
    router.put("/:id", games.update);
    // Delete one by id
    router.delete("/:id", games.delete);
    // Delete all
    router.delete("/", games.deleteAll);
    
    app.use('/api/games', router);
  };