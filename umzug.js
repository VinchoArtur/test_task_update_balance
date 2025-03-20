const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('./public/src/models');
const { Sequelize } = require('sequelize');

const umzug = new Umzug({
    migrations: { glob: './public/src/migrations/*.js' },
    context: { queryInterface: sequelize.getQueryInterface(),
        Sequelize,
    },
    storage: new SequelizeStorage({ sequelize }),
    logging: (msg) => console.log(`[MIGRATION LOG]: ${msg}`),
});
module.exports = umzug;