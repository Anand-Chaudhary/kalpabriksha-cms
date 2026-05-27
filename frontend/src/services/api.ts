const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

//eslint-disable-next-line
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export type AuthResponse = ApiResponse<{
  user: {
    id: string
    email: string
  }
  access_token?: string
}>

export type UploadResponse = ApiResponse<{
  id: string
  image_url: string
  event: string
  created_at: string
}>

export type GalleryResponse = ApiResponse<{
  id: string
  image_url: string
  event: string
  created_at: string
}[]>

// Auth APIs
export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export async function signup(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

// Gallery APIs
export async function getImages(event?: string): Promise<GalleryResponse> {
  const url = event ? `${API_BASE_URL}/gallery?event=${event}` : `${API_BASE_URL}/gallery`
  const res = await fetch(url)
  return res.json()
}

export async function uploadImage(file: File, event: string, token: string): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append("image", file)
  formData.append("event", event)

  const res = await fetch(`${API_BASE_URL}/gallery`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  return res.json()
}
