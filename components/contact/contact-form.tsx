"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

const WORKLOAD_OPTIONS = [
  "AI / Machine Learning",
  "Data Analytics",
  "Web & Application Hosting",
  "Database Workloads",
  "CI/CD & DevOps",
  "High Performance Computing",
  "Virtualization / VDI",
  "Other",
]

const TIMELINE_OPTIONS = [
  "Exploring options",
  "Within 3 months",
  "Within 6 months",
  "Within 12 months",
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedWorkloads, setSelectedWorkloads] = useState<string[]>([])

  function toggleWorkload(workload: string) {
    setSelectedWorkloads((prev) =>
      prev.includes(workload)
        ? prev.filter((w) => w !== workload)
        : [...prev, workload]
    )
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-border bg-card py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-foreground">
            Thank you for reaching out
          </h2>
          <p className="max-w-md text-muted-foreground">
            Our team will review your requirements and get back to you within
            one business day.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Name row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-foreground"
          >
            First name <span className="text-destructive">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Jane"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-foreground"
          >
            Last name <span className="text-destructive">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Work email <span className="text-destructive">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="jane@company.com"
        />
      </div>

      {/* Company + Role */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="company"
            className="text-sm font-medium text-foreground"
          >
            Company <span className="text-destructive">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Acme Corp"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="role"
            className="text-sm font-medium text-foreground"
          >
            Job title
          </label>
          <input
            id="role"
            name="role"
            type="text"
            className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="VP of Infrastructure"
          />
        </div>
      </div>

      {/* Workloads - chip select */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-foreground">
          Primary workloads
        </label>
        <p className="text-xs text-muted-foreground">
          Select all that apply
        </p>
        <div className="flex flex-wrap gap-2">
          {WORKLOAD_OPTIONS.map((workload) => {
            const selected = selectedWorkloads.includes(workload)
            return (
              <button
                key={workload}
                type="button"
                onClick={() => toggleWorkload(workload)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                  selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                {workload}
              </button>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="timeline"
          className="text-sm font-medium text-foreground"
        >
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            When are you looking to deploy?
          </option>
          {TIMELINE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Current cloud spend */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="spend"
          className="text-sm font-medium text-foreground"
        >
          Current monthly cloud spend (approx.)
        </label>
        <select
          id="spend"
          name="spend"
          className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select a range
          </option>
          <option value="<10k">{"< $10,000 / mo"}</option>
          <option value="10k-50k">$10,000 - $50,000 / mo</option>
          <option value="50k-100k">$50,000 - $100,000 / mo</option>
          <option value="100k-500k">$100,000 - $500,000 / mo</option>
          <option value="500k+">{"$500,000+ / mo"}</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-foreground"
        >
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="resize-none rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="Tell us about your current infrastructure, pain points, or specific requirements..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="flex items-center justify-center gap-2 self-start rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-muted-foreground/60">
        By submitting this form, you agree to receive communications from UnSI.
        We respect your privacy and will never share your information with third
        parties.
      </p>
    </form>
  )
}
