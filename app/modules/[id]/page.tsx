import type { Metadata } from 'next'
import Link from 'next/link'
import { modules, supplementary } from '@/data/project-data'
import { ModuleDetail } from '@/components/module-detail'

const allModules = [...modules, ...supplementary]

export function generateStaticParams() {
  return allModules.map((m) => ({ id: m.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const module = allModules.find((m) => m.id === id)

  if (!module) {
    return { title: 'Module không tìm thấy' }
  }

  return {
    title: `${module.id.toUpperCase()} — ${module.name} | Proposal`,
    description: module.description,
  }
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const module = allModules.find((m) => m.id === id)

  if (!module) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Module không tìm thấy</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    )
  }

  return <ModuleDetail module={module} />
}
