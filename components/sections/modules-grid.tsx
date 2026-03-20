'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { modules, supplementary } from '@/data/project-data'
import { sectionIds, formatCurrency } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import type { Module } from '@/data/project-data'

const priorityBadge: Record<string, string> = {
  'Rất cao': 'badge-core',
  'Cao': 'badge-high',
  'Trung bình': 'badge-medium',
  'Thấp': 'badge-low',
}

function ModuleCard({ module, displayNumber }: { module: Module; displayNumber: string }) {
  const isCore = module.isCore

  return (
    <Link href={`/modules/${module.id}`} className="block h-full">
      <div className={`glow-card relative overflow-hidden h-full group cursor-pointer ${
        isCore
          ? 'glow-card-core border-amber-500/25 shadow-[0_0_40px_rgba(245,158,11,0.08)]'
          : ''
      } ${isCore ? 'p-8' : 'p-6'}`}>
        {/* Large watermark number */}
        <span className={`absolute top-3 right-4 font-bold text-amber-500/20 pointer-events-none select-none ${
          isCore ? 'text-6xl' : 'text-4xl'
        }`}>
          {displayNumber}
        </span>

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityBadge[module.priority]}`}>
            {module.priority}
          </span>
        </div>

        {/* Module ID + Name */}
        <div className="mb-3 relative z-10">
          <span className="text-xs font-mono text-gray-500">{module.id.toUpperCase()}</span>
          <h3 className={`font-semibold text-white mt-0.5 group-hover:text-amber-300 transition-colors ${
            isCore ? 'text-lg' : 'text-base'
          }`}>
            {module.name}
          </h3>
        </div>

        {/* Type badge */}
        <div className="mb-4 relative z-10">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
            isCore ? 'bg-amber-500/15 text-amber-300' : 'bg-white/5 text-gray-500'
          }`}>
            {module.type}
          </span>
        </div>

        {/* Description */}
        <p className={`text-sm text-gray-400 leading-relaxed mb-5 relative z-10 ${
          isCore ? 'line-clamp-4' : 'line-clamp-2'
        }`}>
          {module.description}
        </p>

        {/* Footer: Effort + Price + Arrow */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
          <div className="text-xs text-gray-500">
            <span className="text-gray-400 font-medium">{module.totalEffort}</span> man-days
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${isCore ? 'text-base text-amber-400' : 'text-sm text-amber-400'}`}>
              {formatCurrency(module.price)}
            </span>
            <ArrowRight size={14} className="text-amber-400/0 group-hover:text-amber-400 transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ModulesGrid() {
  return (
    <section id={sectionIds.modules} className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Modules"
          title={`${modules.length} Modules phân hệ Bán hàng`}
          description="Click vào từng module để xem chi tiết: màn hình, data fields, use cases, logic nghiệp vụ."
        />

        {/* Summary stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-14">
          {[
            { label: 'Modules', value: modules.length },
            { label: 'Use Cases', value: modules.reduce((sum, m) => sum + m.useCases.length, 0) },
            { label: 'Business Rules', value: 11 },
            { label: 'Data Fields', value: modules.reduce((sum, m) => sum + (m.dataFields?.length || 0), 0) },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} className="text-2xl font-bold text-white" />
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bento grid — asymmetric layout */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          staggerDelay={0.08}
        >
          {/* Row 1-2: M01, M02, M04(2x2) */}
          <StaggerItem>
            <ModuleCard module={modules[0]} displayNumber="01" />
          </StaggerItem>
          <StaggerItem>
            <ModuleCard module={modules[1]} displayNumber="02" />
          </StaggerItem>
          <StaggerItem className="lg:col-span-2 lg:row-span-2">
            <ModuleCard module={modules[3]} displayNumber="04" />
          </StaggerItem>

          {/* Row 2: M03, M05 (M04 continues) */}
          <StaggerItem>
            <ModuleCard module={modules[2]} displayNumber="03" />
          </StaggerItem>
          <StaggerItem>
            <ModuleCard module={modules[4]} displayNumber="05" />
          </StaggerItem>

          {/* Row 3: M06(2col), M07 */}
          <StaggerItem className="sm:col-span-2">
            <ModuleCard module={modules[5]} displayNumber="06" />
          </StaggerItem>
          <StaggerItem>
            <ModuleCard module={modules[6]} displayNumber="07" />
          </StaggerItem>
          <StaggerItem>
            <ModuleCard module={modules[7]} displayNumber="08" />
          </StaggerItem>
        </StaggerContainer>

        {/* Divider */}
        <div className="section-divider my-14" />

        {/* Supplementary modules — compact horizontal layout */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Phần bổ trợ</h3>
        </div>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
          {supplementary.map((m, i) => (
            <StaggerItem key={m.id}>
              <ModuleCard module={m} displayNumber={String(modules.length + i + 1).padStart(2, '0')} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
