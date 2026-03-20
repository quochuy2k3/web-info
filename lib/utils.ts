import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ'
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num)
}

const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']
const teens = ['mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín']

function readGroup(n: number): string {
  const h = Math.floor(n / 100)
  const t = Math.floor((n % 100) / 10)
  const u = n % 10
  let result = ''
  if (h > 0) result += ones[h] + ' trăm '
  if (t > 1) {
    result += ones[t] + ' mươi '
    if (u === 1) result += 'mốt'
    else if (u === 5) result += 'lăm'
    else if (u > 0) result += ones[u]
  } else if (t === 1) {
    result += teens[u]
  } else if (u > 0) {
    if (h > 0) result += 'lẻ '
    result += ones[u]
  }
  return result.trim()
}

export function numberToVietnameseWords(n: number): string {
  if (n === 0) return 'không đồng'
  const units = ['', 'nghìn', 'triệu', 'tỷ']
  const groups: number[] = []
  let num = n
  while (num > 0) {
    groups.push(num % 1000)
    num = Math.floor(num / 1000)
  }
  const parts: string[] = []
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue
    const word = readGroup(groups[i])
    if (word) parts.push(word + (units[i] ? ' ' + units[i] : ''))
  }
  const result = parts.join(' ')
  return result.charAt(0).toUpperCase() + result.slice(1) + ' đồng'
}

export const sectionIds = {
  hero: 'hero',
  overview: 'overview',
  techStack: 'tech-stack',
  modules: 'modules',
  architecture: 'architecture',
  businessRules: 'business-rules',
  pricing: 'pricing',
  timeline: 'timeline',
  payment: 'payment',
  comparison: 'comparison',
  warranty: 'warranty',
  contact: 'contact',
} as const
