'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
  title?: string
  className?: string
}

let mermaidInitialized = false

export function MermaidDiagram({ chart, title, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`)

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return

      try {
        const mermaid = (await import('mermaid')).default

        if (!mermaidInitialized) {
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
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '13px',
            },
            flowchart: {
              htmlLabels: true,
              curve: 'basis',
              padding: 15,
            },
            sequence: {
              diagramMarginX: 10,
              diagramMarginY: 10,
              actorMargin: 50,
              width: 140,
              height: 45,
              boxMargin: 8,
              boxTextMargin: 4,
              noteMargin: 8,
              messageMargin: 30,
              mirrorActors: true,
            },
          })
          mermaidInitialized = true
        }

        const { svg } = await mermaid.render(idRef.current, chart)
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
          setRendered(true)
        }
      } catch (err) {
        console.error('Mermaid render error:', err)
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre class="text-xs text-gray-500 p-4 whitespace-pre-wrap">${chart}</pre>`
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
        className={`overflow-x-auto rounded-lg bg-white/[0.02] border border-white/5 p-4 sm:p-6 transition-opacity duration-300 ${
          rendered ? 'opacity-100' : 'opacity-50'
        } [&_svg]:mx-auto [&_svg]:max-w-full`}
      />
    </div>
  )
}
