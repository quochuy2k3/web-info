'use client'

import { Monitor, Server, Shield, Database } from 'lucide-react'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const layers = [
  {
    label: 'Frontend',
    sublabel: 'Giao diện người dùng',
    icon: Monitor,
    accent: '#3B82F6',
    accentBg: 'rgba(59,130,246,0.06)',
    techs: ['Next.js (React)', 'Tailwind CSS', 'Responsive Web App'],
  },
  {
    label: 'Backend',
    sublabel: 'Xử lý nghiệp vụ',
    icon: Server,
    accent: '#06B6D4',
    accentBg: 'rgba(6,182,212,0.05)',
    techs: ['Cloud Run', 'Cloud Functions', 'TypeScript', 'Serverless'],
  },
  {
    label: 'Services',
    sublabel: 'Dịch vụ hệ thống',
    icon: Shield,
    accent: '#F97316',
    accentBg: 'rgba(249,115,22,0.05)',
    techs: ['Xác thực (JWT)', 'Bán hàng & Trả hàng', 'Công nợ & Bù trừ', 'In phiếu (PDF)'],
  },
  {
    label: 'Database',
    sublabel: 'Lưu trữ dữ liệu',
    icon: Database,
    accent: '#10B981',
    accentBg: 'rgba(16,185,129,0.05)',
    techs: ['MongoDB Atlas (9 collections)', 'Cloud Storage'],
  },
]

const collections = [
  'customers', 'products', 'quotations', 'sale_vouchers',
  'sale_returns', 'debt_transactions', 'payments', 'price_policies', 'users',
]

export function Architecture() {
  return (
    <section id={sectionIds.architecture} className="py-16 sm:py-24 lg:py-32 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Kiến trúc"
          title="System Architecture"
          description="Kiến trúc phân tầng, serverless, auto-scale trên Google Cloud Platform."
        />

        {/* Stacked layers */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.06] overflow-hidden">
            {layers.map((layer, idx) => (
              <div
                key={layer.label}
                className="flex items-stretch border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                style={{ background: layer.accentBg }}
              >
                {/* Content */}
                <div className="flex-1 px-5 sm:px-8 py-5 sm:py-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    {/* Label */}
                    <div className="flex items-center gap-3 sm:w-48 shrink-0">
                      <layer.icon size={18} style={{ color: layer.accent }} className="shrink-0" />
                      <div>
                        <h3 className="text-sm font-semibold text-white leading-tight">{layer.label}</h3>
                        <p className="text-[11px] text-gray-500">{layer.sublabel}</p>
                      </div>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {layer.techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-white/[0.05] border border-white/[0.07] text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Collections */}
        <ScrollReveal>
          <div className="mt-12 max-w-4xl mx-auto text-center">
            <h3 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-[0.15em]">
              MongoDB Collections
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {collections.map((col) => (
                <code
                  key={col}
                  className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-emerald-500/[0.06] border border-emerald-500/10 text-emerald-400/70"
                >
                  {col}
                </code>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
