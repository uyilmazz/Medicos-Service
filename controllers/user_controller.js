const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
require('dotenv').config();
const path = require('path');
const Appointment = require('../models/appointment');


module.exports.register = async (req, res) => {
    const body = req.body;
    const newUser = new User(body);

    newUser.save().then((user) => {
        res.status(StatusCodes.OK).send(user)
    }).catch((val) => {
        res.status(StatusCodes.BAD_REQUEST).send(val);
    })
}

module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).send(user);
        } else {
            const token = jwt.sign(user.email, process.env.JWT_SECRET_KEY);
            user.token = token;
            res.status(StatusCodes.OK).send(user);
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }

}

module.exports.verifyToken = async (req, res) => {
    const token = req.body.token;

    try {
        const email = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ email });
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).send(user);
        } else {
            res.status(StatusCodes.OK).send(user);
        }

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.updatePassword = async (req, res) => {
    const newPassword = req.body.newPassword;
    try {
        await User.findByIdAndUpdate(req.body.userId, { password: newPassword });
        res.status(StatusCodes.OK).send();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.updateProfile = async (req, res) => {

    const userId = req.body.userId;
    let updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
    if (req.file) updateData.imageUrl = 'images/users/' + req.file.filename;
    try {
        const user = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
        res.status(StatusCodes.OK).send(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.getUser = async (req, res) => {

    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        res.status(StatusCodes.OK).send(user);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).send(error);
    }

}

// CART
module.exports.getCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        const cartItems = await user.getUserCart();
        res.status(StatusCodes.OK).send(cartItems);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.addProductInCart = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    try {
        const user = await User.findById(userId);
        await user.addProductInCart(productId);
        res.status(StatusCodes.OK).send();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}


module.exports.decrementProductFromCart = async (req, res) => {

    const userId = req.body.userId;
    const productId = req.body.productId;
    try {
        const user = await User.findById(userId);
        await user.decrementProductInCart(productId);
        res.status(StatusCodes.OK).send();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.removeProductFromCart = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    try {
        const user = await User.findById(userId);
        await user.removeProductFromCart(productId);
        const cartItems = await user.getCart();
        res.status(StatusCodes.OK).send(cartItems);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.clearCart = async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId);
        await user.clearCart();
        res.status(StatusCodes.OK).send();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.getAppointments = async (req, res) => {
    let query = {};
    if (req.params.userId) query.userId = req.params.userId;
    if (req.query.isUpComing == 'true') {
        query.date = {
            $gte: Date.now()
        }
    } else {
        query.date = {
            $lte: Date.now()
        }
    }
    try {
        const appointments = await Appointment.find(query).sort('date').populate({
            path: 'doctorId', select: 'name department rate profilUrl', populate: {
                path: 'department', select: 'name'
            }
        }).sort('date');
        res.status(StatusCodes.OK).send(appointments);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}
