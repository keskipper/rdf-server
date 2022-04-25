module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
      title: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING
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
      time: {
        type: Sequelize.STRING
      },
      organizer: {
        type: Sequelize.INTEGER
      }
    },
    {
        tableName: 'games'
    });
    return Game;
  };