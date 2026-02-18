"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const NAV_ITEMS = [
  { label: "Overview", index: 0 },
  { label: "Compute", index: 1 },
  { label: "Networking", index: 2 },
  { label: "Storage", index: 3 },
  { label: "Power", index: 4 },
  { label: "Pricing", index: 5 },
]

export function NavBar({
  activeSection,
  onNavigate,
}: {
  activeSection: number
  onNavigate: (index: number) => void
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-foreground">
          <span className="text-primary">Un</span>SI
        </span>
      </div>

      <div className="hidden items-center gap-1 md:flex">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.index}
            onClick={() => onNavigate(item.index)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeSection === item.index
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Link
        href="/contact"
        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Contact Us
      </Link>
    </nav>
  )
}
