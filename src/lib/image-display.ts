export function withCacheBust(url: string, version: number) {
  if (!url || version <= 0) return url
  const separator = url.includes("?") ? "&" : "?"
  return `${url}${separator}v=${version}`
}

export function blurActiveElement() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}
