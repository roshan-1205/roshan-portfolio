/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDINARY_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string
  readonly VITE_WEB3FORMS_ACCESS_KEY: string
  readonly VITE_CONTACT_FORM_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
