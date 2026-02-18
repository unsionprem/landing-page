"use client"

import type { ReactNode } from "react"

interface FeatureSectionProps {
  label: string
  title: string
  description: string
  features: { title: string; description: string }[]
  icon: ReactNode
  accentColor: string
}

export function FeatureSection({
  label,
  title,
  description,
  features,
  icon,
  accentColor,
}: FeatureSectionProps) {
  return (
    <section className="relative flex min-h-screen snap-start snap-always items-center px-6 py-20">
      {/* Content positioned on the left side, leaving the right open for the rack highlight */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-center">
        {/* Left side: content (takes ~55% on desktop) */}
        <div className="flex flex-col gap-8 lg:w-[55%]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl border backdrop-blur-sm"
                style={{
                  borderColor: `${accentColor}44`,
                  backgroundColor: `${accentColor}11`,
                }}
              >
                <div style={{ color: accentColor }} className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-[1.5]">
                  {icon}
                </div>
              </div>
              <span
                className="font-mono text-sm tracking-widest uppercase"
                style={{ color: accentColor }}
              >
                {label}
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-xl border p-5 backdrop-blur-md transition-colors"
                style={{
                  borderColor: `${accentColor}22`,
                  backgroundColor: "rgba(8, 10, 20, 0.7)",
                }}
              >
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: empty space for rack highlight visibility */}
        <div className="hidden lg:block lg:w-[45%]" />
      </div>
    </section>
  )
}
