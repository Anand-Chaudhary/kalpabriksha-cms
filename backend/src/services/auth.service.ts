import { Request, Response } from "express"
import supabase from "../db/dbConnect";
import { cookie } from "express-validator";

export const RegisterUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return res.status(400).json({ success: false, message: error.message })
  }

  return res.status(200).json({
    success: true,
    message: "Signup successful. Check email.",
    user: data.user,
  })
}

export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return res.status(400).json({ success: false, message: error.message })
  }

  return res.status(200).json({
    success: true,
    user: data.user,
    access_token: data.session.access_token,
  })
}
