module.exports = (sequelize, Sequelize) => {
    const Jct_users_games = sequelize.define("jct_users_games", {
      userId: {
        type: Sequelize.INTEGER
      },
      gameId: {
        type: Sequelize.INTEGER
      },
      joinType: {
        type: Sequelize.STRING(8)
      }
    },
    {
        tableName: 'jct_users_games'
    });
    return Jct_users_games;
  };