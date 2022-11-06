const { response } = require("express")
const Vehicle = require("../models/vehicle.model")

module.exports.createVehicle = (req, res) => {
    Vehicle.create(req.body)
        .then(vehicle => res.json(vehicle))
        .catch(err => res.status(400).json(err))
}

module.exports.getAllVehicles = (req, res) => {
    Vehicle.find({})
        .then(vehicles => res.json(vehicles))
        .catch(err => res.json(err))
}

module.exports.getVehicle = (req, res) => {
    Vehicle.findOne({_id:req.params.id})
        .then(vehicle => res.json(vehicle))
        .catch(err => res.json(err))
}

module.exports.updateVehicle = (req, res) => {
    Vehicle.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedVehicle => res.json(updatedVehicle))
        .catch(err => res.json(err))
}

module.exports.deleteVehicle = (req, res) => {
    Vehicle.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}

module.exports.completeCosmetics = (req, res) => {
    console.log("hello");
    console.log(req.params.category);
    if (req.params.category == "paint") {
        console.log("in update paint")
        Vehicle.findOneAndUpdate({_id: req.params.id}, {$set: {"paint": []}}, {new:true})
        .then(updatedVehicle => res.json(updatedVehicle))
        .catch(err => res.json(err))
    }
    if (req.params.category == "wheels") {
        console.log("in update wheels")
        Vehicle.findOneAndUpdate({_id: req.params.id}, {$set: {"wheels": []}}, {new:true})
        .then(updatedVehicle => res.json(updatedVehicle))
        .catch(err => res.json(err))
    }
    if (req.params.category == "airbrush") {
        console.log("in update airbrush")
        Vehicle.findOneAndUpdate({_id: req.params.id}, {$set: {"airbrush": []}}, {new:true})
        .then(updatedVehicle => res.json(updatedVehicle))
        .catch(err => res.json(err))
    }
    if (req.params.category == "interior") {
        console.log("in update interior")
        Vehicle.findOneAndUpdate({_id: req.params.id}, {$set: {"interior": []}}, {new:true})
        .then(updatedVehicle => res.json(updatedVehicle))
        .catch(err => res.json(err))
    }
        
}