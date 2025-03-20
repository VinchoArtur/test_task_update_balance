const {User} = require('../../models');
const ErrorHandling = require('../../utils/errors/errorHandling');
const {Op} = require('sequelize');
const sequelize = require('sequelize');


const updateUserBalance = async (userId, amount) => {
    try {
        const result = await User.sequelize.transaction(async (t) => {
            const [affectedRows, updatedUsers] = await User.update(
                {balance: sequelize.literal(`balance + ${amount}`)},
                {
                    where: {
                        id: userId,
                        balance: {[Op.gte]: -amount},
                    },
                    returning: true,
                    transaction: t,
                }
            );
            if (affectedRows === 0) {
                throw new ErrorHandling("User not found or insufficient funds", 400);
            }
            return updatedUsers[0];
        });
        return result;
    } catch (error) {
        console.error('[ERROR] UpdateUserBalance:', error.message);
        throw error;
    }
};


module.exports = {updateUserBalance};