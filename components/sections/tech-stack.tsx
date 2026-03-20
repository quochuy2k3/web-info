'use client'

import { Monitor, Server, Database, Cloud, Shield, Printer } from 'lucide-react'
import { techStack } from '@/data/project-data'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor,
  Server,
  Database,
  Cloud,
  Shield,
  Printer,
}

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'shadow-blue-500/10' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/10' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', glow: 'shadow-orange-500/10' },
  teal: { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', glow: 'shadow-teal-500/10' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', glow: 'shadow-rose-500/10' },
}

export function TechStack() {
  return (
    <section id={sectionIds.techStack} className="py-16 sm:py-24 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Công nghệ"
          title="Technology Stack"
          description="Kiến trúc hiện đại, serverless, auto-scale — tối ưu chi phí vận hành."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((item) => {
            const Icon = iconMap[item.icon]
            const colors = colorMap[item.color]
            return (
              <StaggerItem key={item.layer}>
                <div className="glow-card p-6 h-full group">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0 group-hover:shadow-lg ${colors.glow} transition-shadow duration-300`}>
                      {Icon && <Icon size={22} className={colors.text} />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        {item.layer}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.tech}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
