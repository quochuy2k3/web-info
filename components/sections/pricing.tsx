'use client'

import { modules, supplementary, pricingSummary, gcpCosts } from '@/data/project-data'
import { sectionIds, formatCurrency, formatNumber } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export function Pricing() {
  const allItems = [...modules, ...supplementary]

  return (
    <section id={sectionIds.pricing} className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Báo giá"
          title="Chi tiết Báo giá"
          description={`Rate: ~${formatCurrency(pricingSummary.rate)}/man-day (~$${pricingSummary.rateUSD}/giờ) • Giá làm tròn theo tier độ phức tạp module`}
        />

        {/* Grand total highlight */}
        <ScrollReveal>
          <div className="max-w-2xl mx-auto mb-14">
            <div className="glow-card glow-card-core p-8 text-center">
              <div className="text-sm text-gray-400 mb-2">Tổng giá trị dự án</div>
              <div className="text-4xl sm:text-5xl font-bold text-gradient mb-3">
                <AnimatedCounter target={pricingSummary.total} format="currency" duration={2.5} />
              </div>
              <div className="text-sm text-gray-500 italic">{pricingSummary.totalWords}</div>
              <div className="text-xs text-gray-600 mt-2">Chưa bao gồm VAT</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing table */}
        <div className="max-w-5xl mx-auto mb-14">
          {/* Header */}
          <div className="hidden lg:grid grid-cols-[50px_1fr_200px_80px_80px_80px_130px] gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/5">
            <span>ID</span>
            <span>Module</span>
            <span>Loại</span>
            <span className="text-right">FE</span>
            <span className="text-right">BE</span>
            <span className="text-right">Tổng</span>
            <span className="text-right">Thành tiền</span>
          </div>

          {/* Main modules */}
          <StaggerContainer className="divide-y divide-white/[0.03]" staggerDelay={0.04}>
            {allItems.map((item) => (
              <StaggerItem key={item.id}>
                <div className={`grid grid-cols-2 lg:grid-cols-[50px_1fr_200px_80px_80px_80px_130px] gap-2 lg:gap-3 px-5 py-3.5 table-row-hover rounded-lg transition-colors ${item.isCore ? 'bg-indigo-500/[0.03]' : ''}`}>
                  <span className="text-xs font-mono text-gray-500 lg:text-indigo-400">{item.id.toUpperCase()}</span>
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    {item.name}
                    {item.isCore && <span className="text-[10px] px-1.5 py-0.5 rounded badge-core">CORE</span>}
                  </span>
                  <span className="hidden lg:block text-xs text-gray-500">{item.type}</span>
                  <span className="hidden lg:block text-sm text-gray-400 text-right">{item.effortFE}</span>
                  <span className="hidden lg:block text-sm text-gray-400 text-right">{item.effortBE}</span>
                  <span className="hidden lg:block text-sm text-white font-medium text-right">{item.totalEffort}</span>
                  <span className="text-sm font-semibold text-indigo-400 text-right">{formatCurrency(item.price)}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Totals */}
          <ScrollReveal delay={0.3}>
            <div className="border-t border-white/10 mt-2 pt-3 space-y-2 px-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal ({formatNumber(pricingSummary.totalDays)} ngày)</span>
                <span className="text-white font-medium">{formatCurrency(pricingSummary.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">PM overhead + Buffer (~{pricingSummary.pmOverheadPercent}%)</span>
                <span className="text-white font-medium">{formatCurrency(pricingSummary.pmOverhead)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                <span className="text-white">TỔNG CỘNG</span>
                <span className="text-gradient">{formatCurrency(pricingSummary.total)}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* GCP monthly costs */}
        <ScrollReveal delay={0.4}>
          <div className="max-w-3xl mx-auto">
            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Chi phí vận hành GCP hàng tháng (tham khảo)
              </h3>
              <div className="space-y-3">
                {gcpCosts.map((cost) => (
                  <div key={cost.service} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-300">{cost.service}</span>
                      <span className="text-gray-600 ml-2">({cost.config})</span>
                    </div>
                    <span className="text-amber-400 font-medium">{cost.cost}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/5 flex justify-between text-sm font-semibold">
                  <span className="text-white">TỔNG</span>
                  <span className="text-amber-400">~800.000 - 1.500.000đ/tháng</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">Chi phí GCP do KH tự trả, không bao gồm trong báo giá dự án.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
