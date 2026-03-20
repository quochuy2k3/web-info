'use client'

import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const layers = [
  {
    label: 'Client',
    items: [
      { name: 'Next.js Frontend', sub: 'SSR/SSG • Tailwind CSS', color: 'from-blue-500 to-blue-600' },
    ],
  },
  {
    label: 'API Gateway',
    items: [
      { name: 'Cloud Run', sub: 'Next.js API Routes', color: 'from-cyan-500 to-orange-600' },
      { name: 'Cloud Functions', sub: 'Serverless Workers', color: 'from-cyan-500 to-teal-600' },
    ],
  },
  {
    label: 'Services',
    items: [
      { name: 'Auth Service', sub: 'Firebase Auth / JWT', color: 'from-blue-500 to-blue-600' },
      { name: 'Sales Service', sub: 'CT bán hàng, Trả hàng', color: 'from-blue-500 to-orange-600' },
      { name: 'Debt Service', sub: 'Công nợ, Bù trừ', color: 'from-blue-500 to-yellow-600' },
      { name: 'Print Service', sub: 'Puppeteer + React-PDF', color: 'from-blue-500 to-orange-600' },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'MongoDB Atlas', sub: '9 Collections • Flexible Schema', color: 'from-emerald-500 to-emerald-600' },
      { name: 'Cloud Storage', sub: 'Files & Backups', color: 'from-emerald-500 to-teal-600' },
    ],
  },
]

const collections = [
  'customers', 'products', 'quotations', 'sale_vouchers',
  'sale_returns', 'debt_transactions', 'payments', 'price_policies', 'users',
]

export function Architecture() {
  return (
    <section id={sectionIds.architecture} className="py-16 sm:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Kiến trúc"
          title="System Architecture"
          description="Kiến trúc phân tầng, serverless, auto-scale trên Google Cloud Platform."
        />

        {/* Architecture layers */}
        <div className="max-w-4xl mx-auto space-y-6">
          {layers.map((layer, layerIdx) => (
            <ScrollReveal key={layer.label} delay={layerIdx * 0.15}>
              <div className="relative">
                {/* Layer label */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{layer.label}</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* Layer items */}
                <div className={`grid gap-3 ${layer.items.length === 1 ? 'grid-cols-1' : layer.items.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
                  {layer.items.map((item) => (
                    <div
                      key={item.name}
                      className="relative rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 hover:scale-[1.02] transition-all duration-200 overflow-hidden"
                    >
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color}`} />
                      <h4 className="text-sm font-semibold text-white mb-1">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Connector arrow */}
                {layerIdx < layers.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-px h-6 bg-gradient-to-b from-white/10 to-white/5" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* MongoDB Collections */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">MongoDB Collections</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {collections.map((col) => (
                <span
                  key={col}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-emerald-500/[0.08] border border-emerald-500/15 text-emerald-400/80 hover:bg-emerald-500/15 hover:border-emerald-500/25 transition-colors cursor-default"
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
