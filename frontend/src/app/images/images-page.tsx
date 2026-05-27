"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { getImages } from "@/services/api"
import Image from "next/image"

export function ImagesPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [images, setImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [eventFilter, setEventFilter] = useState("")
  const [filteredImages, setFilteredImages] = useState<any[]>([])

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    if (eventFilter.trim()) {
      setFilteredImages(
        images.filter((img) =>
          img.event?.toLowerCase().includes(eventFilter.toLowerCase())
        )
      )
    } else {
      setFilteredImages(images)
    }
  }, [eventFilter, images])

  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const response = await getImages()

      if (response.success) {
        setImages(response.data || [])
        setFilteredImages(response.data || [])
      } else {
        toast.error(response.message || "Failed to load images")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-8">
            <p>Loading images...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("flex min-h-svh flex-col", className)} {...props}>
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
          <CardDescription>Browse and manage your uploaded images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex gap-4">
            <Input
              placeholder="Filter by event..."
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="flex-1"
            />
            <Button onClick={fetchImages} variant="outline" disabled={isLoading}>
              Refresh
            </Button>
          </div>

          {filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No images found</p>
              <Button variant="link" onClick={() => setEventFilter("")}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredImages.map((image) => (
                <Card key={image.id} size="sm" className="overflow-hidden">
                  <div className="aspect-square w-full overflow-hidden bg-muted">
                    <Image
                      src={image.image_url}
                      alt={image.event}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        {image.event}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(image.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredImages.length} of {images.length} images
            </p>
            <Button variant="outline" onClick={() => (window.location.href = "/upload")}>
              Upload New Image
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
