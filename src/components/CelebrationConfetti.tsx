'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  color: string
  width: number
  height: number
  opacity: number
}

const COLORS = [
  '#9CAF88',
  '#E8B4BC',
  '#FFFFF0',
  '#FFD700',
  '#FF8FAB',
  '#B5A99C',
  '#FFFFFF',
]

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: -20 - Math.random() * height * 0.5,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    width: Math.random() * 8 + 4,
    height: Math.random() * 6 + 3,
    opacity: Math.random() * 0.5 + 0.5,
  }
}

export default function CelebrationConfetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrame = 0
    let particles: Particle[] = []
    let burstsRemaining = 6

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const burst = () => {
      const count = 80
      for (let i = 0; i < count; i++) {
        const particle = createParticle(canvas.width, canvas.height)
        particle.x = canvas.width * 0.5 + (Math.random() - 0.5) * canvas.width * 0.6
        particle.y = canvas.height * 0.35
        particle.vy = -(Math.random() * 8 + 4)
        particle.vx = (Math.random() - 0.5) * 10
        particles.push(particle)
      }
    }

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      particles = particles.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.08
        particle.vx *= 0.99
        particle.rotation += particle.rotationSpeed

        context.save()
        context.translate(particle.x, particle.y)
        context.rotate((particle.rotation * Math.PI) / 180)
        context.globalAlpha = particle.opacity
        context.fillStyle = particle.color
        context.fillRect(
          -particle.width / 2,
          -particle.height / 2,
          particle.width,
          particle.height,
        )
        context.restore()

        return particle.y < canvas.height + 40 && particle.opacity > 0.05
      })

      if (particles.length < 120 && Math.random() < 0.3) {
        particles.push(createParticle(canvas.width, canvas.height))
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    burst()
    const burstInterval = window.setInterval(() => {
      burstsRemaining -= 1
      burst()
      if (burstsRemaining <= 0) {
        window.clearInterval(burstInterval)
      }
    }, 700)

    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearInterval(burstInterval)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden="true"
    />
  )
}