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
      age: {
        type: Sequelize.INTEGER
      },
      lat: {
        type: Sequelize.DECIMAL(6,5)
      },
      lng: {
        type: Sequelize.DECIMAL(6,5)
      }
    },
    {
        tableName: 'users'
    });
    return User;
  };