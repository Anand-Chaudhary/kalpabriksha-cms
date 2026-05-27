import { Navbar } from "@/components/navbar"
import { ImagesPage } from "./images-page"

export default function ImagesRoute() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex flex-1">
        <ImagesPage />
      </main>
    </div>
  )
}
