import type { VercelRequest, VercelResponse } from "@vercel/node"
import { sendContactEmail } from "../lib/contact-send-server"

const TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "roshankumarsingh021@gmail.com"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { name, email, subject, message, _replyto, _subject, website } =
    req.body as {
      name?: string
      email?: string
      subject?: string
      message?: string
      _replyto?: string
      _subject?: string
      website?: string
    }

  if (website) {
    return res.status(200).json({ success: true, message: "ok" })
  }

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "All fields are required" })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" })
  }

  try {
    const result = await sendContactEmail(
      { name, email, subject, message, _replyto, _subject },
      TO_EMAIL,
    )
    return res.status(200).json(result)
  } catch (error) {
    console.error("Contact form failed:", error)
    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.",
    })
  }
}
