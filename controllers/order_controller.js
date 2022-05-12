const Order = require('../models/order');
const { StatusCodes } = require("http-status-codes");
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

module.exports.addOrder = async (req, res) => {
    const order = new Order(req.body);
    const _orderCode = uuidv4();
    order.orderCode = _orderCode;
    order.save().then(order => res.status(StatusCodes.OK).send(order))
        .catch(err => res.status(StatusCodes.BAD_REQUEST).send(err));
}

module.exports.getOrderById = async (req, res) => {

    const userId = req.query.userId;
    let query = {};
    query.userId = mongoose.Types.ObjectId(userId);
    try {
        const orders = await Order.find(query);
        res.status(StatusCodes.OK).send(orders);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }

}