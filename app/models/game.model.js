module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
      title: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING(500)
      },
      gameLat: {
        type: Sequelize.DECIMAL(6,4)
      },
      gameLng: {
        type: Sequelize.DECIMAL(6,4)
      },
      address1: {
        type: Sequelize.STRING(45)
      },
      address2: {
        type: Sequelize.STRING(45)
      },
      city: {
        type: Sequelize.STRING(45)
      },
      state: {
        type: Sequelize.CHAR(2)
      },
      zip: {
        type: Sequelize.INTEGER
      },
      venueName: {
        type: Sequelize.STRING(100)
      },
      date: {
        type: Sequelize.DATE
      },
      organizer: {
        type: Sequelize.INTEGER
      },
      rosterOpen: {
        type: Sequelize.BOOLEAN
      },
      hostingLeague: {
        type: Sequelize.STRING(100)
      },
      gameGender: {
        type: Sequelize.CHAR(1)
      }
    },
    {
        tableName: 'games'
    });
    return Game;
  };