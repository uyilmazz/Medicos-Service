const { StatusCodes } = require("http-status-codes");
const Doctor = require('../models/doctor');
const Department = require('../models/department');
const Appointment = require("../models/appointment");


module.exports.getDoctors = async (req, res) => {
    let query = {};
    let departmentsIds;
    try {
        if (req.query.searchText) {
            const searchText = req.query.searchText;

            const departments = await Department.find({ name: { '$regex': '.*' + searchText + '.*', '$options': 'i' } }).select('_id');
            departmentsIds = departments.map((item) => {
                return item['_id'];
            });

        }
        if (req.query.available) query.available = req.query.available;
        if (req.query.departmentId) query.department = req.query.departmentId;
        if (departmentsIds) query.department = { $in: departmentsIds };
        const doctors = await Doctor.find(query).populate('department');
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

