module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create new
    router.post("/", users.create);
    // Retrieve all
    router.get("/", users.findAll);
    // Retrieve one by id
    router.get("/:id", users.findOne);
    // Update by id
    router.put("/:id", users.update);
    // Delete one by id
    router.delete("/:id", users.delete);
    // Delete all
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
  };