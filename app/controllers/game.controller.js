const db = require("../models");
const Game = db.games;
const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a game
    const game = {
      title: req.body.title,
      description: req.body.description,
      lat: req.body.lat,
      lng: req.body.lng,
      address1: req.body.address1,
      address2: req.body.address2 ? req.body.address2 : null,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      venueName: req.body.venueName,
      date: req.body.date,
      time: req.body.time,
      organizer1: req.body.organizer1,
      organizer2: req.body.organizer2 ? req.body.organizer2: null,
      organizer3: req.body.organizer3 ? req.body.organizer3: null
    };
    // Save game in the database
    Game.create(game)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while creating the game."
        });
      });
  };

// Retrieve all from the database.
exports.findAll = (req, res) => {
    Game.findAll()
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "Cannot find games."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving games."
        });
      });
  };

// Find a single item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Game.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find game with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving game with id=" + id
        });
      });
  };

// Update an item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Game.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Game was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update game with id=${id}. Maybe game was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating game with id=" + id
        });
      });
  };

// Delete an item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Game.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Game was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete game with id=${id}. Maybe game was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete game with id=" + id
        });
      });
  };

// Delete all items from the database.
exports.deleteAll = (req, res) => {
    Game.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Games were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while removing all games."
        });
      });
  };

// Find all published items
exports.findAllPublished = (req, res) => {
  
};