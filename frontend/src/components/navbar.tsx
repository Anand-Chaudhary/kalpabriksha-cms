"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/images", label: "Images" },
  { href: "/upload", label: "Upload" },
]

export function Navbar() {
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    window.location.href = "/login"
  }

  return (
    <header className="border-b px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="font-semibold hover:underline">
          Kalpabriksha CMS
        </Link>
        <nav className="flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </nav>
      </div>
    </header>
  )
}
