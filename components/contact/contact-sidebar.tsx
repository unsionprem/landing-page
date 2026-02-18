import { Server, ShieldCheck, Zap, ArrowRight } from "lucide-react"

const VALUE_PROPS = [
  {
    icon: <Server className="h-5 w-5" />,
    title: "Understand the platform",
    description:
      "Walk through UnSI's integrated rack-scale architecture and see how it maps to your current infrastructure.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Review your workloads",
    description:
      "Our engineers will assess your compute, storage, and networking requirements to build a tailored configuration.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Get a custom TCO analysis",
    description:
      "Receive a detailed cost comparison against AWS, Azure, and GCP based on your actual workload profiles.",
  },
]

export function ContactSidebar() {
  return (
    <div className="flex flex-col gap-10 lg:w-[42%] lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-col gap-4">
        <span className="font-mono text-sm tracking-widest uppercase text-primary">
          Contact Sales
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl text-balance">
          Let{"'"}s build your
          <br />
          <span className="text-primary">private cloud.</span>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
          Discuss your computing requirements and business goals with our team
          of infrastructure experts.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {VALUE_PROPS.map((prop) => (
          <div key={prop.title} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
              {prop.icon}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-foreground">
                {prop.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {prop.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary p-6">
        <p className="text-sm text-muted-foreground">
          Prefer email? Reach us directly at
        </p>
        <a
          href="mailto:sales@unsi.cloud"
          className="flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          sales@unsi.cloud
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
