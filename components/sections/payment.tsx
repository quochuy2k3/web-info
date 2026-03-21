'use client'

import { CreditCard, CircleCheck } from 'lucide-react'
import { paymentTerms } from '@/data/project-data'
import { sectionIds, formatCurrency } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export function Payment() {
  return (
    <section id={sectionIds.payment} className="py-16 sm:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Thanh toán"
          title="Thanh toán 3 đợt"
          description="Thanh toán theo milestone — chỉ trả khi thấy kết quả."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {paymentTerms.map((term, idx) => (
            <ScrollReveal key={term.phase} variant={idx === 0 ? 'fadeLeft' : idx === 2 ? 'fadeRight' : 'fadeUp'} delay={idx * 0.2}>
              <div className={`glow-card p-8 h-full ${idx === 0 ? 'glow-card-core' : ''}`}>
                {/* Phase badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    idx === 0
                      ? 'bg-gradient-to-br from-blue-500/20 to-orange-500/20 border border-blue-500/30'
                      : idx === 1
                        ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30'
                        : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                  }`}>
                    <CreditCard size={22} className={idx === 0 ? 'text-blue-400' : idx === 1 ? 'text-emerald-400' : 'text-purple-400'} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Đợt {term.phase}</div>
                    <div className="text-lg font-semibold text-white">{term.percent}%</div>
                  </div>
                </div>

                {/* Amount */}
                <div className="mb-6">
                  <div className={`text-3xl font-bold ${idx === 0 ? 'text-gradient' : idx === 1 ? 'text-emerald-400' : 'text-purple-400'}`}>
                    <AnimatedCounter target={term.amount} format="currency" duration={2} />
                  </div>
                </div>

                {/* Milestone */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Milestone</div>
                  <p className="text-sm text-gray-300">{term.milestone}</p>
                </div>

                {/* Deliverables */}
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Deliverables</div>
                  <div className="flex items-start gap-2 text-sm text-gray-400">
                    <CircleCheck size={14} className={`${idx === 0 ? 'text-blue-400' : idx === 1 ? 'text-emerald-400' : 'text-purple-400'} mt-0.5 shrink-0`} />
                    <span>{term.deliverables}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
