const { StatusCodes } = require("http-status-codes");
const Department = require("../models/department");


module.exports.getDepartments = async (req, res) => {

    try {
        const departments = await Department.find();
        res.status(StatusCodes.OK).send(departments);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }

}

module.exports.addDepartment = async (req, res) => {
    const body = req.body;
    const newDepartment = new Department(body);

    newDepartment.save().then(department => res.status(StatusCodes.OK).send(department))
        .catch(err => res.status(StatusCodes.BAD_REQUEST).send(err));
}