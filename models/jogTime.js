const mongoose = require('mongoose');

const jogTimesSchema = new mongoose.Schema({
    name: { //to be changed to ID later
        type: String, //to be changed to Number
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    },
    distance:{
        type: Number,
        required: true
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    }
})

module.exports = mongoose.model('JogTime', jogTimesSchema );
