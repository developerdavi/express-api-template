module.exports = {
  PORT: process.env.PORT ? process.env.PORT : 3333,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_KEY: process.env.JWT_KEY
}