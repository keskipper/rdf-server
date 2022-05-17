module.exports = app => {
    const api_keys = require("../controllers/api_keys.controller.js");
    var router = require("express").Router();
    // Create new
    router.post("/", api_keys.create);
    // Retrieve one by id
    router.get("/:id", api_keys.findOne);
    // Find key by service name
    router.post("/findByName", api_keys.findByName);
    // Delete one by id
    router.delete("/:id", api_keys.delete);
    
    app.use('/api/api_keys', router);
  };