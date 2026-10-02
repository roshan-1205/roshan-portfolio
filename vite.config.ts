import path from "path"
import { defineConfig, loadEnv, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import {
  deletePortfolioImage,
  listPortfolioImages,
} from "./lib/cloudinary-admin-server"
import { sendContactEmail } from "./lib/contact-send-server"
import { uploadPortfolioImage } from "./lib/cloudinary-upload-server"
import type { PortfolioFolder } from "./lib/cloudinary-server-config"
import { ALLOWED_PORTFOLIO_FOLDERS } from "./lib/cloudinary-server-config"

function devApiRoutes(): Plugin {
  return {
    name: "dev-api-routes",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        if (req.method !== "POST") return next()

        let body = ""
        req.on("data", (chunk) => {
          body += chunk
        })

        req.on("end", async () => {
          try {
            const { message, history } = JSON.parse(body) as {
              message?: string
              history?: Array<{ role: string; content: string }>
            }

            if (!message?.trim()) {
              res.statusCode = 400
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ error: "Message is required" }))
              return
            }

            if (message.length > 800) {
              res.statusCode = 400
              res.setHeader("Content-Type", "application/json")
              res.end(
                JSON.stringify({ error: "Message too long (max 800 characters)" }),
              )
              return
            }

            const apiKey = env.GOOGLE_API_KEY
            if (!apiKey) {
              console.error("GOOGLE_API_KEY not found in environment")
              res.statusCode = 500
              res.setHeader("Content-Type", "application/json")
              res.end(
                JSON.stringify({
                  error:
                    "AI assistant is temporarily unavailable. Please use the contact form to reach out directly.",
                }),
              )
              return
            }

            console.log("Chat request received:", {
              messageLength: message.length,
              historyLength: history?.length ?? 0,
              apiKeyPresent: !!apiKey,
            })

            const validHistory = Array.isArray(history)
              ? history
                  .filter(
                    (msg): msg is { role: "user" | "assistant"; content: string } =>
                      typeof msg === "object" &&
                      msg !== null &&
                      (msg.role === "user" || msg.role === "assistant") &&
                      typeof msg.content === "string",
                  )
                  .slice(-12)
              : []

            // Import Google Generative AI and chatbot context
            const { GoogleGenerativeAI } = await import("@google/generative-ai")
            const { chatbotContext } = await import("./src/data/chatbotContext")

            // Initialize Google Generative AI
            const genAI = new GoogleGenerativeAI(apiKey)
            const model = genAI.getGenerativeModel({
              model: "gemini-1.5-flash-latest",
            })

            // Build chat history for Google's format
            const chatHistory = validHistory.map((msg) => ({
              role: msg.role === "assistant" ? "model" : "user",
              parts: [{ text: msg.content }],
            }))

            // Combine system instruction with user message
            const fullPrompt = `${chatbotContext}\n\nConversation history:\n${chatHistory.map(h => `${h.role}: ${h.parts[0].text}`).join('\n')}\n\nUser: ${message.trim()}\n\nAssistant:`

            // Generate content
            const result = await model.generateContent(fullPrompt)
            const response = result.response
            const reply = response.text()

            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ reply }))
          } catch (error) {
            console.error("Chat API handler failed:", error)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(
              JSON.stringify({
                error:
                  "Failed to connect to AI assistant. Please check your network or try again later.",
              }),
            )
          }
        })
      })

      server.middlewares.use("/api/contact", async (req, res, next) => {
        if (req.method !== "POST") return next()

        let body = ""
        req.on("data", (chunk) => {
          body += chunk
        })

        req.on("end", async () => {
          try {
            const payload = JSON.parse(body) as {
              name?: string
              email?: string
              subject?: string
              message?: string
              website?: string
              _replyto?: string
              _subject?: string
            }

            if (payload.website) {
              res.statusCode = 200
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ success: true, message: "ok" }))
              return
            }

            if (
              !payload.name?.trim() ||
              !payload.email?.trim() ||
              !payload.subject?.trim() ||
              !payload.message?.trim()
            ) {
              res.statusCode = 400
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ error: "All fields are required" }))
              return
            }

            const toEmail =
              env.CONTACT_TO_EMAIL || "roshankumarsingh021@gmail.com"
            const result = await sendContactEmail(
              {
                name: payload.name,
                email: payload.email,
                subject: payload.subject,
                message: payload.message,
                _replyto: payload._replyto,
                _subject: payload._subject,
              },
              toEmail,
            )

            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(result))
          } catch (error) {
            console.error("Contact form failed:", error)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(
              JSON.stringify({
                error:
                  error instanceof Error
                    ? error.message
                    : "Failed to send message",
              }),
            )
          }
        })
      })

      server.middlewares.use("/api/images", async (req, res, next) => {
        const folder = new URL(req.url || "", "http://localhost")
          .searchParams.get("folder")
          ?.trim()

        if (req.method === "GET") {
          if (!folder || !ALLOWED_PORTFOLIO_FOLDERS.has(folder)) {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: "Invalid folder" }))
            return
          }

          try {
            const images = await listPortfolioImages(folder as PortfolioFolder)
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ images }))
          } catch (error) {
            console.error("Failed to list portfolio images:", error)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(
              JSON.stringify({
                error:
                  error instanceof Error
                    ? error.message
                    : "Failed to load images",
              }),
            )
          }
          return
        }

        if (req.method === "DELETE") {
          let body = ""
          req.on("data", (chunk) => {
            body += chunk
          })

          req.on("end", async () => {
            try {
              const { folder: deleteFolder, assetId } = JSON.parse(body) as {
                folder?: string
                assetId?: string
              }

              if (
                !deleteFolder ||
                !assetId ||
                !ALLOWED_PORTFOLIO_FOLDERS.has(deleteFolder)
              ) {
                res.statusCode = 400
                res.setHeader("Content-Type", "application/json")
                res.end(JSON.stringify({ error: "Invalid folder or assetId" }))
                return
              }

              await deletePortfolioImage(
                deleteFolder as PortfolioFolder,
                assetId,
              )
              res.statusCode = 200
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ success: true }))
            } catch (error) {
              console.error("Failed to delete portfolio image:", error)
              res.statusCode = 500
              res.setHeader("Content-Type", "application/json")
              res.end(
                JSON.stringify({
                  error:
                    error instanceof Error
                      ? error.message
                      : "Failed to delete image",
                }),
              )
            }
          })
          return
        }

        return next()
      })

      server.middlewares.use("/api/upload", async (req, res, next) => {
        if (req.method !== "POST") {
          return next()
        }

        let body = ""
        req.on("data", (chunk) => {
          body += chunk
        })

        req.on("end", async () => {
          try {
            const { image, assetId, projectId, folder } = JSON.parse(body) as {
              image?: string
              assetId?: string
              projectId?: string
              folder?: string
            }

            const id = assetId || projectId
            const uploadFolder = folder || "portfolio-projects"

            if (!image || !id) {
              res.statusCode = 400
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ error: "Missing image or assetId" }))
              return
            }

            const result = await uploadPortfolioImage(image, id, uploadFolder)
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(result))
          } catch (error) {
            console.error("Cloudinary upload failed:", error)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(
              JSON.stringify({
                error:
                  error instanceof Error
                    ? error.message
                    : "Upload failed",
              }),
            )
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
let env: Record<string, string> = {}

export default defineConfig(({ mode }) => {
  env = loadEnv(mode, process.cwd(), "")

  process.env.CLOUDINARY_CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME
  process.env.WEB3FORMS_ACCESS_KEY = env.WEB3FORMS_ACCESS_KEY
  process.env.CONTACT_TO_EMAIL = env.CONTACT_TO_EMAIL
  process.env.CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY
  process.env.CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET
  process.env.GOOGLE_API_KEY = env.GOOGLE_API_KEY

  return {
    plugins: [react(), tailwindcss(), devApiRoutes()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
