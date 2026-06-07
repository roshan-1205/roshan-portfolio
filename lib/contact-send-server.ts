type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  _replyto?: string
  _subject?: string
}

async function parseRemoteResponse(response: Response) {
  const text = await response.text()

  try {
    return JSON.parse(text) as {
      success?: boolean | string
      message?: string
    }
  } catch {
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      throw new Error(
        "Email service returned an invalid response. Use Web3Forms key or email directly.",
      )
    }
    throw new Error("Invalid response from email service.")
  }
}

export async function sendContactEmail(
  data: ContactPayload,
  toEmail: string,
): Promise<{ success: boolean; message: string }> {
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY

  if (web3Key) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: web3Key,
        name: data.name,
        email: data.email,
        subject: data._subject || data.subject,
        message: data.message,
        replyto: data._replyto || data.email,
      }),
    })

    const result = await parseRemoteResponse(response)

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Web3Forms delivery failed")
    }

    return {
      success: true,
      message: "Message sent successfully!",
    }
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`,
    {
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
        _subject: data._subject || `Portfolio · ${data.subject}`,
        _template: "table",
        _captcha: "false",
        _replyto: data._replyto || data.email,
      }),
    },
  )

  const result = await parseRemoteResponse(response)

  const ok =
    response.ok &&
    (result.success === true ||
      result.success === "true" ||
      result.message?.toLowerCase().includes("success"))

  if (!ok) {
    throw new Error(
      result.message || "Form delivery failed. Try again in a moment.",
    )
  }

  return {
    success: true,
    message: "Message sent successfully!",
  }
}
