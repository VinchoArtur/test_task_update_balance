const express = require('express');
const { validateUpdateBalance } = require('../../validators/validator');
const { updateUserBalance } = require('../../services/users/userService');

const router = express.Router();

const validateMiddleware = (req, res, next) => {
    try {
        validateUpdateBalance(req.body);
        next();
    } catch (error) {
        next(error);
    }
};

router.post('/updateBalance', validateMiddleware, async (req, res, next) => {
    const { userId, amount } = req.body;

    try {
        const updatedUser = await updateUserBalance(userId, amount);
        res.status(200).json({
            message: 'Balance successfully updated!',
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;