const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            balance: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 10000,
            },
        },
        {
            tableName: 'users',
            timestamps: false,
        }
    );

    return User;
};