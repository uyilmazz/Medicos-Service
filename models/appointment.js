const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    isSelected: {
        type: Boolean,
        required: true,
        default: false
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;