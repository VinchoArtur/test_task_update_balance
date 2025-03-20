const userService = require('../../services/users/userService');
const {validateUpdateBalance} = require('../../validators/validator');
const ErrorHandling = require('../../utils/errors/errorHandling');

const updateBalance = async (req, res, next) => {
    try {
        const { userId, amount } = req.body;

        validateUpdateBalance(req.body);

        const updatedUser = await userService.updateUserBalance(userId, amount);

        res.status(200).json({
            message: 'Balance successfully updated',
            user: updatedUser,
        });
    } catch (error) {
        console.error('[ERROR] Update Balance:', error.message);
        console.error('[DEBUG] Stacktrace:', error.stack);

        if (error instanceof ErrorHandling) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            next(error);
        }
    }
};


module.exports = {updateBalance}