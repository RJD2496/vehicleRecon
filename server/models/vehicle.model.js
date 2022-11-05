const mongoose = require('mongoose')
var currentTime = new Date()
var vehicleYear = (currentTime.getFullYear()+1);

const VehicleSchema = new mongoose.Schema({
    year: { type: Number, required: [true, "Year is required"], min: 1900, max: vehicleYear},
    make: { type: String, required: [true, "Make is required"]},
    model: { type: String, required: [true, "Model is required"]},
    odometer: { type: Number, required: [true, "Odometer is required"]},
    color: { type: String, required: [true, "Color is required"]},
    paint: [{
        panel: {type: String, required: [false]},
        fee: {type: Number, required: [false]},
        desc: {type: String, required: [false]}
    }],
    airbrush: [{
        panel: {type: String, required: [false]},
        fee: {type: Number, required: [false]},
        desc: {type: String, required: [false]}
    }],
    wheels: [{
        panel: {type: String, required: [false]},
        fee: {type: Number, required: [false]},
        desc: {type: String, required: [false]}
    }],
    interior: [{
        panel: {type: String, required: [false]},
        fee: {type: Number, required: [false]},
        desc: {type: String, required: [false]}
    }]
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", VehicleSchema)