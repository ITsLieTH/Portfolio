import { useEffect, useRef } from 'react'
import './Ambient.css'

function Ambient() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!ctx) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    let width = 0
    let height = 0
    let dpr = 1

    let stars = []
    let flashes = []
    let shootingStars = []

    let animationId
    let lastFrame = 0
    let elapsed = 0
    let previousTime = 0
    let nextShootingStar = 0

    const random = (min, max) =>
      min + Math.random() * (max - min)

    // Create the background stars.
    function createStars() {
      const count = Math.min(
        220,
        Math.max(100, Math.floor((width * height) / 6500))
      )

      stars = Array.from({ length: count }, () => {
        const size = random(1.2, 3.2)
        const speed = random(5, 20)

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speed,
          opacity: random(0.3, 0.95),
          twinkleSpeed: random(0.5, 2),
          phase: random(0, Math.PI * 2),
        }
      })

      // Create cross-shaped flashing stars.
      flashes = Array.from({ length: 7 }, () => ({
        x: random(0, width),
        y: random(0, height),
        size: random(5, 11),
        duration: random(2.5, 5),
        delay: random(0, 5),
        startTime: random(0, 8),
      }))
    }

    // Create a shooting star.
    function createShootingStar() {
      return {
        x: random(width * 0.05, width * 0.85),
        y: random(-height * 0.1, height * 0.45),
        length: random(100, 220),
        speed: random(500, 900),
        angle: Math.PI / 4,
        opacity: random(0.55, 0.95),
        life: 0,
        duration: random(0.7, 1.15),
      }
    }

    // Resize canvas for different screens.
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      createStars()

      shootingStars = []
      nextShootingStar = elapsed + random(2, 5)

      render(elapsed, false)
    }

    // Draw ordinary pixel stars.
    function drawPixelStar(star, time, animate) {
      const twinkle = animate
        ? 0.7 +
          0.3 * Math.sin(time * star.twinkleSpeed + star.phase)
        : 1

      ctx.globalAlpha = star.opacity * twinkle
      ctx.fillStyle = '#FFFFFF'

      ctx.fillRect(
        Math.round(star.x),
        Math.round(star.y),
        Math.ceil(star.size),
        Math.ceil(star.size)
      )

      ctx.globalAlpha = 1
    }

    // Draw four-point flashing stars.
    function drawFlash(flash, time, animate) {
      const cycle = flash.duration + flash.delay

      const progress = animate
        ? ((time + flash.startTime) % cycle) / cycle
        : 0.5

      if (progress > flash.duration / cycle) return

      const normalized = progress / (flash.duration / cycle)

      const envelope = Math.sin(Math.PI * normalized)

      if (envelope < 0.025) return

      const pulse =
        0.65 + 0.35 * Math.sin(normalized * Math.PI * 4)

      const radius = flash.size * (0.65 + envelope * pulse)

      ctx.save()

      ctx.translate(flash.x, flash.y)
      ctx.globalAlpha = envelope * 0.95
      ctx.strokeStyle = '#FFFFFF'
      ctx.fillStyle = '#FFFFFF'
      ctx.lineWidth = 1

      ctx.shadowColor = 'rgba(255, 255, 255, 0.9)'
      ctx.shadowBlur = radius * 1.4

      ctx.beginPath()

      ctx.moveTo(-radius, 0)
      ctx.lineTo(radius, 0)

      ctx.moveTo(0, -radius)
      ctx.lineTo(0, radius)

      ctx.stroke()

      ctx.fillRect(-1, -1, 2, 2)

      ctx.restore()
    }

    // Draw shooting star and its fading trail.
    function drawShootingStar(star) {
      const progress = star.life / star.duration

      const fadeIn = Math.min(progress * 5, 1)
      const fadeOut = Math.min((1 - progress) * 4, 1)

      const opacity = star.opacity * fadeIn * fadeOut

      const tailX = star.x - Math.cos(star.angle) * star.length
      const tailY = star.y - Math.sin(star.angle) * star.length

      const gradient = ctx.createLinearGradient(
        tailX,
        tailY,
        star.x,
        star.y
      )

      gradient.addColorStop(0, 'rgba(255,255,255,0)')
      gradient.addColorStop(0.7, `rgba(255,255,255,${opacity * 0.2})`)
      gradient.addColorStop(1, `rgba(255,255,255,${opacity})`)

      ctx.save()

      ctx.globalAlpha = 1
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'

      ctx.shadowColor = '#FFFFFF'
      ctx.shadowBlur = 9

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(star.x, star.y)
      ctx.stroke()

      // Bright head.
      ctx.globalAlpha = opacity
      ctx.fillStyle = '#FFFFFF'
      ctx.shadowBlur = 14

      ctx.beginPath()
      ctx.arc(star.x, star.y, 1.8, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // Update background stars.
    function updateStars(delta) {
      for (const star of stars) {
        star.x += star.speed * delta
        star.y += star.speed * delta * 0.72

        if (star.x > width + 5 || star.y > height + 5) {
          if (Math.random() > 0.5) {
            star.x = random(-width * 0.2, width * 0.7)
            star.y = -5
          } else {
            star.x = -5
            star.y = random(-height * 0.2, height * 0.7)
          }
        }
      }
    }

    // Manage shooting star spawning and movement.
    function updateShootingStars(delta) {
      if (elapsed >= nextShootingStar) {
        shootingStars.push(createShootingStar())

        nextShootingStar = elapsed + random(4, 9)
      }

      for (const star of shootingStars) {
        star.life += delta

        star.x += Math.cos(star.angle) * star.speed * delta
        star.y += Math.sin(star.angle) * star.speed * delta
      }

      shootingStars = shootingStars.filter(
        star => star.life < star.duration
      )
    }

    // Render everything.
    function render(time, animate = true) {
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        drawPixelStar(star, time, animate)
      }

      for (const flash of flashes) {
        drawFlash(flash, time, animate)
      }

      for (const star of shootingStars) {
        drawShootingStar(star)
      }
    }

    // Main animation loop.
    function animate(time) {
      animationId = requestAnimationFrame(animate)

      if (time - lastFrame < 1000 / 30) return

      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 0

      previousTime = time
      lastFrame = time
      elapsed += delta

      updateStars(delta)
      updateShootingStars(delta)

      render(elapsed)
    }

    function start() {
      cancelAnimationFrame(animationId)

      previousTime = 0
      lastFrame = 0

      if (reducedMotion.matches) {
        shootingStars = []
        render(elapsed, false)
        return
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    start()

    window.addEventListener('resize', resize)
    reducedMotion.addEventListener('change', start)

    return () => {
      cancelAnimationFrame(animationId)

      window.removeEventListener('resize', resize)
      reducedMotion.removeEventListener('change', start)
    }
  }, [])

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-light" />
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  )
}

export default Ambient