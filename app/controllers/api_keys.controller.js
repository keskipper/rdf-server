const { sequelize } = require("../models");
const db = require("../models");
const Api_keys = db.api_keys;
const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
    if (!req.body.api_key ) {
      res.status(400).send({
        message: "Field cannot be empty!"
      });
      return;
    }
    const api_keys = {
      userId: req.body.api_key
    };
    Api_keys.create(api_keys)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while creating the key entry."
        });
      });
  };

// Find a single item by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("req body", req.body);
    console.log("id", id);
    Api_keys.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find key pair with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving key pair with id=" + id
        });
      });
  };

// Find key by email service name
exports.findByName = (req, res) => {
  Api_keys.findAll({
    where: {
      serviceName: req.body.serviceName
    }
  }).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Can't find any games for that name."
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

// Delete an item by id
exports.delete = (req, res) => {
    const id = req.params.id;
    Api_keys.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Key pair was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete key pair with id=${id}. Maybe it's not there!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete key pair with id=" + id
        });
      });
  };

