const router = require('express').Router();
const authController = require('../controllers/auth_controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/verifyToken', authController.verifyToken);

module.exports = router;