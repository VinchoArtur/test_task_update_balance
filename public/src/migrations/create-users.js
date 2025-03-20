module.exports = {
    up: async ({ context: { queryInterface, Sequelize } }) => {
        console.log("Starting migration: create-users");
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            balance: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 10000,
            },
        });
        console.log("Migration finished: create-users");
    },

    down: async ({ context: { queryInterface } }) => {
        console.log("Reverting migration: create-users");
        await queryInterface.dropTable('users');
    },
};
