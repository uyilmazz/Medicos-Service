const { default: mongoose } = require("mongoose");
const Appointment = require("../models/appointment");
const { StatusCodes } = require("http-status-codes");


module.exports.createAppointment = async (req, res) => {
    try {
        console.log(req.body);
        const date = new Date(req.body.date);
        const doctorId = mongoose.Types.ObjectId(req.body.doctorId);
        const isSelected = req.body.isSelected;
        const appointment = Appointment({
            date: date, doctorId: doctorId, isSelected: isSelected
        });
        await appointment.save();
        res.status(StatusCodes.OK).send(appointment);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.getAppointments = async (req, res) => {
    try {
        let query = {};
        if (req.query.isSelected) query.isSelected = (req.query.isSelected == 'true');
        if (req.query.doctorId) query.doctorId = req.query.doctorId;
        if (req.query.date) {

            const lteDate = new Date(req.query.date);
            const gteDate = new Date(lteDate);
            gteDate.setDate(lteDate.getDate() + 1);

            query.date = {
                $gte: lteDate,
                $lt: gteDate
            };
        }
        const appointments = await Appointment.find(query).sort('date').select({ 'doctorId': 0 });
        res.status(StatusCodes.OK).send(appointments);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.makeAppointment = async (req, res) => {
    const userId = req.body.userId;
    const appointmentId = req.body.appointmentId;
    try {
        await Appointment.findByIdAndUpdate(appointmentId, {
            userId: userId, isSelected: true
        });

        res.status(StatusCodes.OK).send();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}

module.exports.cancelAppointment = async (req, res) => {
    const appointmentId = req.query.appointmentId;
    try {
        await Appointment.findByIdAndUpdate(appointmentId, {
            userId: null, isSelected: false
        });
        res.status(StatusCodes.OK).send();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}