import { useEffect, useRef } from "react"

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    let width = 0
    let height = 0
    let mouseX = 0
    let mouseY = 0
    let warp = 0

    const stars: { x: number; y: number; z: number; size: number }[] = []

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const initStars = () => {
      stars.length = 0
      for (let i = 0; i < 300; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width,
          size: Math.random() * 1.5 + 0.5,
        })
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / width - 0.5) * 20
      mouseY = (e.clientY / height - 0.5) * 20
    }

    const draw = () => {
      ctx.fillStyle = "rgba(2, 2, 7, 0.25)"
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2 + mouseX
      const cy = height / 2 + mouseY

      for (const star of stars) {
        star.z -= 0.5 + warp * 2
        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2
          star.y = Math.random() * height - height / 2
          star.z = width
        }

        const sx = (star.x / star.z) * width + cx
        const sy = (star.y / star.z) * height + cy
        const size = (1 - star.z / width) * star.size * 2
        const alpha = Math.min(1, (1 - star.z / width) * 1.5)

        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.8})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    initStars()
    window.addEventListener("resize", () => {
      resize()
      initStars()
    })
    window.addEventListener("mousemove", onMouseMove)

    const warpTimer = setTimeout(() => {
      warp = 1
      setTimeout(() => {
        warp = 0
      }, 2000)
    }, 500)

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(warpTimer)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-60"
      aria-hidden="true"
    />
  )
}
