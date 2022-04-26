const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        token: {
            type: String
        },
        appointments: [{
            type: Schema.Types.ObjectId,
            ref: 'Appointment',
            required: true
        }],

        cart: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        ]
    }
);


const User = mongoose.model('User', userSchema);

module.exports = User;