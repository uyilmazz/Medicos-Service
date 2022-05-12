const router = require('express').Router();
const authController = require('../controllers/user_controller');
const multerHelper = require('../helper/multer_hepler');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/:userId', authController.getUser);
router.post('/verifyToken', authController.verifyToken);
router.post('/updatePassword', authController.updatePassword);
router.post('/updateProfile', multerHelper.createUserImage, authController.updateProfile);

// CART
router.get('/cart/:userId', authController.getCart);
router.post('/cart/addProduct', authController.addProductInCart);
router.post('/cart/decrementProduct', authController.decrementProductFromCart);
router.post('/cart/clearCart', authController.clearCart);

// Appointment
router.get('/appointments/:userId', authController.getAppointments);
module.exports = router;