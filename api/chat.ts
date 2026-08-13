import type { VercelRequest, VercelResponse } from "@vercel/node"
import { chatbotContext } from "../src/data/chatbotContext"

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
const MODEL = "claude-3-5-sonnet-20241022"
const MAX_TOKENS = 400
const MAX_MESSAGE_LENGTH = 800
const MAX_HISTORY_MESSAGES = 12

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface AnthropicMessage {
  role: "user" | "assistant"
  content: string
}

interface AnthropicResponse {
  content: Array<{ type: string; text: string }>
  error?: { message: string }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // Check API key early
  if (!ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not configured")
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

  // Build messages array
  const messages: AnthropicMessage[] = [
    ...validHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: "user" as const, content: message.trim() },
  ]

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: chatbotContext,
        messages,
      }),
    })

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as {
        error?: { message?: string }
      }
      const errorMessage =
        errorData?.error?.message ?? `HTTP ${response.status}`

      console.error(
        `Anthropic API error: ${response.status} - ${errorMessage}`,
      )

      // User-facing error message
      return res.status(500).json({
        error:
          "AI assistant encountered an error. Please try again or use the contact form.",
      })
    }

    const data = (await response.json()) as AnthropicResponse

    const reply =
      data.content?.[0]?.text ??
      "I couldn't generate a response. Please try again."

    return res.status(200).json({ reply })
  } catch (error) {
    console.error("Chat API handler failed:", error)
    return res.status(500).json({
      error:
        "Failed to connect to AI assistant. Please check your network or try again later.",
    })
  }
}
