const { StatusCodes } = require("http-status-codes")
const Product = require('../models/product');
module.exports.getProducts = async (req, res, next) => {

    try {
        let query = {};
        const categoryId = req.query.categoryId;
        if (categoryId) query.categoryId = { $in: mongoose.Types.ObjectId(categoryId) };
        const products = await Product.find({ query });
        res.status(StatusCodes.OK).send(products);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }

}

// module.exports.getProductByCategory = async (req, res, nex) => {
//     const categoryId = req.body.categoryId;
//     try {
//         const products = await Product.find({
//             categoryId: {
//                 $in: mongoose.Types.ObjectId(categoryId)
//             }
//         });
//         res.status(StatusCodes.OK).send(products);

//     } catch (error) {
//         res.status(StatusCodes.BAD_REQUEST).send(error);
//     }
// }

module.exports.getProductById = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        const product = Product.findById(productId);
        res.status(StatusCodes.OK).send(product);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }


}

module.exports.addProduct = async (req, res, next) => {
    const body = req.body;
    const product = new Product(body);
    product.save().then(product => res.status(StatusCodes.OK).send(product))
        .catch(err => res.status(StatusCodes.BAD_REQUEST).send(err));
}