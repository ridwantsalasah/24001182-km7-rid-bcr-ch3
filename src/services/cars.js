const carRepository = require("../repositories/cars");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = () => {
    return carRepository.getCars();
};

exports.getCarById = (id) => {
    const car = carRepository.getCarById(id);

    // Check if car is not found
    if (!car) { // This should be negated to throw an error when the car is not found
        throw new NotFoundError("Car is Not Found!");
    }

    return car; // Return the found car
};


exports.createCar = (data) => {
    return carRepository.createCar(data);
};

exports.updateCar = (id, data) => {
    // Check if the car exists
    const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car Not Found!"); // Corrected error message for clarity
    }

    // Attempt to update the car data
    const updatedCar = carRepository.updateCar(id, data);
    if (!updatedCar) {
        throw new InternalServerError(["Failed to update car!"]); // Check if the update failed
    }

    // Return the updated car data
    return updatedCar;
};

exports.deleteCarById = (id) => {
    // find car is exist or not
    const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    // if exist, we will delete the car data
    const deletedCar = carRepository.deleteCarById(id);
    if (!deletedCar) {
        throw new InternalServerError(["Failed to update car!"]);
    }

    return deletedCar;
};