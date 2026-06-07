import { useCallback, useMemo, useState } from "react"
import { certifications } from "@/data/portfolio"
import {
  getCustomCertificates,
  removeCustomCertificate,
  saveCustomCertificate,
  slugify,
  uniqueId,
} from "@/lib/custom-items"
import { clearCertificateImage } from "@/lib/certificate-images"
import type { Certification } from "@/types/certificate"

export type NewCertificateInput = {
  title: string
  issuer: string
  instructor?: string
  year: string
  credential: string
  skills: string
}

function parseList(value: string) {
  return value
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function useCertificatesList() {
  const [customCerts, setCustomCerts] = useState(getCustomCertificates)

  const certs = useMemo(
    () => [...certifications, ...customCerts],
    [customCerts],
  )

  const refresh = useCallback(() => {
    setCustomCerts(getCustomCertificates())
  }, [])

  const addCertificate = useCallback(
    (input: NewCertificateInput) => {
      const baseId = slugify(input.title) || "certificate"
      const cert: Certification = {
        id: uniqueId(baseId),
        title: input.title.trim(),
        issuer: input.issuer.trim(),
        instructor: input.instructor?.trim() || undefined,
        year: input.year.trim() || new Date().getFullYear().toString(),
        credential: input.credential.trim() || "—",
        skills: parseList(input.skills),
        isCustom: true,
      }

      saveCustomCertificate(cert)
      refresh()
      return cert
    },
    [refresh],
  )

  const deleteCertificate = useCallback(
    (id: string) => {
      removeCustomCertificate(id)
      clearCertificateImage(id)
      refresh()
    },
    [refresh],
  )

  return { certs, addCertificate, deleteCertificate }
}
