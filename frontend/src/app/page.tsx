import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <header className="border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="font-semibold hover:underline">
            Kalpabriksha CMS
          </Link>
          <nav className="flex gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link href="/signup" className="text-sm font-medium hover:underline">
              Sign up
            </Link>
            <Link href="/images" className="text-sm font-medium hover:underline">
              Images
            </Link>
            <Link href="/upload" className="text-sm font-medium hover:underline">
              Upload
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
