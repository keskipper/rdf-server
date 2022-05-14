module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      firstName: {
        type: Sequelize.STRING(45)
      },
      lastName: {
        type: Sequelize.STRING(45)
      },
      derbyName: {
        type: Sequelize.STRING(45)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      phone: {
        type: Sequelize.STRING(10)
      },
      jerseyNumber: {
        type: Sequelize.STRING(4)
      },
      gender: {
        type: Sequelize.CHAR(1)
      },
      userLat: {
        type: Sequelize.DECIMAL(7,4)
      },
      userLng: {
        type: Sequelize.DECIMAL(7,4)
      },
      birthdate: {
        type: Sequelize.DATE
      },
      imgName: {
        type: Sequelize.STRING(45)
      }
    },
    {
        tableName: 'users'
    });
    return User;
  };