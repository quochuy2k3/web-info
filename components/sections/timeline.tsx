'use client'

import { motion } from 'framer-motion'
import { Milestone, CircleCheck } from 'lucide-react'
import { timeline } from '@/data/project-data'
import { sectionIds } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const phaseColors = [
  { bg: 'bg-blue-500', border: 'border-blue-500/30', glow: 'shadow-blue-500/30', text: 'text-blue-400', bgLight: 'bg-blue-500/10' },
  { bg: 'bg-cyan-500', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/30', text: 'text-cyan-400', bgLight: 'bg-cyan-500/10' },
  { bg: 'bg-rose-500', border: 'border-rose-500/30', glow: 'shadow-rose-500/30', text: 'text-rose-400', bgLight: 'bg-rose-500/10' },
  { bg: 'bg-emerald-500', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/30', text: 'text-emerald-400', bgLight: 'bg-emerald-500/10' },
]

export function Timeline() {
  return (
    <section id={sectionIds.timeline} className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Tiến độ"
          title="Lộ trình 8 tuần"
          description="4 phases từ Foundation → Core Build → Extend → Go-live."
        />

        {/* Timeline - Vertical */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px timeline-line" />

          <div className="space-y-10">
            {timeline.map((phase, idx) => {
              const colors = phaseColors[idx]
              return (
                <ScrollReveal key={phase.phase} delay={idx * 0.15}>
                  <div className="relative pl-16 sm:pl-20">
                    {/* Dot */}
                    <div className={`absolute left-4 sm:left-6 top-1 w-4 h-4 rounded-full ${colors.bg} timeline-dot z-10`} />
                    <div className={`absolute left-3 sm:left-5 top-0 w-6 h-6 rounded-full ${colors.bgLight} opacity-50`} style={{ animationDuration: '3s' }} />

                    {/* Phase card */}
                    <div className={`glow-card p-6 border ${colors.border}`}>
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bgLight} ${colors.text}`}>
                          {phase.weeks}
                        </span>
                        <span className="text-sm font-semibold text-white">{phase.label}</span>
                      </div>

                      {/* Tasks */}
                      <ul className="space-y-2 mb-4">
                        {phase.tasks.map((task) => (
                          <li key={task} className="flex items-start gap-2 text-sm text-gray-400">
                            <CircleCheck size={14} className={`${colors.text} mt-0.5 shrink-0`} />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Output */}
                      <div className="text-sm text-gray-300 bg-white/[0.02] rounded-lg px-4 py-2.5 border border-white/5">
                        <span className="text-gray-500 text-xs uppercase tracking-wider">Output: </span>
                        {phase.output}
                      </div>

                      {/* Milestone badge */}
                      {phase.milestone && (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-orange-500/10 border border-blue-500/20"
                        >
                          <Milestone size={16} className="text-blue-400" />
                          <span className="text-sm font-semibold text-blue-300">{phase.milestoneLabel}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
