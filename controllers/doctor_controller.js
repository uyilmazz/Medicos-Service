const { StatusCodes } = require("http-status-codes")
const Doctor = require('../models/doctor');

module.exports.getDoctors = async (req, res) => {

    try {
        const doctors = await Doctor.find();
        res.status(StatusCodes.OK).send(doctors);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.getDoctorById = async (req, res) => {
    const doctorId = req.params.doctorId;
    try {
        const doctor = await Doctor.findById(doctorId);
        res.status(StatusCodes.OK).send(doctor);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.addDoctor = async (req, res) => {
    const body = req.body;
    const newDoctor = new Doctor(body);
    newDoctor.save().then(doctor => res.status(StatusCodes.OK).send(doctor))
        .catch(err => res.status(StatusCodes.BAD_REQUEST).send(err));
}