'use client'

import { businessRules } from '@/data/project-data'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function BusinessRules() {
  return (
    <section id={sectionIds.businessRules} className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Business Rules"
          title="11 Quy tắc nghiệp vụ"
          description="Các quy tắc hệ thống tự động áp dụng khi xử lý nghiệp vụ."
        />

        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <div className="hidden sm:grid grid-cols-[60px_70px_1fr_1.5fr] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/5">
              <span>ID</span>
              <span>Module</span>
              <span>Rule</span>
              <span>Mô tả</span>
            </div>

            <div className="divide-y divide-white/[0.03]">
              {businessRules.map((rule) => (
                <div key={rule.id}>
                  <div className="hidden sm:grid grid-cols-[60px_70px_1fr_1.5fr] gap-4 px-5 py-4 table-row-hover rounded-lg transition-colors">
                    <span className="text-xs font-mono text-blue-400">{rule.id}</span>
                    <span className="text-xs font-mono text-gray-500">{rule.module}</span>
                    <span className="text-sm font-medium text-white">{rule.rule}</span>
                    <span className="text-sm text-gray-400">{rule.description}</span>
                  </div>

                  <div className="sm:hidden px-5 py-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-blue-400">{rule.id}</span>
                      <span className="text-[10px] text-gray-600">•</span>
                      <span className="text-xs font-mono text-gray-500">{rule.module}</span>
                    </div>
                    <div className="text-sm font-medium text-white">{rule.rule}</div>
                    <div className="text-sm text-gray-400">{rule.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
