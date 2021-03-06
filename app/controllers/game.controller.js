const { sequelize } = require("../models");
const db = require("../models");
const Game = db.games;
const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.description || !req.body.venueName || !req.body.date || !req.body.timezoneAbbr || !req.body.timezoneString) {
      res.status(400).send({
        message: "Fields cannot be empty!"
      });
      return;
    }
    // Create a game
    const game = {
      title: req.body.title,
      description: req.body.description,
      gameLat: req.body.gameLat,
      gameLng: req.body.gameLng,
      address1: req.body.address1,
      address2: req.body.address2 ? req.body.address2 : null,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      venueName: req.body.venueName,
      date: req.body.date,
      organizer: req.body.organizer,
      skaterRoster: req.body.skaterRoster,
      officialRoster: req.body.officialRoster,
      nsoRoster: req.body.nsoRoster,
      hostingLeague: req.body.hostingLeague,
      gameGender: req.body.gameGender,
      timezoneAbbr: req.body.timezoneAbbr,
      timezoneString: req.body.timezoneString,
      adult: req.body.adult
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

// Retrieve all from the database (don't expose this func to end-users)
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

// Find all future games within a radius of x miles
exports.findGamesWithinMiles = (req, res) => {
    const meters = req.body.miles * 1609;
    const { adult, userLat, userLng, orderField } = req.body;
    sequelize.query(`SELECT gameresult.*, 
        ST_Distance_Sphere(Point(${userLng}, ${userLat}), POINT(gameresult.gameLng, gameresult.gameLat)) 
        AS distance 
        FROM 
          (SELECT * FROM games 
            WHERE games.date >= CURDATE() 
            AND games.adult = "${adult}"
            AND ST_Distance_Sphere(Point(${userLng}, ${userLat}), POINT(games.gameLng, games.gameLat)) <= ${meters}
          ) 
        AS gameresult 
        ORDER BY ${orderField} ASC;`, 
        { type: sequelize.QueryTypes.SELECT }
        )
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Cannot find games, error code 404."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving games, error code 500.", err
            });
        });
};

// Get roster of users in a given game by join type
exports.getGameRoster = (req, res) => {
  sequelize.query(`SELECT * FROM
      (SELECT u.firstName, u.lastName, u.derbyName, u.jerseyNumber, u.phone, u.email, g.title, g.date, g.id AS gameId, j.id AS joinId, j.joinType
          FROM users u
          RIGHT JOIN jct_users_games j
          ON u.id = j.userId
          LEFT JOIN games g
          ON g.id = j.gameId
          ) AS q
      WHERE q.gameId = ${req.body.id} AND q.joinType = "${req.body.joinType}"
      GROUP BY q.email;`, 
      { type: sequelize.QueryTypes.SELECT }
      )
      .then(data => {
          if (data) {
              res.send(data);
          } else {
              res.status(404).send({
                  message: "Cannot find any results, error code 404."
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: err.message
          });
      });
}

// Find all games for an organizer's id
exports.findByOrganizer = (req, res) => {
  const NOW = new Date();
    Game.findAll({
      where: {
        organizer: req.body.organizer,
        date: {
          [Op.gte]: NOW
        }
      },
      order: [
        ['date', 'ASC']
      ]
    }).then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Can't find any games for that organizer id."
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

// Find all games to which a user is joined
exports.findGamesWhereUserJoined = (req, res) => {
  sequelize.query(`SELECT * FROM
	    (SELECT g.*, u.email, j.joinType
          FROM users u
          RIGHT JOIN jct_users_games j
          ON u.id = j.userId
          LEFT JOIN games g
          ON g.id = j.gameId
          ) AS q
      WHERE q.email = "${req.body.email}" AND q.date >= CURDATE()
      GROUP BY q.title
      ORDER BY q.date ASC;`, 
      { type: sequelize.QueryTypes.SELECT }
      )
      .then(data => {
          if (data) {
              res.send(data);
          } else {
              res.status(404).send({
                  message: "Cannot find any results, error code 404."
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: err.message
          });
      });
}

// Find a single item by id
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

