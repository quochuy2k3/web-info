import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/sections/hero'
import { Overview } from '@/components/sections/overview'
import { TechStack } from '@/components/sections/tech-stack'
import { ModulesGrid } from '@/components/sections/modules-grid'
import { Architecture } from '@/components/sections/architecture'
import { BusinessRules } from '@/components/sections/business-rules'
import { Pricing } from '@/components/sections/pricing'
import { Timeline } from '@/components/sections/timeline'
import { Payment } from '@/components/sections/payment'
import { Comparison } from '@/components/sections/comparison'
import { Warranty } from '@/components/sections/warranty'
import { Footer } from '@/components/sections/footer'

export default function HomePage() {
  return (
    <main id="main-content">
      <Navigation />
      <Hero />
      <div className="section-divider" />
      <Overview />
      <div className="section-divider" />
      <TechStack />
      <div className="section-divider" />
      <ModulesGrid />
      <div className="section-divider" />
      <Architecture />
      <div className="section-divider" />
      <BusinessRules />
      <div className="section-divider" />
      <Pricing />
      <div className="section-divider" />
      <Timeline />
      <div className="section-divider" />
      <Payment />
      <div className="section-divider" />
      <Comparison />
      <div className="section-divider" />
      <Warranty />
      <div className="section-divider" />
      <Footer />
    </main>
  )
}
