import type { VercelRequest, VercelResponse } from "@vercel/node"
import { uploadPortfolioImage } from "../lib/cloudinary-upload-server"

const ALLOWED_FOLDERS = new Set([
  "portfolio-projects",
  "portfolio-certificates",
  "portfolio-profile",
])

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { image, assetId, projectId, folder } = req.body as {
    image?: string
    assetId?: string
    projectId?: string
    folder?: string
  }

  const id = assetId || projectId
  const uploadFolder = folder || "portfolio-projects"

  if (!image || !id) {
    return res.status(400).json({ error: "Missing image or assetId" })
  }

  if (!/^[\w-]+$/.test(id)) {
    return res.status(400).json({ error: "Invalid assetId" })
  }

  if (!ALLOWED_FOLDERS.has(uploadFolder)) {
    return res.status(400).json({ error: "Invalid folder" })
  }

  try {
    const result = await uploadPortfolioImage(image, id, uploadFolder)
    return res.status(200).json(result)
  } catch (error) {
    console.error("Cloudinary upload failed:", error)
    const message =
      error instanceof Error ? error.message : "Upload failed"
    return res.status(500).json({ error: message })
  }
}
