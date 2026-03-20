'use client'

import { ScrollReveal } from './scroll-reveal'

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-4 mb-16 ${alignClass}`}>
      <ScrollReveal>
        <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {label}
        </span>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          {title}
        </h2>
      </ScrollReveal>
      {description && (
        <ScrollReveal delay={0.2}>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  )
}
