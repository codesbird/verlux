interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
}

export function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-secondary border-b border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          {subtitle && (
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
              {subtitle}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
