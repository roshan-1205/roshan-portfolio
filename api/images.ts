import type { VercelRequest, VercelResponse } from "@vercel/node"
import {
  deletePortfolioImage,
  listPortfolioImages,
} from "../lib/cloudinary-admin-server"
import {
  ALLOWED_PORTFOLIO_FOLDERS,
  type PortfolioFolder,
} from "../lib/cloudinary-server-config"

function isValidAssetId(assetId: string) {
  return /^[\w-]+$/.test(assetId)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const folder = (req.query.folder as string | undefined)?.trim()

    if (!folder || !ALLOWED_PORTFOLIO_FOLDERS.has(folder)) {
      return res.status(400).json({ error: "Invalid folder" })
    }

    try {
      const images = await listPortfolioImages(folder as PortfolioFolder)
      return res.status(200).json({ images })
    } catch (error) {
      console.error("Failed to list portfolio images:", error)
      const message =
        error instanceof Error ? error.message : "Failed to load images"
      return res.status(500).json({ error: message })
    }
  }

  if (req.method === "DELETE") {
    const { folder, assetId } = req.body as {
      folder?: string
      assetId?: string
    }

    if (!folder || !assetId || !ALLOWED_PORTFOLIO_FOLDERS.has(folder)) {
      return res.status(400).json({ error: "Invalid folder or assetId" })
    }

    if (!isValidAssetId(assetId)) {
      return res.status(400).json({ error: "Invalid assetId" })
    }

    try {
      await deletePortfolioImage(folder as PortfolioFolder, assetId)
      return res.status(200).json({ success: true })
    } catch (error) {
      console.error("Failed to delete portfolio image:", error)
      const message =
        error instanceof Error ? error.message : "Failed to delete image"
      return res.status(500).json({ error: message })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}
