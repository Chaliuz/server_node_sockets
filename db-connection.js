const { Sequelize } = require('sequelize');

const database = "new_db";
// const username = "chalo";
// const password = "chalo";
const host = "localhost";
//
// const database = "test";
const username = "postgres";
const password = "";
// const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});

module.exports = {
  sequelize
}
