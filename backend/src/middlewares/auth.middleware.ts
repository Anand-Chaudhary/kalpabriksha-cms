import { createSupabaseServerClient } from "../db/ssrClient"

export const authMiddleware = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - no token" })
  }

  const supabase = createSupabaseServerClient(req, res)

  // 🔥 KEY FIX: pass token directly
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
      error: error?.message,
    })
  }

  req.user = data.user
  req.supabase = supabase
  next()
}