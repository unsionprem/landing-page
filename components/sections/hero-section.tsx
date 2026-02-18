"use client"

import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen snap-start snap-always flex-col items-center justify-center px-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-sm tracking-widest uppercase text-primary">
            Introducing
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
            <span className="text-primary">Un</span>SI
          </h1>
        </div>

        <p className="text-2xl font-medium leading-relaxed text-foreground md:text-3xl lg:text-4xl">
          The cloud you own.
        </p>

        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          On-demand elastic resources. On-prem economics and governance.
          Together for the very first time.
        </p>

        <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
          <button className="rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Get a Demo
          </button>
          <button className="rounded-lg border border-border px-8 py-3 font-medium text-foreground transition-colors hover:bg-secondary">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce text-muted-foreground">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  )
}
