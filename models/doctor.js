const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    about: {
        type: String
    },
    profileUrl: {
        type: String
    },
    experience: {
        type: Number
    },
    rate: {
        type: Number
    },
    patience: {
        type: Number
    },
    available: {
        type: Boolean,
        default: false
    },
    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Appointment',
            required: true
        }
    ]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;