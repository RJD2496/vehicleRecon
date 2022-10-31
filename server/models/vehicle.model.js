const mongoose = require('mongoose')
var currentTime = new Date()
var year = currentTime.getFullYear()

const VehicleSchema = new mongoose.Schema({
    stock: { type: Number, required: [true], min: 100000, max: 999999 },
    year: { type: Number, required: [true, "Year is required"], min: 1900, max: year},
    make: { type: String, required: [true, "Make is required"], minLength: [3, "Make must be at least 3 characters"]},
    model: { type: String, required: [true, "Model is required"], minLength: [3, "Model must be at least 3 characters"]},
    color: { type: String, required: [true, "Color is required"], minLength: [3, "Color must be at least 3 characters"]},
    cosmetics: {
        paint: [{
            panel: {type: String, required: [false], default: ""},
            desc: {type: String, required: [false], default: ""}
        }],
        airbrush: [{
            panel: {type: String, required: [false], default: ""},
            desc: {type: String, required: [false], default: ""}
        }],
        wheels: [{
            panel: {type: String, required: [false], default: ""},
            desc: {type: String, required: [false], default: ""}
        }],
        interior: [{
            panel: {type: String, required: [false], default: ""},
            desc: {type: String, required: [false], default: ""}
        }],
    }
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", VehicleSchema)