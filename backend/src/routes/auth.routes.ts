import { Router } from "express";
import { body } from "express-validator";
import * as authServices from "../services/auth.service"

const router = Router()

router.post('/register',
    [
        body('email').isEmail().withMessage("Please provide a valid email"),
        body('password').isLength({ min: 3 }).withMessage("Password must be of 3 characters"),
    ],
    authServices.RegisterUser
)

router.post('/login',
    [
        body('email').isEmail().withMessage("Please provide a valid email"),
        body('password').isLength({ min: 3 }).withMessage("Password must be of 3 characters"),
    ],
    authServices.LoginUser
)

export default router