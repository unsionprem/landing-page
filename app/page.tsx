"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Cpu, Network, HardDrive, Zap } from "lucide-react"
import { NavBar } from "@/components/sections/nav-bar"
import { HeroSection } from "@/components/sections/hero-section"
import { FeatureSection } from "@/components/sections/feature-section"
import { SectionIndicator } from "@/components/sections/section-indicator"
import { RackHighlight } from "@/components/sections/rack-highlight"
import { PricingSection } from "@/components/sections/pricing-section"

const SECTIONS = [
  {
    label: "Compute",
    title: "Elastic Compute",
    accentColor: "#22d3ee",
    description:
      "Provision virtual machines, containers, and bare-metal nodes in seconds. Scale from zero to thousands of cores without ever leaving your data center.",
    features: [
      {
        title: "Auto-scaling Pools",
        description:
          "Dynamically scale compute pools up or down based on real-time workload demand, with sub-second response times.",
      },
      {
        title: "Bare Metal Performance",
        description:
          "Direct hardware access when you need it. No hypervisor overhead, no noisy neighbors, just raw performance.",
      },
      {
        title: "GPU Acceleration",
        description:
          "First-class GPU support for AI/ML workloads. Fractional GPU sharing and dedicated GPU pools at your command.",
      },
      {
        title: "Live Migration",
        description:
          "Zero-downtime maintenance with transparent live migration. Your workloads keep running while hardware is serviced.",
      },
    ],
    icon: <Cpu strokeWidth={1.5} />,
  },
  {
    label: "Networking",
    title: "Software-Defined Networking",
    accentColor: "#34d399",
    description:
      "Build complex network topologies in minutes. Secure multi-tenant isolation with the simplicity of cloud-native networking.",
    features: [
      {
        title: "Virtual Private Clouds",
        description:
          "Fully isolated network environments with customizable subnets, routing tables, and security groups.",
      },
      {
        title: "Load Balancing",
        description:
          "Layer 4 and Layer 7 load balancing with automatic health checks, SSL termination, and traffic shaping.",
      },
      {
        title: "Service Mesh",
        description:
          "Built-in service mesh with mTLS, traffic policies, and observability for your microservices architecture.",
      },
      {
        title: "Edge Connectivity",
        description:
          "Direct peering and VPN tunnels to connect your on-prem cloud to any public cloud or remote site seamlessly.",
      },
    ],
    icon: <Network strokeWidth={1.5} />,
  },
  {
    label: "Storage",
    title: "Unified Storage",
    accentColor: "#fbbf24",
    description:
      "Block, object, and file storage unified under one platform. Petabyte-scale capacity with enterprise-grade durability.",
    features: [
      {
        title: "Block Storage",
        description:
          "High-performance NVMe block volumes with configurable IOPS and throughput. Snapshots and clones in milliseconds.",
      },
      {
        title: "Object Storage",
        description:
          "S3-compatible object storage for unstructured data. Built-in versioning, lifecycle policies, and cross-site replication.",
      },
      {
        title: "Shared File Systems",
        description:
          "POSIX-compliant shared filesystems for legacy and modern workloads. NFS and SMB protocols fully supported.",
      },
      {
        title: "Data Protection",
        description:
          "Automated backups, erasure coding, and geo-replication ensure your data is always safe, always available.",
      },
    ],
    icon: <HardDrive strokeWidth={1.5} />,
  },
  {
    label: "Efficient Power",
    title: "Sustainable Infrastructure",
    accentColor: "#f472b6",
    description:
      "Industry-leading power efficiency and advanced cooling. Reduce your carbon footprint while maximizing performance per watt.",
    features: [
      {
        title: "Intelligent Cooling",
        description:
          "AI-driven thermal management optimizes airflow and cooling in real time, reducing energy consumption by up to 40%.",
      },
      {
        title: "Power Analytics",
        description:
          "Granular per-rack and per-server power monitoring with predictive analytics and automated efficiency recommendations.",
      },
      {
        title: "Hot/Cold Aisle Containment",
        description:
          "Advanced airflow containment strategies minimize energy waste and maintain optimal operating temperatures.",
      },
      {
        title: "Renewable Ready",
        description:
          "Seamless integration with solar, wind, and other renewable energy sources. Track your green energy usage in real time.",
      },
    ],
    icon: <Zap strokeWidth={1.5} />,
  },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const isScrollingRef = useRef(false)

  const totalSections = SECTIONS.length + 2 // hero + 4 feature sections + pricing

  const navigateTo = useCallback((index: number) => {
    const section = sectionRefs.current[index]
    if (section && containerRef.current) {
      isScrollingRef.current = true
      section.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        isScrollingRef.current = false
      }, 800)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLElement
            )
            if (index !== -1) {
              setActiveSection(index)
            }
          }
        })
      },
      {
        root: container,
        threshold: 0.55,
      }
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el
    },
    []
  )

  return (
    <main className="relative h-screen overflow-hidden">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-700"
        aria-hidden="true"
        style={{
          opacity: activeSection === SECTIONS.length + 1 ? 0 : 1,
        }}
      >
        <img
          src="/images/rack.png"
          alt=""
          className="h-full w-full object-contain"
        />
        {/* Default dim overlay (fades out when highlight is active) */}
        <div
          className="absolute inset-0 transition-opacity duration-600"
          style={{
            backgroundColor: "rgba(8, 10, 20, 0.75)",
            opacity: activeSection === 0 || activeSection === SECTIONS.length + 1 ? 1 : 0,
          }}
        />
      </div>

      {/* Rack highlight overlay */}
      <RackHighlight activeSection={activeSection} />

      {/* Navigation */}
      <NavBar activeSection={activeSection} onNavigate={navigateTo} />

      {/* Section dots indicator */}
      <SectionIndicator
        total={totalSections}
        active={activeSection}
        onNavigate={navigateTo}
      />

      {/* Scroll snap container */}
      <div
        ref={containerRef}
        className="relative z-10 h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Hero section */}
        <div ref={setSectionRef(0)}>
          <HeroSection />
        </div>

        {/* Feature sections */}
        {SECTIONS.map((section, i) => (
          <div key={section.label} ref={setSectionRef(i + 1)}>
            <FeatureSection
              label={section.label}
              title={section.title}
              description={section.description}
              features={section.features}
              icon={section.icon}
              accentColor={section.accentColor}
            />
          </div>
        ))}

        {/* Pricing section */}
        <div ref={setSectionRef(SECTIONS.length + 1)}>
          <PricingSection />
        </div>
      </div>
    </main>
  )
}
