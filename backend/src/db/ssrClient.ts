import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import dotenv from 'dotenv'

dotenv.config()

export const createSupabaseServerClient = (req: any, res: any) => {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(req.headers.cookie ?? '').map((c) => ({
            name: c.name,
            value: c.value ?? '',
          }))
        },
        setAll() {},
      },
    }
  )
}