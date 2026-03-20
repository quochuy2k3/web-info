'use client'

import { Check, X, Target, Zap, BarChart3, Printer } from 'lucide-react'
import { projectInfo } from '@/data/project-data'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const highlights = [
  {
    icon: Zap,
    title: 'Tốc độ thao tác',
    description: 'Lập phiếu bán hàng trong < 30 giây',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: BarChart3,
    title: 'Tracking công nợ',
    description: 'Realtime, phân tích aging tự động',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Printer,
    title: 'In phiếu chuyên nghiệp',
    description: '2 mẫu: Custom + 02-VT theo TT99/2025',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Target,
    title: 'Đơn giản hóa',
    description: 'Bỏ kế toán sổ cái, BCTC, thuế phức tạp',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
]

export function Overview() {
  return (
    <section id={sectionIds.overview} className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Tổng quan"
          title="Mục tiêu dự án"
          description="Xây dựng hệ thống web app quản lý bán hàng và công nợ riêng, tập trung phân hệ Bán hàng — đơn giản hóa so với MISA AMIS gốc."
        />

        {/* Highlight cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlights.map((item) => (
            <StaggerItem key={item.title}>
              <div className="glow-card p-6 h-full">
                <div className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-4`}>
                  <item.icon size={22} className={item.color} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Scope: Included vs Excluded */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScrollReveal variant="fadeLeft">
            <div className="glow-card p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                  <Check size={16} className="text-emerald-400" />
                </div>
                Phạm vi Phase 1
              </h3>
              <ul className="space-y-3">
                {projectInfo.scope.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <Check size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeRight">
            <div className="glow-card p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                  <X size={16} className="text-red-400" />
                </div>
                Không bao gồm
              </h3>
              <ul className="space-y-3">
                {projectInfo.scope.excluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-400">
                    <X size={16} className="text-red-400/60 mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
