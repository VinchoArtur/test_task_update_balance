const sequelizeConfig = require('../../src/configs/sequelizeConfig'); // Инициализация sequelize
const UserModel = require('./users/user');

const sequelize = sequelizeConfig.sequelize;
const initializeDatabase = sequelizeConfig.initializeDatabase;

const User = UserModel(sequelize);

module.exports = {
    sequelize,
    initializeDatabase,
    User,
};