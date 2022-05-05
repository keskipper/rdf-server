module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
      title: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING(500)
      },
      gameLat: {
        type: Sequelize.DECIMAL(7,4)
      },
      gameLng: {
        type: Sequelize.DECIMAL(7,4)
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
        type: Sequelize.STRING(200)
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
      },
      timezoneAbbr: {
        type: Sequelize.CHAR(3)
      }, 
      timezoneString: {
        type: Sequelize.STRING(45)
      },
      adult: {
        type: Sequelize.STRING(6)
      }
    },
    {
        tableName: 'games'
    });
    return Game;
  };