"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "hello@verluxstands.com",
    subtext: "We respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+44 20 1234 5678",
    subtext: "Mon-Fri, 9am-6pm GMT",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Exhibition Way",
    subtext: "London, EC1V 9NR, UK",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Monday - Friday",
    subtext: "9:00 AM - 6:00 PM GMT",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    eventType: "",
    budget: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHeader
        subtitle="Get in Touch"
        title="Let's Create Something Extraordinary"
        description="Ready to make a lasting impression at your next event? Contact us for a free consultation and quote."
      />
      
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-foreground">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-secondary rounded-xl border border-border">
                <h3 className="font-serif text-lg font-semibold mb-3">Why Choose Verlux?</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Free initial consultation</li>
                  <li>Custom design tailored to your brand</li>
                  <li>Competitive pricing with no hidden fees</li>
                  <li>Dedicated project manager</li>
                  <li>15+ years of industry experience</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-xl p-8 md:p-10">
                <h2 className="font-serif text-2xl font-bold mb-2">Request a Quote</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        placeholder="Company Inc."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+44 20 1234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="eventType" className="block text-sm font-medium text-foreground mb-2">
                        Event Type
                      </label>
                      <Input
                        id="eventType"
                        placeholder="Trade Show, Conference, etc."
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                        Estimated Budget
                      </label>
                      <Input
                        id="budget"
                        placeholder="$10,000 - $50,000"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your event, stand requirements, and any specific ideas you have..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-background border-border resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
