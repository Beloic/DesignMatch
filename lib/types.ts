export type Seniority = 'Junior' | 'Intermédiaire' | 'Senior' | 'Lead'
export type Contract = 'Freelance' | 'CDI' | 'CDD' | 'Stage' | 'Alternance'
export type WorkMode = 'Remote' | 'Hybride' | 'Sur site'

export interface Talent {
  id: string
  name: string
  title: string // ex: Product Designer
  seniority: Seniority
  skills: string[] // Figma, Prototypage, Design System, Recherche utilisateur...
  tools: string[] // Figma, Sketch, Adobe XD...
  location: string
  workMode: WorkMode[]
  languages: string[] // ["FR", "EN"]
  availability: string // ex: "Immédiate" ou "Sous 2 semaines"
  dailyRate?: number // pour freelance
  salaryRange?: [number, number] // pour CDI
  bio: string
  portfolioUrl?: string
  linkedin?: string
  website?: string
  companyHistory?: { company: string; role: string; from: string; to: string }[]
  caseStudies?: { title: string; summary: string; tags: string[] }[]
  featured?: boolean
  avatar?: string
}

export interface Mission {
  id: string
  title: string
  company: string
  logo?: string
  location: string
  workMode: WorkMode
  contract: Contract
  seniority: Seniority
  description: string
  responsibilities: string[]
  requirements: string[]
  salaryRange?: [number, number]
  dailyRate?: [number, number]
  tools: string[]
  postedAt: string // ISO
  tags: string[]
}

export interface Company {
  id: string
  name: string
  logo: string
  description: string
  industry: string
  size: string
  website: string
  location: string
}

export interface City {
  id: string
  name: string
  country: string
  region: string
}

export interface FilterParams {
  q?: string
  city?: string
  contract?: Contract[]
  workMode?: WorkMode[]
  seniority?: Seniority[]
  tools?: string[]
  sort?: 'recent' | 'rate' | 'relevance'
  page?: number
  pageSize?: number
  minRate?: number
  maxRate?: number
  minSalary?: number
  maxSalary?: number
}

export interface ApiResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface User {
  id: string
  name: string
  email: string
  role: 'talent' | 'recruiter'
  avatar?: string
}

export interface Conversation {
  id: string
  participant: User
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}

export interface Message {
  id: string
  content: string
  senderId: string
  timestamp: string
  isRead: boolean
}

export interface FormData {
  title: string
  company: string
  location: string
  workMode: WorkMode
  contract: Contract
  seniority: Seniority
  description: string
  responsibilities: string[]
  requirements: string[]
  tools: string[]
  salaryRange?: [number, number]
  dailyRate?: [number, number]
  tags: string[]
}
