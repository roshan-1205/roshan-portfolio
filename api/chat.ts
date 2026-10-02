import type { VercelRequest, VercelResponse } from "@vercel/node"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { chatbotContext } from "../src/data/chatbotContext"

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const MODEL = "gemini-1.5-flash"
const MAX_TOKENS = 400
const MAX_MESSAGE_LENGTH = 800
const MAX_HISTORY_MESSAGES = 12

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // Check API key early
  if (!GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY is not configured")
    return res.status(500).json({
      error:
        "AI assistant is temporarily unavailable. Please use the contact form to reach out directly.",
    })
  }

  const { message, history } = req.body as {
    message?: string
    history?: ChatMessage[]
  }

  // Validate message
  if (!message?.trim()) {
    return res.status(400).json({ error: "Message is required" })
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)`,
    })
  }

  // Validate and cap history
  const validHistory = Array.isArray(history)
    ? history
        .filter(
          (msg): msg is ChatMessage =>
            typeof msg === "object" &&
            msg !== null &&
            (msg.role === "user" || msg.role === "assistant") &&
            typeof msg.content === "string",
        )
        .slice(-MAX_HISTORY_MESSAGES)
    : []

  try {
    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY)
    const model = genAI.getGenerativeModel({ 
      model: MODEL,
      systemInstruction: chatbotContext,
    })

    // Build chat history for Google's format
    const chatHistory = validHistory.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }))

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: MAX_TOKENS,
        temperature: 0.7,
      },
    })

    // Send message and get response
    const result = await chat.sendMessage(message.trim())
    const response = await result.response
    const reply = response.text()

    if (!reply) {
      return res.status(500).json({
        error: "I couldn't generate a response. Please try again.",
      })
    }

    return res.status(200).json({ reply })
  } catch (error) {
    console.error("Chat API handler failed:", error)
    
    // Check for specific Google API errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("authentication")) {
      return res.status(500).json({
        error: "AI assistant configuration error. Please contact the site owner.",
      })
    }

    if (errorMessage.includes("quota") || errorMessage.includes("rate limit")) {
      return res.status(429).json({
        error: "AI assistant is busy. Please try again in a moment.",
      })
    }

    return res.status(500).json({
      error:
        "Failed to connect to AI assistant. Please check your network or try again later.",
    })
  }
}
