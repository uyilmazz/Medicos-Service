const { StatusCodes } = require("http-status-codes")
const Category = require('../models/category');

module.exports.getCategories = async (req, res) => {

    try {
        const categories = await Category.find();
        res.status(StatusCodes.OK).send(categories);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }

}

module.exports.addCategory = async (req, res) => {
    const body = req.body;
    const newCategory = new Category(body);
    newCategory.save().then(category => res.status(StatusCodes.OK).send(category))
        .catch(err => res.status(StatusCodes.BAD_REQUEST).send(err));
}