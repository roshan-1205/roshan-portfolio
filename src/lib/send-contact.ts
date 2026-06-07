import type { ContactFormData } from "@/lib/contact-schema"
import { personal } from "@/data/portfolio"

type SendContactResult = {
  success: boolean
  message: string
}

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(personal.email)}`
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

async function parseServiceResponse(response: Response): Promise<SendContactResult> {
  const text = await response.text()

  let payload: {
    success?: boolean | string
    message?: string
    error?: string
  } = {}

  try {
    payload = JSON.parse(text) as typeof payload
  } catch {
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      throw new Error(
        "Contact service unavailable right now. Please use Email directly instead.",
      )
    }
    throw new Error("Unexpected response from contact service.")
  }

  const ok =
    response.ok &&
    (payload.success === true ||
      payload.success === "true" ||
      payload.message?.toLowerCase().includes("success"))

  if (!ok) {
    const hint = payload.message?.toLowerCase().includes("activate")
      ? " Check your inbox for a FormSubmit activation link (first-time setup)."
      : ""
    throw new Error(
      (payload.message || payload.error || "Could not send your message.") + hint,
    )
  }

  return {
    success: true,
    message: payload.message || "Message sent successfully!",
  }
}

export async function sendContactMessage(
  data: ContactFormData,
): Promise<SendContactResult> {
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (web3Key) {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3Key,
        name: data.name,
        email: data.email,
        subject: `Portfolio · ${data.subject}`,
        message: data.message,
        replyto: data.email,
      }),
    })

    return parseServiceResponse(response)
  }

  const endpoint =
    import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? FORMSUBMIT_ENDPOINT

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      _subject: `Portfolio · ${data.subject}`,
      _template: "table",
      _captcha: "false",
      _replyto: data.email,
    }),
  })

  return parseServiceResponse(response)
}

export function getDirectEmailFallback() {
  return personal.email
}
