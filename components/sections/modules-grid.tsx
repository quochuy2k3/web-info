'use client'

import Link from 'next/link'
import {
  Users, Package, FileText, ShoppingCart, RotateCcw, Wallet,
  ArrowLeftRight, Tag, Printer, Shield, Upload, TestTube, ArrowRight,
} from 'lucide-react'
import { modules, supplementary } from '@/data/project-data'
import { sectionIds, formatCurrency } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/section-header'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import type { Module } from '@/data/project-data'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users, Package, FileText, ShoppingCart, RotateCcw, Wallet,
  ArrowLeftRight, Tag, Printer, Shield, Upload, TestTube,
}

const priorityBadge: Record<string, string> = {
  'Rất cao': 'badge-core',
  'Cao': 'badge-high',
  'Trung bình': 'badge-medium',
  'Thấp': 'badge-low',
}

function ModuleCard({ module }: { module: Module }) {
  const Icon = iconMap[module.icon]
  const isCore = module.isCore

  return (
    <Link href={`/modules/${module.id}`} className="block h-full">
      <div className={`glow-card p-6 h-full group cursor-pointer ${isCore ? 'glow-card-core' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            isCore
              ? 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30'
              : 'bg-white/5 border border-white/10'
          }`}>
            {Icon && <Icon size={20} className={isCore ? 'text-indigo-400' : 'text-gray-400'} />}
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityBadge[module.priority]}`}>
            {module.priority}
          </span>
        </div>

        {/* Module ID + Name */}
        <div className="mb-3">
          <span className="text-xs font-mono text-gray-500">{module.id.toUpperCase()}</span>
          <h3 className="text-base font-semibold text-white mt-0.5 group-hover:text-indigo-300 transition-colors">
            {module.name}
          </h3>
        </div>

        {/* Type badge */}
        <div className="mb-4">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
            isCore ? 'bg-indigo-500/15 text-indigo-300' : 'bg-white/5 text-gray-500'
          }`}>
            {module.type}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-2">
          {module.description}
        </p>

        {/* Footer: Effort + Price */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span className="text-gray-400 font-medium">{module.totalEffort}</span> man-days
          </div>
          <div className="text-sm font-semibold text-indigo-400">
            {formatCurrency(module.price)}
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight size={16} className="text-indigo-400" />
        </div>
      </div>
    </Link>
  )
}

export function ModulesGrid() {
  return (
    <section id={sectionIds.modules} className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Modules"
          title="8 Modules phân hệ Bán hàng"
          description="Click vào từng module để xem chi tiết: màn hình, data fields, use cases, logic nghiệp vụ."
        />

        {/* Summary stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-14">
          {[
            { label: 'Modules', value: 8 },
            { label: 'Use Cases', value: 42 },
            { label: 'Business Rules', value: 11 },
            { label: 'Data Fields', value: 27 },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} className="text-2xl font-bold text-white" />
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main modules grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8" staggerDelay={0.08}>
          {/* M01, M02, M03 */}
          {modules.slice(0, 3).map((m) => (
            <StaggerItem key={m.id}>
              <ModuleCard module={m} />
            </StaggerItem>
          ))}
          {/* M04 CORE - spans 2 cols on lg, 1 col at bottom on mobile */}
          <StaggerItem className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <ModuleCard module={modules[3]} />
          </StaggerItem>
          {/* M05 */}
          <StaggerItem>
            <ModuleCard module={modules[4]} />
          </StaggerItem>
          {/* M06 CORE */}
          <StaggerItem>
            <ModuleCard module={modules[5]} />
          </StaggerItem>
          {/* M07 */}
          <StaggerItem>
            <ModuleCard module={modules[6]} />
          </StaggerItem>
          {/* M08 */}
          {modules[7] && (
            <StaggerItem>
              <ModuleCard module={modules[7]} />
            </StaggerItem>
          )}
        </StaggerContainer>

        {/* Divider */}
        <div className="section-divider my-14" />

        {/* Supplementary modules */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Phần bổ trợ</h3>
        </div>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
          {supplementary.map((m) => (
            <StaggerItem key={m.id}>
              <ModuleCard module={m} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
