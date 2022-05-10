const { sequelize } = require("../models");
const db = require("../models");
const Jct_users_games = db.jct_users_games;
const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
    
    if (!req.body.userId || !req.body.gameId || !req.body.skaterType) {
      res.status(400).send({
        message: "Fields cannot be empty!"
      });
      return;
    }
    
    const jct_users_games = {
      userId: req.body.userId,
      gameId: req.body.gameId,
      skaterType: req.body.skaterType
    };
    
    Jct_users_games.create(jct_users_games)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while creating the junction."
        });
      });
  };

// Find a single item by id
exports.findOne = (req, res) => {
  console.log("findOne():", req.params.id);
    const id = req.params.id;
    Jct_users_games.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find junction with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving junction with id=" + id
        });
      });
  };

// Delete an item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Jct_users_games.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Junction was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete junction with id=${id}. Maybe it's not there!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete junction with id=" + id
        });
      });
  };

