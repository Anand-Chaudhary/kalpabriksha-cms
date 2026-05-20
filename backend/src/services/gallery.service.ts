import { Request, Response } from "express";

export const getImages = async (req: Request, res: Response) => {
    return res.status(201).json({
        success: true,
        message: "Works"
    })
}