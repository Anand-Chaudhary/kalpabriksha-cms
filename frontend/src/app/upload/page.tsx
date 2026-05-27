import { Navbar } from "@/components/navbar"
import { UploadForm } from "@/components/upload-form"

export default function UploadPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <UploadForm />
        </div>
      </main>
    </div>
  )
}
