'use client'

import { motion } from 'framer-motion'
import { User, Phone, MapPin, Calendar, Clock } from 'lucide-react'
import { projectInfo } from '@/data/project-data'
import { sectionIds } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function Footer() {
  return (
    <section id={sectionIds.contact} className="py-16 sm:py-24 lg:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Liên hệ ngay để thảo luận chi tiết và khởi động dự án.
            </p>
            <motion.a
              href="tel:0905192021"
              aria-label="Gọi điện liên hệ"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-cyan-500 transition-all shadow-lg shadow-indigo-500/25"
            >
              <Phone size={18} />
              Liên hệ ngay
            </motion.a>
          </div>
        </ScrollReveal>

        {/* Contact info */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 sm:mb-16">
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={16} className="text-indigo-400" />
              <span className="text-sm">{projectInfo.provider.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <User size={16} className="text-indigo-400" />
              <span className="text-sm">{projectInfo.provider.contact}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Calendar size={16} className="text-indigo-400" />
              <span className="text-sm">Ngày báo giá: {projectInfo.provider.date}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Clock size={16} className="text-indigo-400" />
              <span className="text-sm">Hiệu lực: {projectInfo.provider.validity}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Footer bottom */}
        <div className="text-center text-sm text-gray-600">
          <p>&copy; 2026 {projectInfo.provider.contact} — {projectInfo.provider.location}</p>
          <p className="mt-1">Proposal document — Confidential</p>
        </div>
      </div>
    </section>
  )
}
