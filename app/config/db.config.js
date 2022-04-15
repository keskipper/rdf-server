module.exports = {
    HOST: "localhost",
    USER: "rollerderbyapp",
    PASSWORD: "d3rbyp4ssw0rd",
    DB: "rollerderbyfinder",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };