'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Users, Package, FileText, ShoppingCart, RotateCcw,
  Wallet, ArrowLeftRight, Tag, Printer, Shield, Upload, TestTube,
  Database, ListChecks, Workflow, AlertTriangle, GitBranch, Columns3,
  BookOpen, BarChart3,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { moduleDiagrams } from '@/data/module-diagrams'
import { MermaidDiagram } from '@/components/ui/mermaid-diagram'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import type { Module } from '@/data/project-data'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users, Package, FileText, ShoppingCart, RotateCcw, Wallet,
  ArrowLeftRight, Tag, Printer, Shield, Upload, TestTube,
}

const priorityColor: Record<string, string> = {
  'Rất cao': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  'Cao': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Trung bình': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'Thấp': 'text-gray-400 bg-gray-500/10 border-gray-500/20',
}

export function ModuleDetail({ module }: { module: Module }) {
  const Icon = iconMap[module.icon]

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Top bar */}
      <div className="sticky top-0 z-50 glass-nav">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/#modules"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Quay lại</span>
          </Link>
          <span className="text-xs font-mono text-gray-600">{module.id.toUpperCase()}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Module header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-start gap-5 mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
              module.isCore
                ? 'bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/30'
                : 'bg-white/5 border border-white/10'
            }`}>
              {Icon && <Icon size={28} className={module.isCore ? 'text-blue-400' : 'text-gray-400'} />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs font-mono text-gray-500">{module.id.toUpperCase()}</span>
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${priorityColor[module.priority]}`}>
                  {module.priority}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-500">{module.type}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{module.name}</h1>
            </div>
          </div>

          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">{module.description}</p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { label: 'Frontend', value: `${module.effortFE} ngày` },
              { label: 'Backend', value: `${module.effortBE} ngày` },
              { label: 'Tổng effort', value: `${module.totalEffort} man-days` },
              { label: 'Giá', value: formatCurrency(module.price) },
            ].map((stat) => (
              <div key={stat.label} className="glow-card px-5 py-3">
                <div className="text-xs text-gray-500 mb-0.5">{stat.label}</div>
                <div className="text-sm font-semibold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-12">
          {/* Screen Description */}
          {module.screenDescription && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  <Columns3 size={20} className="text-blue-400" />
                  Màn hình danh sách
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">{module.screenDescription}</p>
              </div>
            </ScrollReveal>
          )}

          {/* Form Description */}
          {module.formDescription && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  <FileText size={20} className="text-cyan-400" />
                  Form nhập liệu
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">{module.formDescription}</p>
              </div>
            </ScrollReveal>
          )}

          {/* Data Fields */}
          {module.dataFields && module.dataFields.length > 0 && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Database size={20} className="text-emerald-400" />
                  Data Fields ({module.dataFields.length})
                </h2>

                <div className="hidden lg:grid grid-cols-[140px_100px_60px_1fr_150px] gap-3 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/5 mb-1">
                  <span>Field</span>
                  <span>Type</span>
                  <span>Req</span>
                  <span>Description</span>
                  <span>Example</span>
                </div>

                <StaggerContainer className="divide-y divide-white/[0.02]" staggerDelay={0.03}>
                  {module.dataFields.map((field) => (
                    <StaggerItem key={field.name}>
                      {/* Desktop row */}
                      <div className="hidden lg:grid grid-cols-[140px_100px_60px_1fr_150px] gap-3 px-4 py-2.5 table-row-hover rounded transition-colors">
                        <span className="text-sm font-mono text-blue-300">{field.name}</span>
                        <span className="text-xs text-gray-500 font-mono">{field.type}</span>
                        <span>{field.required ? <span className="text-xs text-emerald-400">Yes</span> : <span className="text-xs text-gray-600">No</span>}</span>
                        <span className="text-sm text-gray-400">{field.description}</span>
                        <span className="text-xs text-gray-600 font-mono">{field.example || ''}</span>
                      </div>
                      {/* Mobile/tablet card */}
                      <div className="lg:hidden px-4 py-2.5 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-blue-300">{field.name}</span>
                          <span className="text-xs text-gray-500 font-mono">({field.type})</span>
                          {field.required && <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Required</span>}
                        </div>
                        <div className="text-sm text-gray-400">{field.description}</div>
                        {field.example && <div className="text-xs text-gray-600 font-mono">VD: {field.example}</div>}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          )}

          {/* Use Cases */}
          {module.useCases.length > 0 && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <ListChecks size={20} className="text-blue-400" />
                  Use Cases ({module.useCases.length})
                </h2>
                <StaggerContainer className="space-y-3" staggerDelay={0.05}>
                  {module.useCases.map((uc) => (
                    <StaggerItem key={uc.id}>
                      <div className="flex items-start gap-4 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.06] transition-colors">
                        <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded shrink-0 mt-0.5">
                          {uc.id}
                        </span>
                        <div>
                          <h4 className="text-sm font-medium text-white">{uc.name}</h4>
                          {uc.description && (
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{uc.description}</p>
                          )}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          )}

          {/* Logic */}
          {module.logic && module.logic.length > 0 && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Workflow size={20} className="text-blue-400" />
                  Logic tính toán
                </h2>
                <div className="space-y-2">
                  {module.logic.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-2 rounded-lg bg-white/[0.02]">
                      <span className="text-xs font-mono text-blue-400/60 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-mono text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Side Effects */}
          {module.sideEffects && module.sideEffects.length > 0 && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <AlertTriangle size={20} className="text-rose-400" />
                  Side Effects (khi lưu thành công)
                </h2>
                <div className="space-y-2">
                  {module.sideEffects.map((effect, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="text-rose-400/60 mt-0.5">→</span>
                      <span>{effect}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Accounting Entries */}
          {module.accountingEntries && module.accountingEntries.length > 0 && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-3">
                  <BookOpen size={20} className="text-cyan-400" />
                  Bút toán Hạch toán
                </h2>
                <p className="text-xs text-gray-500 mb-5">Hệ thống tự động ghi nhận các bút toán kế toán khi lưu chứng từ.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-gray-500 font-medium pr-4">Nghiệp vụ</th>
                        <th className="text-left py-2 text-blue-400 font-medium pr-4">Tăng (+)</th>
                        <th className="text-left py-2 text-cyan-400 font-medium pr-4">Giảm (−)</th>
                        <th className="text-left py-2 text-gray-500 font-medium hidden sm:table-cell">Diễn giải</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.accountingEntries.map((ae) => (
                        <tr key={ae.entry} className="border-b border-white/[0.03]">
                          <td className="py-2.5 text-gray-300 font-medium pr-4">{ae.entry}</td>
                          <td className="py-2.5 text-blue-300 font-mono text-xs pr-4">{ae.debit}</td>
                          <td className="py-2.5 text-cyan-300 font-mono text-xs pr-4">{ae.credit}</td>
                          <td className="py-2.5 text-gray-500 text-xs hidden sm:table-cell">{ae.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Diagrams */}
          {moduleDiagrams[module.id] && moduleDiagrams[module.id].length > 0 && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <BarChart3 size={20} className="text-blue-400" />
                  Diagrams
                </h2>
                <div className="space-y-8">
                  {moduleDiagrams[module.id].map((diagram, i) => (
                    <MermaidDiagram
                      key={i}
                      chart={diagram.chart}
                      title={diagram.title}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Flow */}
          {module.flow && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  <GitBranch size={20} className="text-teal-400" />
                  Flow
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed font-mono bg-white/[0.02] px-4 py-3 rounded-lg">
                  {module.flow}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Statuses */}
          {module.statuses && module.statuses.length > 0 && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-4">Trạng thái</h2>
                <div className="flex flex-wrap gap-2">
                  {module.statuses.map((status) => (
                    <span key={status} className="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                      {status}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Comparison Table (for M05) */}
          {module.comparisonTable && (
            <ScrollReveal>
              <div className="glow-card p-7">
                <h2 className="text-xl font-semibold text-white mb-6">So sánh Bán hàng vs Trả lại</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left py-2 text-gray-500 font-medium">Tiêu chí</th>
                        <th className="text-left py-2 text-blue-400 font-medium">Bán hàng (M04)</th>
                        <th className="text-left py-2 text-cyan-400 font-medium">Trả lại (M05)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.comparisonTable.map((row) => (
                        <tr key={row.label} className="border-b border-white/[0.02]">
                          <td className="py-2.5 text-gray-400">{row.label}</td>
                          <td className="py-2.5 text-gray-300">{row.sell}</td>
                          <td className="py-2.5 text-gray-300">{row.return}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <Link
            href="/#modules"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Tất cả modules
          </Link>
        </div>
      </div>
    </div>
  )
}
