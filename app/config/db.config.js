module.exports = {
    HOST: "us-cdbr-east-05.cleardb.net",
    USER: "bedd43d067424f",
    PASSWORD: "a951ebd5",
    DB: "heroku_85b8b16ae133636",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };