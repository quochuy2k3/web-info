'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#4F46E5',
    primaryTextColor: '#F9FAFB',
    primaryBorderColor: '#6366F1',
    lineColor: '#6366F1',
    secondaryColor: '#1E293B',
    tertiaryColor: '#0F172A',
    background: '#0A0F1E',
    mainBkg: '#131B2E',
    nodeBorder: '#6366F1',
    clusterBkg: '#0F172A',
    clusterBorder: '#1E293B',
    titleColor: '#F9FAFB',
    edgeLabelBackground: '#131B2E',
    nodeTextColor: '#F9FAFB',
    actorTextColor: '#F9FAFB',
    actorBkg: '#1E293B',
    actorBorder: '#6366F1',
    actorLineColor: '#6366F1',
    signalColor: '#F9FAFB',
    signalTextColor: '#F9FAFB',
    labelBoxBkgColor: '#131B2E',
    labelBoxBorderColor: '#6366F1',
    labelTextColor: '#F9FAFB',
    loopTextColor: '#A5B4FC',
    noteBkgColor: '#1E293B',
    noteTextColor: '#F9FAFB',
    noteBorderColor: '#6366F1',
    sectionBkgColor: '#131B2E',
    altSectionBkgColor: '#0F172A',
    sectionBkgColor2: '#1E293B',
    taskBkgColor: '#4F46E5',
    taskTextColor: '#F9FAFB',
    taskBorderColor: '#6366F1',
    activeTaskBkgColor: '#6366F1',
    activeTaskBorderColor: '#818CF8',
    gridColor: '#1E293B',
    doneTaskBkgColor: '#10B981',
    doneTaskBorderColor: '#34D399',
    critBkgColor: '#EF4444',
    critBorderColor: '#F87171',
    todayLineColor: '#22D3EE',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '14px',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    padding: 15,
  },
  sequence: {
    diagramMarginX: 10,
    diagramMarginY: 10,
    actorMargin: 60,
    width: 150,
    height: 50,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    mirrorActors: true,
  },
  er: {
    layoutDirection: 'TB',
    minEntityWidth: 100,
    minEntityHeight: 75,
    entityPadding: 15,
    fontSize: 12,
  },
})

interface MermaidDiagramProps {
  chart: string
  title?: string
  className?: string
}

export function MermaidDiagram({ chart, title, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`)

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return
      try {
        const { svg } = await mermaid.render(idRef.current, chart)
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
          setRendered(true)
        }
      } catch {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre class="text-xs text-red-400 p-4">${chart}</pre>`
        }
      }
    }
    renderChart()
  }, [chart])

  return (
    <div className={className}>
      {title && (
        <h4 className="text-sm font-semibold text-gray-300 mb-3">{title}</h4>
      )}
      <div
        ref={containerRef}
        className={`overflow-x-auto rounded-lg bg-white/[0.02] border border-white/5 p-4 transition-opacity duration-300 ${
          rendered ? 'opacity-100' : 'opacity-50'
        } [&_svg]:mx-auto [&_svg]:max-w-full`}
      />
    </div>
  )
}
