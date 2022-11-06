const VehicleController = require("../controllers/vehicle.controller")

module.exports = (app) => {
    app.post("/vehicle/create", VehicleController.createVehicle)
    app.get("/vehicles", VehicleController.getAllVehicles)
    app.get("/vehicle/:id", VehicleController.getVehicle)
    app.put("/vehicle/edit/:id", VehicleController.updateVehicle)
    app.delete("/vehicle/delete/:id", VehicleController.deleteVehicle)
    app.put("/vehicle/completecosmetic/:id/:category", VehicleController.completeCosmetics)
}