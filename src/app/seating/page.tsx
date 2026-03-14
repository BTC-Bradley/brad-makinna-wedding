'use client'

import { Metadata } from 'next'
import { useState } from 'react'

// Table layout data — positions as percentages of the venue floor
const TABLES = [
  // Head table (sweetheart/head table) — center top
  { id: 0, number: '♥', label: 'Head Table', x: 50, y: 14, r: 42, isHead: true },
  // Inner ring
  { id: 1, number: 1, label: 'Table 1', x: 28, y: 32, r: 32, isHead: false },
  { id: 2, number: 2, label: 'Table 2', x: 50, y: 30, r: 32, isHead: false },
  { id: 3, number: 3, label: 'Table 3', x: 72, y: 32, r: 32, isHead: false },
  // Middle ring
  { id: 4, number: 4, label: 'Table 4', x: 18, y: 52, r: 32, isHead: false },
  { id: 5, number: 5, label: 'Table 5', x: 36, y: 52, r: 32, isHead: false },
  { id: 6, number: 6, label: 'Table 6', x: 54, y: 52, r: 32, isHead: false },
  { id: 7, number: 7, label: 'Table 7', x: 72, y: 52, r: 32, isHead: false },
  { id: 8, number: 8, label: 'Table 8', x: 88, y: 52, r: 32, isHead: false },
  // Outer ring
  { id: 9, number: 9, label: 'Table 9', x: 22, y: 72, r: 32, isHead: false },
  { id: 10, number: 10, label: 'Table 10', x: 42, y: 72, r: 32, isHead: false },
  { id: 11, number: 11, label: 'Table 11', x: 62, y: 72, r: 32, isHead: false },
  { id: 12, number: 12, label: 'Table 12', x: 82, y: 72, r: 32, isHead: false },
]

// Decorative elements
const DANCE_FLOOR = { x: 50, y: 88, w: 28, h: 12 }

function TableCircle({
  table,
  svgWidth,
  svgHeight,
}: {
  table: (typeof TABLES)[0]
  svgWidth: number
  svgHeight: number
}) {
  const [hovered, setHovered] = useState(false)
  const cx = (table.x / 100) * svgWidth
  const cy = (table.y / 100) * svgHeight

  if (table.isHead) {
    // Rectangular head table
    const w = (table.r * 3.8 / 100) * svgWidth
    const h = (table.r * 0.9 / 100) * svgHeight
    return (
      <g
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
      >
        <rect
          x={cx - w / 2}
          y={cy - h / 2}
          width={w}
          height={h}
          rx={6}
          fill={hovered ? '#b5944a' : '#c9a96e'}
          stroke="#8a6a35"
          strokeWidth={1.5}
          style={{ transition: 'fill 0.25s ease' }}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={Math.round(svgHeight * 0.022)}
          fontFamily="Georgia, serif"
          fill="white"
          fontWeight="600"
          letterSpacing="0.5"
        >
          Bradley &amp; MaKinna
        </text>
        {/* Chair dots around head table */}
        {Array.from({ length: 8 }).map((_, i) => {
          const chairX = cx - w / 2 + (w / 9) * (i + 1)
          return (
            <circle
              key={i}
              cx={chairX}
              cy={cy - h / 2 - 6}
              r={4}
              fill={hovered ? '#d4a855' : '#e8c88a'}
              stroke="#b5944a"
              strokeWidth={1}
              style={{ transition: 'fill 0.25s ease' }}
            />
          )
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const chairX = cx - w / 2 + (w / 9) * (i + 1)
          return (
            <circle
              key={i + 8}
              cx={chairX}
              cy={cy + h / 2 + 6}
              r={4}
              fill={hovered ? '#d4a855' : '#e8c88a'}
              stroke="#b5944a"
              strokeWidth={1}
              style={{ transition: 'fill 0.25s ease' }}
            />
          )
        })}
      </g>
    )
  }

  const r = (table.r / 100) * Math.min(svgWidth, svgHeight)
  const chairCount = 8
  const chairR = r * 0.22

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Chair circles around table */}
      {Array.from({ length: chairCount }).map((_, i) => {
        const angle = (i / chairCount) * 2 * Math.PI - Math.PI / 2
        const dist = r + chairR + 2
        const chairX = cx + Math.cos(angle) * dist
        const chairY = cy + Math.sin(angle) * dist
        return (
          <circle
            key={i}
            cx={chairX}
            cy={chairY}
            r={chairR}
            fill={hovered ? '#d4a855' : '#e8c88a'}
            stroke="#b5944a"
            strokeWidth={1}
            style={{ transition: 'fill 0.25s ease' }}
          />
        )
      })}
      {/* Table circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={hovered ? '#6b8f6e' : '#7a9f7d'}
        stroke="#4a6b4d"
        strokeWidth={1.5}
        style={{ transition: 'fill 0.25s ease' }}
      />
      {/* Table number */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={Math.round(r * 0.85)}
        fontFamily="Georgia, serif"
        fill="white"
        fontWeight="700"
      >
        {table.number}
      </text>
    </g>
  )
}

export default function SeatingPage() {
  const [tooltip, setTooltip] = useState<string | null>(null)
  const svgW = 700
  const svgH = 520

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Page header */}
      <h1 className="text-sage mb-6 text-center font-serif text-5xl font-light tracking-wide dark:text-amber-400">
        Seating Chart
      </h1>
      <div className="bg-sage/30 mx-auto mb-6 h-1 w-24 dark:bg-amber-400/30" />
      <p className="mb-10 text-center text-base text-gray-500 dark:text-gray-400">
        Find your seat and get ready to celebrate
      </p>

      {/* Coming Soon Banner */}
      <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 px-6 py-4 text-center shadow-sm dark:border-amber-600/40 dark:bg-amber-900/20">
        <p className="font-serif text-lg font-medium text-amber-700 dark:text-amber-300">
          ✨ Seating assignments coming soon ✨
        </p>
        <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
          Check back closer to July 26, 2026 — we&apos;ll have your seat ready!
        </p>
      </div>

      {/* Venue Floor Plan */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-zinc-100 dark:bg-zinc-800 dark:ring-zinc-700">
        {/* Venue label */}
        <div className="border-b border-zinc-100 px-6 py-3 dark:border-zinc-700">
          <p className="text-center font-serif text-sm tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
            Reception Venue — Bird's-Eye View
          </p>
        </div>

        {/* SVG Floor Plan */}
        <div className="p-4">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full"
            style={{ maxHeight: '520px' }}
            aria-label="Wedding reception seating chart floor plan"
          >
            {/* Venue floor */}
            <rect
              x={10}
              y={10}
              width={svgW - 20}
              height={svgH - 20}
              rx={16}
              fill="#f5f0e8"
              stroke="#d4c9b0"
              strokeWidth={2}
            />

            {/* Entry marker */}
            <rect x={svgW / 2 - 30} y={svgH - 26} width={60} height={16} rx={4} fill="#d4c9b0" />
            <text
              x={svgW / 2}
              y={svgH - 15}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={9}
              fontFamily="Georgia, serif"
              fill="#8a7a5a"
              letterSpacing="1"
            >
              ENTRANCE
            </text>

            {/* Dance floor */}
            <rect
              x={(DANCE_FLOOR.x / 100) * svgW - (DANCE_FLOOR.w / 100) * svgW / 2}
              y={(DANCE_FLOOR.y / 100) * svgH - (DANCE_FLOOR.h / 100) * svgH / 2}
              width={(DANCE_FLOOR.w / 100) * svgW}
              height={(DANCE_FLOOR.h / 100) * svgH}
              rx={8}
              fill="#e8e0f0"
              stroke="#c4b8d8"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
            <text
              x={(DANCE_FLOOR.x / 100) * svgW}
              y={(DANCE_FLOOR.y / 100) * svgH}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={10}
              fontFamily="Georgia, serif"
              fill="#9080b0"
              letterSpacing="0.5"
            >
              Dance Floor
            </text>

            {/* Tables */}
            {TABLES.map((table) => (
              <TableCircle
                key={table.id}
                table={table}
                svgWidth={svgW}
                svgHeight={svgH}
              />
            ))}

            {/* Floral corner decorations */}
            <text x={28} y={40} fontSize={20} fontFamily="serif">🌸</text>
            <text x={svgW - 48} y={40} fontSize={20} fontFamily="serif">🌸</text>
            <text x={28} y={svgH - 28} fontSize={16} fontFamily="serif">🌿</text>
            <text x={svgW - 44} y={svgH - 28} fontSize={16} fontFamily="serif">🌿</text>
          </svg>
        </div>

        {/* Legend */}
        <div className="border-t border-zinc-100 px-6 py-4 dark:border-zinc-700">
          <p className="mb-3 text-center text-xs font-medium tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
            Legend
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#c9a96e] ring-1 ring-[#8a6a35]" />
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Head Table</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#7a9f7d] ring-1 ring-[#4a6b4d]" />
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Guest Table</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#e8c88a] ring-1 ring-[#b5944a]" />
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Chair</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-8 rounded bg-[#e8e0f0] ring-1 ring-[#c4b8d8]" />
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Dance Floor</span>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-zinc-400 italic dark:text-zinc-500">
            Hover over any table to highlight it. 12 guest tables · seats approx. 8 per table.
          </p>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Questions about seating?{' '}
          <a
            href="mailto:bradleygordonhanson@gmail.com"
            className="text-sage font-medium underline underline-offset-2 hover:opacity-80 dark:text-amber-400"
          >
            Reach out to us
          </a>
          .
        </p>
      </div>
    </div>
  )
}
