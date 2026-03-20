'use client'

import { businessRules } from '@/data/project-data'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

export function BusinessRules() {
  return (
    <section id={sectionIds.businessRules} className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Business Rules"
          title="11 Quy tắc nghiệp vụ"
          description="Các quy tắc hệ thống tự động áp dụng khi xử lý nghiệp vụ."
        />

        <div className="max-w-5xl mx-auto">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[60px_70px_1fr_1.5fr] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/5">
            <span>ID</span>
            <span>Module</span>
            <span>Rule</span>
            <span>Mô tả</span>
          </div>

          {/* Table rows */}
          <StaggerContainer className="divide-y divide-white/[0.03]" staggerDelay={0.05}>
            {businessRules.map((rule) => (
              <StaggerItem key={rule.id}>
                <div className="grid grid-cols-1 sm:grid-cols-[60px_70px_1fr_1.5fr] gap-2 sm:gap-4 px-5 py-4 table-row-hover rounded-lg transition-colors">
                  <span className="text-xs font-mono text-indigo-400">{rule.id}</span>
                  <span className="text-xs font-mono text-gray-500">{rule.module}</span>
                  <span className="text-sm font-medium text-white">{rule.rule}</span>
                  <span className="text-sm text-gray-400">{rule.description}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
