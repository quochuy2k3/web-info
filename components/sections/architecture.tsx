'use client'

import { Monitor, Server, Shield, Database, Zap, ArrowRight } from 'lucide-react'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const layers = [
  {
    label: 'Frontend',
    sublabel: 'Giao diện người dùng',
    icon: Monitor,
    accent: '#3B82F6',
    items: [
      { name: 'Next.js', detail: 'React Framework' },
      { name: 'Tailwind CSS', detail: 'Styling' },
      { name: 'Responsive', detail: 'Mobile-first' },
    ],
  },
  {
    label: 'Backend',
    sublabel: 'Xử lý nghiệp vụ',
    icon: Server,
    accent: '#06B6D4',
    items: [
      { name: 'Cloud Run', detail: 'API Server' },
      { name: 'Cloud Functions', detail: 'Serverless Workers' },
      { name: 'TypeScript', detail: 'Type-safe' },
    ],
  },
  {
    label: 'Services',
    sublabel: 'Dịch vụ hệ thống',
    icon: Shield,
    accent: '#F97316',
    items: [
      { name: 'Auth', detail: 'Firebase / JWT' },
      { name: 'Sales Engine', detail: 'Bán hàng & Trả hàng' },
      { name: 'Debt Tracker', detail: 'Công nợ & Bù trừ' },
      { name: 'PDF Generator', detail: 'In phiếu' },
    ],
  },
  {
    label: 'Database',
    sublabel: 'Lưu trữ dữ liệu',
    icon: Database,
    accent: '#10B981',
    items: [
      { name: 'MongoDB Atlas', detail: '9 Collections' },
      { name: 'Cloud Storage', detail: 'Files & Backups' },
    ],
  },
]

const collections = [
  'customers', 'products', 'quotations', 'sale_vouchers',
  'sale_returns', 'debt_transactions', 'payments', 'price_policies', 'users',
]

export function Architecture() {
  return (
    <section id={sectionIds.architecture} className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Kiến trúc"
          title="System Architecture"
          description="Kiến trúc phân tầng, serverless, auto-scale trên Google Cloud Platform."
        />

        {/* Horizontal pipeline — desktop */}
        <div className="hidden lg:block">
          <ScrollReveal>
            <div className="relative max-w-6xl mx-auto">
              <div className="grid grid-cols-4 gap-6">
                {layers.map((layer, idx) => (
                  <div key={layer.label} className="relative">
                    {/* Dot on line */}
                    <div className="flex justify-center mb-6">
                      <div
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-[#0A0A0B] relative z-10"
                        style={{ borderColor: layer.accent }}
                      >
                        <layer.icon size={18} style={{ color: layer.accent }} />
                      </div>
                    </div>

                    {/* Arrow between dots */}
                    {idx < layers.length - 1 && (
                      <div className="absolute top-[68px] -right-3 z-20">
                        <ArrowRight size={12} className="text-gray-600" />
                      </div>
                    )}

                    {/* Card */}
                    <div
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] transition-colors"
                    >
                      <div className="mb-4">
                        <h3 className="text-sm font-bold text-white">{layer.label}</h3>
                        <p className="text-[11px] text-gray-500">{layer.sublabel}</p>
                      </div>

                      <div className="space-y-2.5">
                        {layer.items.map((item) => (
                          <div key={item.name} className="flex items-center gap-2.5">
                            <Zap size={10} style={{ color: layer.accent }} className="shrink-0 opacity-60" />
                            <div className="min-w-0">
                              <span className="text-xs font-medium text-gray-200 block">{item.name}</span>
                              <span className="text-[10px] text-gray-500 block">{item.detail}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step number */}
                    <div className="text-center mt-3">
                      <span className="text-[10px] text-gray-600 uppercase tracking-widest">Step {idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Vertical stack — mobile/tablet */}
        <div className="lg:hidden max-w-md mx-auto">
          {layers.map((layer, idx) => (
            <ScrollReveal key={layer.label}>
              <div className="relative">
                <div className="flex gap-4">
                  {/* Left: icon + line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 bg-[#0A0A0B]"
                      style={{ borderColor: layer.accent }}
                    >
                      <layer.icon size={18} style={{ color: layer.accent }} />
                    </div>
                    {idx < layers.length - 1 && (
                      <div className="w-px flex-1 min-h-[20px] bg-gradient-to-b from-white/10 to-transparent mt-3" />
                    )}
                  </div>

                  {/* Right: content */}
                  <div className="pb-8 flex-1 min-w-0">
                    <div className="mb-3">
                      <h3 className="text-sm font-bold text-white">{layer.label}</h3>
                      <p className="text-[11px] text-gray-500">{layer.sublabel}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {layer.items.map((item) => (
                        <span
                          key={item.name}
                          className="px-2.5 py-1 text-xs rounded-md bg-white/[0.04] border border-white/[0.06] text-gray-300"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Collections */}
        <ScrollReveal>
          <div className="mt-14 max-w-3xl mx-auto text-center">
            <h3 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-[0.2em]">
              9 MongoDB Collections
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
