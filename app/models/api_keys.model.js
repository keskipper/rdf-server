module.exports = (sequelize, Sequelize) => {
    const Api_keys = sequelize.define("api_keys", {
      serviceName: {
        type: Sequelize.STRING(45)
      },
      apiKey: {
        type: Sequelize.STRING(128)
      }
    },
    {
        tableName: 'api_keys'
    });
    return Api_keys;
  };