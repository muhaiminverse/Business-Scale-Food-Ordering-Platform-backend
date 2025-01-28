import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
        return 
    }
    next();
};

export const validateMyUserRequest = [
    // individual peaces of middleware 
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("Addressline1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors,
];

export const validateMyRestaurantRequest = [
    
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("deliveryPrice").isFloat({ min: 0 }).withMessage("Delivery price must be a positive number "),
    body("estimatedDeliveryTime").isInt({ min: 0 }).withMessage("Estimated Delivery Time must be a positive integar"),
    body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cusines array can not be empty"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat().withMessage("Menu items price is required"),
    handleValidationErrors,
];