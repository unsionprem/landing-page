"use client"

import { useState } from "react"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

const CONFIG = {
  label: "Equivalent Configuration",
  specs: [
    { key: "Compute", value: "2,048 vCPUs / 256 cores" },
    { key: "Memory", value: "4 TB DDR5 ECC" },
    { key: "Storage", value: "200 TB NVMe SSD" },
    { key: "Networking", value: "2 x 100 GbE" },
    { key: "GPU", value: "8 x NVIDIA L40S" },
  ],
}

type Period = "1yr" | "3yr" | "5yr"

interface ProviderPricing {
  name: string
  color: string
  monthly: Record<Period, number>
  notes: string
}

const PROVIDERS: ProviderPricing[] = [
  {
    name: "AWS",
    color: "#FF9900",
    monthly: { "1yr": 89400, "3yr": 67200, "5yr": 62500 },
    notes: "EC2 Reserved + EBS + Direct Connect",
  },
  {
    name: "Azure",
    color: "#0078D4",
    monthly: { "1yr": 86200, "3yr": 64800, "5yr": 60100 },
    notes: "VMs Reserved + Managed Disks + ExpressRoute",
  },
  {
    name: "GCP",
    color: "#4285F4",
    monthly: { "1yr": 82500, "3yr": 61900, "5yr": 57800 },
    notes: "Committed Use + Persistent Disks + Interconnect",
  },
]

const UNSI_MONTHLY: Record<Period, number> = {
  "1yr": 32500,
  "3yr": 22800,
  "5yr": 18200,
}

const PERIOD_LABELS: Record<Period, string> = {
  "1yr": "1 Year",
  "3yr": "3 Years",
  "5yr": "5 Years",
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPercentSaved(cloud: number, onprem: number) {
  return Math.round(((cloud - onprem) / cloud) * 100)
}

export function PricingSection() {
  const [period, setPeriod] = useState<Period>("3yr")

  const avgCloud =
    PROVIDERS.reduce((sum, p) => sum + p.monthly[period], 0) / PROVIDERS.length
  const savingsPercent = formatPercentSaved(avgCloud, UNSI_MONTHLY[period])
  const totalMonths =
    period === "1yr" ? 12 : period === "3yr" ? 36 : 60
  const totalSaved = Math.round(
    (avgCloud - UNSI_MONTHLY[period]) * totalMonths
  )

  return (
    <section className="relative flex min-h-screen snap-start snap-always items-center px-6 py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-sm tracking-widest uppercase text-primary">
            Total Cost of Ownership
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Own your cloud.
            <br />
            <span className="text-primary">Own your savings.</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A single UnSI rack replaces tens of thousands of dollars in monthly
            cloud spend. No egress fees. No surprise bills. Predictable
            economics from day one.
          </p>
        </div>

        {/* Period toggle */}
        <div className="flex items-center gap-1 self-start rounded-lg border border-border p-1"
          style={{ backgroundColor: "rgba(8, 10, 20, 0.7)" }}
        >
          {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${
                period === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-6">
          {/* UnSI card -- highlighted */}
          <div
            className="flex flex-1 flex-col gap-6 rounded-2xl border-2 border-primary p-8 backdrop-blur-md"
            style={{ backgroundColor: "rgba(8, 10, 20, 0.8)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-foreground">
                  <span className="text-primary">Un</span>SI Rack
                </span>
                <span className="text-sm text-muted-foreground">
                  On-premises, you own it
                </span>
              </div>
              <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                Best Value
              </div>
            </div>

            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold tracking-tight text-foreground">
                {formatCurrency(UNSI_MONTHLY[period])}
              </span>
              <span className="mb-1.5 text-muted-foreground">/mo</span>
            </div>

            <p className="text-sm text-muted-foreground">
              Amortized cost including hardware, power, cooling, and support.
              No egress fees, no per-API charges.
            </p>

            {/* Specs */}
            <div className="flex flex-col gap-3 border-t border-border pt-6">
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                {CONFIG.label}
              </span>
              {CONFIG.specs.map((spec) => (
                <div key={spec.key} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{spec.key}:</span>
                  <span className="font-medium text-foreground">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Cloud providers */}
          <div className="flex flex-1 flex-col gap-4 lg:flex-[2]">
            {PROVIDERS.map((provider) => {
              const diff = formatPercentSaved(
                provider.monthly[period],
                UNSI_MONTHLY[period]
              )
              return (
                <div
                  key={provider.name}
                  className="flex flex-col gap-4 rounded-xl border border-border p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
                  style={{ backgroundColor: "rgba(8, 10, 20, 0.7)" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold"
                      style={{
                        backgroundColor: `${provider.color}18`,
                        color: provider.color,
                      }}
                    >
                      {provider.name.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-lg font-semibold text-foreground">
                        {provider.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {provider.notes}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-2xl font-bold text-foreground">
                        {formatCurrency(provider.monthly[period])}
                        <span className="text-sm font-normal text-muted-foreground">
                          /mo
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {PERIOD_LABELS[period]} commitment
                      </span>
                    </div>
                    <div className="flex h-10 items-center rounded-lg bg-destructive/10 px-3">
                      <span className="text-sm font-semibold text-destructive">
                        +{diff}% vs UnSI
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Summary savings banner */}
            <div
              className="mt-2 flex flex-col items-center gap-3 rounded-xl border border-primary/30 p-8 text-center backdrop-blur-md sm:flex-row sm:justify-between sm:text-left"
              style={{ backgroundColor: "rgba(8, 10, 20, 0.7)" }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Average savings over {PERIOD_LABELS[period].toLowerCase()} vs
                  public cloud
                </span>
                <span className="text-3xl font-bold text-primary">
                  {formatCurrency(totalSaved)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                  <span className="text-xl font-bold text-primary">
                    {savingsPercent}%
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  lower TCO
                  <br />
                  on average
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs leading-relaxed text-muted-foreground/60">
          Pricing is illustrative and based on publicly available on-demand and
          reserved/committed-use rates as of Q1 2026. Actual costs vary by
          region, discounts, and usage patterns. UnSI cost includes amortized
          hardware, power, cooling, rack space, and premium support. Contact us
          for a detailed TCO analysis tailored to your workload.
        </p>
      </div>
    </section>
  )
}
