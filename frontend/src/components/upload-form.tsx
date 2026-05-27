"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { uploadImage } from "@/services/api"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"

export function UploadForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [event, setEvent] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile || !event) {
      toast.error("Please select a file and enter an event name")
      return
    }

    // Get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    if (!token) {
      toast.error("You must be logged in to upload images")
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      const response = await uploadImage(selectedFile, event, token)

      if (response.success) {
        toast.success("Image uploaded successfully!")
        setEvent("")
        setSelectedFile(null)
      } else {
        toast.error(response.message || "Upload failed")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>
            Upload an image to the gallery for a specific event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="event">Event Name</FieldLabel>
                <Input
                  id="event"
                  type="text"
                  placeholder="e.g., wedding, conference, party"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  required
                />
                <FieldDescription>Enter a name for the event</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
                <FieldDescription>
                  {selectedFile
                    ? `Selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`
                    : "Choose an image to upload"}
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Upload Image"}
                </Button>
                <Separator className="my-4" />
                <Button variant="outline" type="button" onClick={() => router.push("/images")}>
                  View All Images
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
