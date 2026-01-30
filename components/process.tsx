const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We begin with an in-depth consultation to understand your brand, objectives, and vision for the exhibition.",
  },
  {
    number: "02",
    title: "Concept & Design",
    description: "Our creative team develops innovative concepts, presented through detailed 3D visualizations and mood boards.",
  },
  {
    number: "03",
    title: "Fabrication",
    description: "Expert craftsmen bring the design to life using premium materials and state-of-the-art manufacturing.",
  },
  {
    number: "04",
    title: "Delivery & Install",
    description: "Seamless logistics and professional on-site installation ensure your stand is show-ready, stress-free.",
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Our Process</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
            From Vision to Reality
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A streamlined four-step process that ensures exceptional results 
            and a stress-free experience for every client.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-border" />
              )}
              
              <div className="relative z-10">
                {/* Step Number */}
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                  <span className="font-serif text-xl font-bold text-primary">{step.number}</span>
                </div>
                
                <h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
