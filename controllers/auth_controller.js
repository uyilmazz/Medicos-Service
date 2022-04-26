const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
require('dotenv').config();

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