'use client'

import { ShieldCheck, Headphones, CodeXml, Check } from 'lucide-react'
import { warranty } from '@/data/project-data'
import { sectionIds, formatCurrency } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const cards = [
  {
    icon: ShieldCheck,
    title: 'Bảo hành 3 tháng',
    subtitle: 'Miễn phí',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    items: warranty.free.items,
    note: warranty.free.excluded,
  },
  {
    icon: Headphones,
    title: 'Hỗ trợ sau bảo hành',
    subtitle: formatCurrency(warranty.paid.monthly) + '/tháng',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    items: [warranty.paid.description, ...warranty.paid.extras],
  },
  {
    icon: CodeXml,
    title: 'Quyền sở hữu',
    subtitle: '100% Source Code',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    items: warranty.ownership,
  },
]

export function Warranty() {
  return (
    <section id={sectionIds.warranty} className="py-16 sm:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Bảo hành"
          title="Bảo hành & Hỗ trợ"
          description="Cam kết đồng hành sau bàn giao."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <div className="glow-card p-7 h-full">
                <div className={`w-12 h-12 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center mb-5`}>
                  <card.icon size={22} className={card.color} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
                <p className={`text-sm font-medium ${card.color} mb-5`}>{card.subtitle}</p>
                <ul className="space-y-2.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check size={14} className={`${card.color} mt-0.5 shrink-0`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {card.note && (
                  <p className="mt-4 text-xs text-gray-600 italic border-t border-white/5 pt-3">{card.note}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
