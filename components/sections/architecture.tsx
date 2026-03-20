'use client'

import { Monitor, Server, Database, Cloud, Shield, Printer, ArrowDown } from 'lucide-react'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const layers = [
  {
    label: 'Giao diện người dùng',
    icon: Monitor,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/[0.06]',
    items: ['Next.js (React)', 'Tailwind CSS', 'Responsive Web App'],
  },
  {
    label: 'Xử lý nghiệp vụ',
    icon: Server,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/[0.06]',
    items: ['Cloud Run (API)', 'Cloud Functions (Workers)', 'Serverless, Auto-scale'],
  },
  {
    label: 'Dịch vụ hệ thống',
    icon: Shield,
    color: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    bgColor: 'bg-orange-500/[0.06]',
    items: ['Xác thực (Firebase Auth)', 'Bán hàng & Trả hàng', 'Công nợ & Bù trừ', 'In phiếu (Puppeteer)'],
  },
  {
    label: 'Lưu trữ dữ liệu',
    icon: Database,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/[0.06]',
    items: ['MongoDB Atlas (9 collections)', 'Cloud Storage (Files & Backups)'],
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

        {/* Architecture layers — vertical flow */}
        <div className="max-w-3xl mx-auto">
          {layers.map((layer, idx) => (
            <ScrollReveal key={layer.label}>
              <div className="relative">
                {/* Layer card */}
                <div className={`rounded-2xl border ${layer.borderColor} ${layer.bgColor} p-6 sm:p-8`}>
                  {/* Layer header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center`}>
                      <layer.icon size={20} className={layer.color} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{layer.label}</h3>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Layer {idx + 1}</span>
                    </div>
                  </div>

                  {/* Layer items as tags */}
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-sm rounded-lg bg-white/[0.06] border border-white/[0.08] text-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connector */}
                {idx < layers.length - 1 && (
                  <div className="flex justify-center py-3">
                    <ArrowDown size={16} className="text-gray-600" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* MongoDB Collections */}
        <ScrollReveal>
          <div className="mt-14 max-w-3xl mx-auto">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 text-center uppercase tracking-widest">MongoDB Collections</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {collections.map((col) => (
                <span
                  key={col}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-emerald-500/[0.08] border border-emerald-500/15 text-emerald-400/80 hover:bg-emerald-500/15 transition-colors cursor-default"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
