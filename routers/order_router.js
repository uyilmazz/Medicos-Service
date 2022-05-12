const orderController = require('../controllers/order_controller');
const router = require('express').Router();

router.get('/', orderController.getOrderById);
router.post('/', orderController.addOrder);


module.exports = router;