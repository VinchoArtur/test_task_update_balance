const express = require('express');
const { sequelize, initializeDatabase, User } = require('./public/src/models/index');
const umzug = require('./umzug');
const app = require('./app');


const initializeApp = async () => {
    try {
        await initializeDatabase();
        console.log('Running migrations...');
        await umzug.up();
        console.log('Migrations completed successfully.');
        await sequelize.sync();
        console.log('Tables synchronized.');
        const existingUser = await User.findOne({ where: { id: 1 } });
        if (!existingUser) {
            await User.create({ balance: 10000 });
            console.log('User added to the database.');
        } else {
            console.log('User already exists in the database.');
        }

        return app;
    } catch (error) {
        console.error('Application startup error:', error);
        throw error;
    }
};

module.exports = initializeApp;