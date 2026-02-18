"use client"

export function SectionIndicator({
  total,
  active,
  onNavigate,
}: {
  total: number
  active: number
  onNavigate: (index: number) => void
}) {
  return (
    <div className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
            active === i
              ? "scale-125 border-primary bg-primary"
              : "border-muted-foreground/40 bg-transparent hover:border-muted-foreground"
          }`}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  )
}
