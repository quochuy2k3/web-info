'use client'

import { motion } from 'framer-motion'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { MermaidDiagram } from '@/components/ui/mermaid-diagram'
import { moduleDiagrams } from '@/data/module-diagrams'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const layers = [
  {
    label: 'Client',
    items: [
      { name: 'Next.js Frontend', sub: 'SSR/SSG • Tailwind CSS', color: 'from-indigo-500 to-indigo-600' },
    ],
  },
  {
    label: 'API Gateway',
    items: [
      { name: 'Cloud Run', sub: 'Next.js API Routes', color: 'from-cyan-500 to-cyan-600' },
      { name: 'Cloud Functions', sub: 'Serverless Workers', color: 'from-cyan-500 to-teal-600' },
    ],
  },
  {
    label: 'Services',
    items: [
      { name: 'Auth Service', sub: 'Firebase Auth / JWT', color: 'from-violet-500 to-violet-600' },
      { name: 'Sales Service', sub: 'CT bán hàng, Trả hàng', color: 'from-violet-500 to-purple-600' },
      { name: 'Debt Service', sub: 'Công nợ, Bù trừ', color: 'from-violet-500 to-fuchsia-600' },
      { name: 'Print Service', sub: 'Puppeteer + React-PDF', color: 'from-violet-500 to-pink-600' },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'MongoDB Atlas', sub: '8 Collections • Flexible Schema', color: 'from-emerald-500 to-emerald-600' },
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />

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
                  {layer.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.02 }}
                      className="relative rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition-colors overflow-hidden"
                    >
                      {/* Gradient accent bar */}
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color}`} />
                      <h4 className="text-sm font-semibold text-white mb-1">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.sub}</p>
                    </motion.div>
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
              {collections.map((col, i) => (
                <motion.span
                  key={col}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-emerald-500/8 border border-emerald-500/15 text-emerald-400/80 hover:bg-emerald-500/15 hover:border-emerald-500/25 transition-colors cursor-default"
                >
                  {col}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>
        {/* System Flow Diagram */}
        {moduleDiagrams.system && (
          <ScrollReveal delay={0.5}>
            <div className="mt-16 max-w-4xl mx-auto">
              {moduleDiagrams.system.map((diagram, i) => (
                <MermaidDiagram
                  key={i}
                  chart={diagram.chart}
                  title={diagram.title}
                />
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
