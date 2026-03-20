'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
  const [visible, setVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentY = window.scrollY
        const delta = currentY - lastScrollY.current

        if (currentY < 100) {
          // At the top — hide nav (hero visible)
          setVisible(false)
        } else if (delta < -5) {
          // Scrolling UP — show nav
          setVisible(true)
        } else if (delta > 10) {
          // Scrolling DOWN — hide nav (only if not mobile menu open)
          if (!mobileOpen) {
            setVisible(false)
          }
        }

        lastScrollY.current = currentY

        // Active section detection
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

        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileOpen])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleMobileNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const targetEl = document.getElementById(targetId)

      setMobileOpen(false)

      setTimeout(() => {
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' })
        }
        window.history.pushState(null, '', href)
      }, 350)
    },
    []
  )

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <button onClick={scrollToTop} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
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
                        ? 'text-blue-400 bg-blue-500/10'
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
              transition={{ duration: 0.25 }}
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
                          ? 'text-blue-400 bg-blue-500/10 font-medium'
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
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Về đầu trang"
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-blue-600/80 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
