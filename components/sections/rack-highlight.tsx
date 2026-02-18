"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// Original image dimensions
const IMG_W = 1456
const IMG_H = 816

interface Zone {
  /** Coordinates as percentages of the original image */
  x: number
  y: number
  w: number
  h: number
  color: string
}

// Zones defined as percentages of the original 1456x816 image
const ZONES: Record<number, Zone> = {
  // Compute: madrid + istanbul blocks (top of rack)
  1: { x: 45.7, y: 15.5, w: 9.8, h: 20, color: "#22d3ee" },
  // Networking: teal milan block
  2: { x: 45.7, y: 31.5, w: 9.8, h: 5.5, color: "#34d399" },
  // Storage: paris + bruxelles
  3: { x: 45.7, y: 36, w: 9.8, h: 42.5, color: "#fbbf24" },
  // Efficient Power: bottom white milan
  4: { x: 45.7, y: 77, w: 9.8, h: 9.5, color: "#f472b6" },
}

interface PixelRect {
  left: number
  top: number
  width: number
  height: number
}

function getContainedImageBounds(vpW: number, vpH: number) {
  const imgRatio = IMG_W / IMG_H
  const vpRatio = vpW / vpH
  let renderedW: number, renderedH: number
  if (vpRatio > imgRatio) {
    renderedH = vpH
    renderedW = vpH * imgRatio
  } else {
    renderedW = vpW
    renderedH = vpW / imgRatio
  }
  return {
    offsetX: (vpW - renderedW) / 2,
    offsetY: (vpH - renderedH) / 2,
    renderedW,
    renderedH,
  }
}

function zoneToPixels(zone: Zone, vpW: number, vpH: number, padding: number): PixelRect {
  const { offsetX, offsetY, renderedW, renderedH } = getContainedImageBounds(vpW, vpH)
  return {
    left: offsetX + (zone.x / 100) * renderedW - padding,
    top: offsetY + (zone.y / 100) * renderedH - padding,
    width: (zone.w / 100) * renderedW + padding * 2,
    height: (zone.h / 100) * renderedH + padding * 2,
  }
}

export function RackHighlight({ activeSection }: { activeSection: number }) {
  const [rect, setRect] = useState<PixelRect | null>(null)
  const [color, setColor] = useState("#22d3ee")
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const update = useCallback(() => {
    const zone = ZONES[activeSection]
    if (!zone || !containerRef.current) {
      setIsVisible(false)
      return
    }
    const { clientWidth: vpW, clientHeight: vpH } = containerRef.current
    const pad = Math.min(vpW, vpH) * 0.008
    setRect(zoneToPixels(zone, vpW, vpH, pad))
    setColor(zone.color)
    requestAnimationFrame(() => setIsVisible(true))
  }, [activeSection])

  useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [update])

  const transition = "0.7s cubic-bezier(0.4,0,0.2,1)"
  const overlayBg = "rgba(8, 10, 20, 0.82)"
  const active = isVisible && rect

  // Default values when no rect to avoid layout flash
  const r = rect ?? { left: 0, top: 0, width: 0, height: 0 }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    >
      {/* 4 overlay panels forming a frame around the cutout */}
      {/* Top panel */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: active ? r.top : "100%",
          backgroundColor: overlayBg,
          opacity: active ? 1 : 0,
          transition: `height ${transition}, opacity 0.6s ease`,
        }}
      />
      {/* Bottom panel */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: active ? r.top + r.height : "100%",
          right: 0,
          bottom: 0,
          backgroundColor: overlayBg,
          opacity: active ? 1 : 0,
          transition: `top ${transition}, opacity 0.6s ease`,
        }}
      />
      {/* Left panel */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: active ? r.top : 0,
          width: active ? r.left : 0,
          height: active ? r.height : 0,
          backgroundColor: overlayBg,
          opacity: active ? 1 : 0,
          transition: `top ${transition}, width ${transition}, height ${transition}, opacity 0.6s ease`,
        }}
      />
      {/* Right panel */}
      <div
        style={{
          position: "absolute",
          left: active ? r.left + r.width : "100%",
          top: active ? r.top : 0,
          right: 0,
          height: active ? r.height : 0,
          backgroundColor: overlayBg,
          opacity: active ? 1 : 0,
          transition: `left ${transition}, top ${transition}, height ${transition}, opacity 0.6s ease`,
        }}
      />

      {/* Glowing border rectangle */}
      <div
        className="absolute rounded-lg"
        style={{
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
          border: `2px solid ${color}`,
          boxShadow: `0 0 24px ${color}55, 0 0 48px ${color}22, inset 0 0 24px ${color}0a`,
          opacity: active ? 1 : 0,
          transition: `left ${transition}, top ${transition}, width ${transition}, height ${transition}, border-color 0.5s ease, box-shadow 0.5s ease, opacity 0.6s ease`,
        }}
      />

      {/* Outer glow ring */}
      <div
        className="absolute rounded-xl"
        style={{
          left: r.left - 5,
          top: r.top - 5,
          width: r.width + 10,
          height: r.height + 10,
          border: `1px solid ${color}33`,
          boxShadow: `0 0 40px ${color}18`,
          opacity: active ? 1 : 0,
          transition: `left ${transition}, top ${transition}, width ${transition}, height ${transition}, border-color 0.5s ease, box-shadow 0.5s ease, opacity 0.6s ease`,
        }}
      />
    </div>
  )
}
