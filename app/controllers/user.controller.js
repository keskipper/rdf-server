const { sequelize } = require("../models");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.gender || !req.body.age || !req.body.userLat || !req.body.userLng || !req.body.birthdate) {
      res.status(400).send({
        message: "Content missing or data invalid."
      });
      console.log("Request contents:", req.body);
      return;
    }
    // Create item
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      derbyName: req.body.derbyName,
      email: req.body.email,
      phone: req.body.phone,
      jerseyNumber: req.body.jerseyNumber,
      gender: req.body.gender,
      age: req.body.age,
      userLat: req.body.userLat,
      userLng: req.body.userLng,
      birthdate: req.body.birthdate
    };
    // Save in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while creating the User."
        });
      });
  };

// Retrieve all from the database.
exports.findAll = (req, res) => {
    User.findAll()
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "Cannot find users."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving users."
        });
      });
  };

// Find user by email address
exports.findByEmail = (req, res) => {
  const email = req.body.email;
  
  sequelize.query(`SELECT * FROM users WHERE users.email = "${email}"`, {raw: true, plain: true})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          message: "NOTFOUND"
        });
      }
    })
}

// Find a single item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };

// Update an item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe the User was not found or req.body is empty! Req.body.jerseyNumber: ${req.body.jerseyNumber}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

// Delete an item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

// Delete all items from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while removing all users."
        });
      });
  };
