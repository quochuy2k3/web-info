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
    <ScrollReveal>
      <div className={`flex flex-col gap-3 sm:gap-4 mb-10 sm:mb-16 ${alignClass}`}>
        <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {label}
        </span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-lg text-gray-400 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  )
}
