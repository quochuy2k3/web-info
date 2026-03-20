'use client'

import { Check, X, TrendingUp } from 'lucide-react'
import { comparison } from '@/data/project-data'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

export function Comparison() {
  return (
    <section id={sectionIds.comparison} className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="So sánh"
          title="MISA AMIS vs Phần mềm Custom"
          description="Đầu tư ban đầu cao hơn — nhưng sở hữu vĩnh viễn, custom 100%, hòa vốn sau 3-4 năm."
        />

        <div className="max-w-4xl mx-auto">
          {/* Table header */}
          <div className="grid grid-cols-3 gap-4 px-5 py-4">
            <div className="text-sm font-semibold text-gray-400">Tiêu chí</div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-400">MISA AMIS</div>
              <div className="text-xs text-gray-600">SaaS</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-indigo-400 flex items-center justify-center gap-1">
                <TrendingUp size={14} />
                Phần mềm Custom
              </div>
              <div className="text-xs text-gray-600">Sở hữu vĩnh viễn</div>
            </div>
          </div>

          {/* Table rows */}
          <StaggerContainer className="divide-y divide-white/[0.03]" staggerDelay={0.06}>
            {comparison.map((row) => (
              <StaggerItem key={row.criteria}>
                <div className="grid grid-cols-3 gap-4 px-5 py-4 table-row-hover rounded-lg transition-colors items-center">
                  <span className="text-sm font-medium text-white">{row.criteria}</span>
                  <div className="text-center">
                    <span className="text-sm text-gray-400">{row.misa}</span>
                  </div>
                  <div className="text-center flex items-center justify-center gap-2">
                    {row.customWin ? (
                      <Check size={14} className="text-emerald-400 shrink-0" />
                    ) : (
                      <X size={14} className="text-red-400/50 shrink-0" />
                    )}
                    <span className={`text-sm ${row.customWin ? 'text-emerald-300 font-medium' : 'text-gray-400'}`}>
                      {row.custom}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
