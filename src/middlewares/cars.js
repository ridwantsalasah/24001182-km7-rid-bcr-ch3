const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
    // Validate the query
    const validateQuery = z.object({
        manufacture: z.string().optional(),
        model: z.string().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
};

exports.validateGetCarById = (req, res, next) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateCreateCar = (req, res, next) => {
    // Validation body schema
    const validateBody = z.object({
        plate: z.string(),
        manufacture: z.string(),
        model: z.string(),
        rentPerDay: z.number(),
        capacity: z.number(),
        description: z.string(),
        availableAt: z.string(),
        transmission: z.string(),
        available: z.boolean(),
        type: z.string(),
        year: z.number(),
        options: z.array(z.string()),
        specs: z.array(z.string()),
    });

    // Validate
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateUpdateCar = (req, res, next) => {
    // Validate parameters
    const validateParams = z.object({
        id: z.string().uuid("Invalid ID format"), // Validate that the ID is a valid UUID
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    // Validation body schema
    const validateBody = z.object({
        plate: z.string(),
        manufacture: z.string(),
        model: z.string(),
        image: z.string(),
        rentPerDay: z.number().positive("Rent per day must be a positive number"),
        capacity: z.number().positive("Capacity must be a positive number"),
        description: z.string(),
        availableAt: z.string().datetime("Available at must be a valid date-time"),
        transmission: z.string(),
        available: z.boolean(),
        type: z.string(),
        year: z.number().int("Year must be an integer").min(1886, "Year must be greater than 1885"), // Minimum year for a car
        options: z.array(z.string()),
        specs: z.array(z.string()),
    });

    // Validate request body
    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    // Proceed to the next middleware or route handler
    next();
};


exports.validateDeleteCarById = (req, res, next) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};