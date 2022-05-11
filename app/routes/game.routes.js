module.exports = app => {
    const games = require("../controllers/game.controller.js");
    var router = require("express").Router();
    // Create new
    router.post("/", games.create);
    // Retrieve all
    router.get("/", games.findAll);
    // Retrieve all games within miles of radius
    router.post("/limitbydistance", games.findGamesWithinMiles);
    // Retrieve all games with an organizer's id
    router.post("/findByOrganizer", games.findByOrganizer);
    // Retrieve all users in a game by game id
    router.post("/getGameRoster", games.getGameRoster);
    // Retrieve all games to which a user is joined
    router.post("/findGamesWhereUserJoined", games.findGamesWhereUserJoined);
    // Retrieve one by id
    router.get("/:id", games.findOne);
    // Update by id
    router.put("/:id", games.update);
    // Delete one by id
    router.delete("/:id", games.delete);
    // Delete all
    //router.delete("/", games.deleteAll);
    
    app.use('/api/games', router);
  };