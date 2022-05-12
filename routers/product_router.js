const router = require('express').Router();
const productController = require('../controllers/product_controller');

router.get('/', productController.getProducts);
router.get('/productId', productController.getProductById);

router.post('/', productController.addProduct);

module.exports = router;