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
              primaryColor: '#2563EB',
              primaryTextColor: '#F9FAFB',
              primaryBorderColor: '#3B82F6',
              lineColor: '#3B82F6',
              secondaryColor: '#1F1F23',
              tertiaryColor: '#141416',
              background: '#0A0A0B',
              mainBkg: '#141416',
              nodeBorder: '#3B82F6',
              clusterBkg: '#141416',
              clusterBorder: '#1F1F23',
              titleColor: '#F9FAFB',
              edgeLabelBackground: '#141416',
              nodeTextColor: '#F9FAFB',
              actorTextColor: '#F9FAFB',
              actorBkg: '#1F1F23',
              actorBorder: '#3B82F6',
              actorLineColor: '#3B82F6',
              signalColor: '#F9FAFB',
              signalTextColor: '#F9FAFB',
              labelBoxBkgColor: '#141416',
              labelBoxBorderColor: '#3B82F6',
              labelTextColor: '#F9FAFB',
              loopTextColor: '#BFDBFE',
              noteBkgColor: '#1F1F23',
              noteTextColor: '#F9FAFB',
              noteBorderColor: '#3B82F6',
              fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
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
