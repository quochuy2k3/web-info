'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronUp } from 'lucide-react'
import { sectionIds } from '@/lib/utils'

const navItems = [
  { label: 'Tổng quan', href: `#${sectionIds.overview}` },
  { label: 'Tech Stack', href: `#${sectionIds.techStack}` },
  { label: 'Modules', href: `#${sectionIds.modules}` },
  { label: 'Kiến trúc', href: `#${sectionIds.architecture}` },
  { label: 'Báo giá', href: `#${sectionIds.pricing}` },
  { label: 'Tiến độ', href: `#${sectionIds.timeline}` },
  { label: 'Thanh toán', href: `#${sectionIds.payment}` },
  { label: 'So sánh', href: `#${sectionIds.comparison}` },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)

      const sections = Object.values(sectionIds)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleMobileNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const targetEl = document.getElementById(targetId)

      // Close the mobile menu immediately
      setMobileOpen(false)

      // Wait for the exit animation to complete before scrolling.
      // The exit animation duration matches the motion.div default (~300ms).
      setTimeout(() => {
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' })
        }
        // Update the URL hash without triggering a scroll
        window.history.pushState(null, '', href)
      }, 350)
    },
    []
  )

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: scrolled ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={scrollToTop} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                BA
              </div>
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors hidden sm:block">
                Proposal
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-indigo-400 bg-indigo-500/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                )
              })}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-0.5">
                {navItems.map((item) => {
                  const sectionId = item.href.replace('#', '')
                  const isActive = activeSection === sectionId
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleMobileNavClick(e, item.href)}
                      className={`block px-4 py-3 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'text-indigo-400 bg-indigo-500/10 font-medium'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Về đầu trang"
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-indigo-600/80 backdrop-blur-sm border border-indigo-500/30 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
