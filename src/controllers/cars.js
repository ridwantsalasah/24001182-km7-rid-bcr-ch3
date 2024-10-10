const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCars = (req, res, next) => {
    // Call the usecase or service
    const data = carService.getCars(
        req.query?.manufacture,
        req.query?.model
    );
    successResponse(res, data);
};

exports.getCarById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = carService.getCarById(id);
    successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
    // Create the new car
    const data = await carService.createCar(req.body, req.files);
    successResponse(res, data);
};

exports.updateCar = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = await carService.updateCar(id, req.body, req.files);
    successResponse(res, data);
};

exports.deleteCarById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = carService.deleteCarById(id);
    successResponse(res, data);
};