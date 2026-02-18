import { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactSidebar } from "@/components/contact/contact-sidebar"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Sales - UnSI",
  description:
    "Discuss your computing requirements and business goals with our team. Get a custom TCO analysis for your workloads.",
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Top nav */}
      <nav className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <span className="text-xl font-bold text-foreground">
          <span className="text-primary">Un</span>SI
        </span>
        <div className="w-16" />
      </nav>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-16 lg:flex-row lg:gap-20 lg:py-24">
        {/* Left: sidebar with value props */}
        <ContactSidebar />

        {/* Right: form */}
        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
