import { Request, Response } from "express";
import supabase from "../db/dbConnect";

export const RegisterUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    return res.status(200).json({
        success: true,
        message: "Signup initiated. Check email for verification.",
        data: data.user ?? null,
    });
};

export const LoginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    res.cookie('token', data.session.access_token)

    return res.status(201).json({
        success: true,
        message: "User Loggedin Successfully",
        user: {
            email: data.user.email,
        },
        token: data.session.access_token
    });
}