const { Sequelize } = require('sequelize');
const { Client } = require('pg');
require('dotenv').config();

const databaseName = process.env.DB_NAME;

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || 'postgres',
};

const ensureDatabaseExists = async () => {
    const client = new Client({ ...dbConfig, database: 'postgres' });

    try {
        await client.connect();
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = '${databaseName}';`
        );

        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE "${databaseName}";`);
            console.log(`Database "${databaseName}" successfully created.`);
        } else {
            console.log(`Database "${databaseName}" already exists.`);
        }
    } catch (err) {
        console.error('Error while checking/creating the database:', err);
        throw err;
    } finally {
        await client.end();
    }
};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: false,
        pool: {
            max: 50,
            min: 5,
            acquire: 30000,
            idle: 10000,
        },
    }
);


const initializeDatabase = async () => {
    try {
        await ensureDatabaseExists();

        await sequelize.authenticate();
        console.log('Successfully connected to the database.');

        return sequelize;
    } catch (err) {
        console.error('Error during database initialization:', err);
        throw err;
    }
};

module.exports = { sequelize, initializeDatabase };