import { Talent, Mission, FilterParams, ApiResponse } from './types'
import talentsData from './mock/talents.json'
import missionsData from './mock/missions.json'

// Simuler une latence réseau
const simulateLatency = async (min = 300, max = 700) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  await new Promise(resolve => setTimeout(resolve, delay))
}

// Fonction de filtrage des talents
const filterTalents = (talents: Talent[], params: FilterParams): Talent[] => {
  let filtered = [...talents]

  // Recherche textuelle
  if (params.q) {
    const query = params.q.toLowerCase()
    filtered = filtered.filter(talent =>
      talent.name.toLowerCase().includes(query) ||
      talent.title.toLowerCase().includes(query) ||
      talent.skills.some(skill => skill.toLowerCase().includes(query)) ||
      talent.location.toLowerCase().includes(query)
    )
  }

  // Filtre par ville
  if (params.city) {
    filtered = filtered.filter(talent =>
      talent.location.toLowerCase().includes(params.city!.toLowerCase())
    )
  }

  // Filtre par contrat
  if (params.contract && params.contract.length > 0) {
    // Pour les talents, on filtre par disponibilité (freelance vs CDI)
    filtered = filtered.filter(talent => {
      if (params.contract!.includes('Freelance')) {
        return talent.dailyRate !== undefined
      }
      if (params.contract!.includes('CDI') || params.contract!.includes('CDD')) {
        return talent.salaryRange !== undefined
      }
      return true
    })
  }

  // Filtre par mode de travail
  if (params.workMode && params.workMode.length > 0) {
    filtered = filtered.filter(talent =>
      talent.workMode.some(mode => params.workMode!.includes(mode))
    )
  }

  // Filtre par seniorité
  if (params.seniority && params.seniority.length > 0) {
    filtered = filtered.filter(talent =>
      params.seniority!.includes(talent.seniority)
    )
  }

  // Filtre par outils
  if (params.tools && params.tools.length > 0) {
    filtered = filtered.filter(talent =>
      talent.tools.some(tool => params.tools!.includes(tool))
    )
  }

  // Filtre par TJM
  if (params.minRate || params.maxRate) {
    filtered = filtered.filter(talent => {
      if (!talent.dailyRate) return false
      if (params.minRate && talent.dailyRate < params.minRate) return false
      if (params.maxRate && talent.dailyRate > params.maxRate) return false
      return true
    })
  }

  // Filtre par salaire
  if (params.minSalary || params.maxSalary) {
    filtered = filtered.filter(talent => {
      if (!talent.salaryRange) return false
      const [min, max] = talent.salaryRange
      if (params.minSalary && max < params.minSalary) return false
      if (params.maxSalary && min > params.maxSalary) return false
      return true
    })
  }

  return filtered
}

// Fonction de filtrage des missions
const filterMissions = (missions: Mission[], params: FilterParams): Mission[] => {
  let filtered = [...missions]

  // Recherche textuelle
  if (params.q) {
    const query = params.q.toLowerCase()
    filtered = filtered.filter(mission =>
      mission.title.toLowerCase().includes(query) ||
      mission.company.toLowerCase().includes(query) ||
      mission.description.toLowerCase().includes(query) ||
      mission.location.toLowerCase().includes(query)
    )
  }

  // Filtre par ville
  if (params.city) {
    filtered = filtered.filter(mission =>
      mission.location.toLowerCase().includes(params.city!.toLowerCase())
    )
  }

  // Filtre par contrat
  if (params.contract && params.contract.length > 0) {
    filtered = filtered.filter(mission =>
      params.contract!.includes(mission.contract)
    )
  }

  // Filtre par mode de travail
  if (params.workMode && params.workMode.length > 0) {
    filtered = filtered.filter(mission =>
      params.workMode!.includes(mission.workMode)
    )
  }

  // Filtre par seniorité
  if (params.seniority && params.seniority.length > 0) {
    filtered = filtered.filter(mission =>
      params.seniority!.includes(mission.seniority)
    )
  }

  // Filtre par outils
  if (params.tools && params.tools.length > 0) {
    filtered = filtered.filter(mission =>
      mission.tools.some(tool => params.tools!.includes(tool))
    )
  }

  // Filtre par TJM
  if (params.minRate || params.maxRate) {
    filtered = filtered.filter(mission => {
      if (!mission.dailyRate) return false
      const [min, max] = mission.dailyRate
      if (params.minRate && max < params.minRate) return false
      if (params.maxRate && min > params.maxRate) return false
      return true
    })
  }

  // Filtre par salaire
  if (params.minSalary || params.maxSalary) {
    filtered = filtered.filter(mission => {
      if (!mission.salaryRange) return false
      const [min, max] = mission.salaryRange
      if (params.minSalary && max < params.minSalary) return false
      if (params.maxSalary && min > params.maxSalary) return false
      return true
    })
  }

  return filtered
}

// Fonction de tri
const sortItems = <T extends Talent | Mission>(
  items: T[],
  sort?: string
): T[] => {
  const sorted = [...items]

  switch (sort) {
    case 'recent':
      if ('postedAt' in sorted[0]) {
        // Pour les missions
        return sorted.sort((a, b) => 
          new Date((b as Mission).postedAt).getTime() - 
          new Date((a as Mission).postedAt).getTime()
        )
      }
      break
    case 'rate':
      if ('dailyRate' in sorted[0]) {
        // Pour les talents avec TJM
        return sorted.sort((a, b) => {
          const rateA = (a as Talent).dailyRate || 0
          const rateB = (b as Talent).dailyRate || 0
          return rateB - rateA
        })
      }
      break
    case 'relevance':
    default:
      // Tri par défaut (featured en premier pour les talents)
      if ('featured' in sorted[0]) {
        return sorted.sort((a, b) => {
          const featuredA = (a as Talent).featured ? 1 : 0
          const featuredB = (b as Talent).featured ? 1 : 0
          return featuredB - featuredA
        })
      }
      break
  }

  return sorted
}

// Fonction de pagination
const paginateItems = <T>(
  items: T[],
  page: number = 1,
  pageSize: number = 12
): { items: T[]; total: number; page: number; pageSize: number; totalPages: number } => {
  const total = items.length
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedItems = items.slice(startIndex, endIndex)

  return {
    items: paginatedItems,
    total,
    page,
    pageSize,
    totalPages
  }
}

// API pour les talents
export async function getTalents(params: FilterParams = {}): Promise<ApiResponse<Talent>> {
  await simulateLatency()
  
  const { page = 1, pageSize = 12, sort = 'relevance' } = params
  
  let filtered = filterTalents(talentsData as Talent[], params)
  filtered = sortItems(filtered, sort)
  
  return paginateItems(filtered, page, pageSize)
}

export async function getTalentById(id: string): Promise<Talent | null> {
  await simulateLatency()
  
  const talent = (talentsData as Talent[]).find(t => t.id === id)
  return talent || null
}

export async function getFeaturedTalents(limit: number = 6): Promise<Talent[]> {
  await simulateLatency()
  
  const featured = (talentsData as Talent[]).filter(t => t.featured)
  return featured.slice(0, limit)
}

// API pour les missions
export async function getMissions(params: FilterParams = {}): Promise<ApiResponse<Mission>> {
  await simulateLatency()
  
  const { page = 1, pageSize = 12, sort = 'recent' } = params
  
  let filtered = filterMissions(missionsData as Mission[], params)
  filtered = sortItems(filtered, sort)
  
  return paginateItems(filtered, page, pageSize)
}

export async function getMissionById(id: string): Promise<Mission | null> {
  await simulateLatency()
  
  const mission = (missionsData as Mission[]).find(m => m.id === id)
  return mission || null
}

export async function getRecentMissions(limit: number = 6): Promise<Mission[]> {
  await simulateLatency()
  
  const sorted = [...(missionsData as Mission[])].sort((a, b) => 
    new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  )
  return sorted.slice(0, limit)
}

// API pour les entreprises
export async function getCompanies(): Promise<any[]> {
  await simulateLatency()
  
  // Import dynamique pour éviter les erreurs de build
  const companiesData = await import('./mock/companies.json')
  return companiesData.default
}

export async function getCompanyById(id: string): Promise<any | null> {
  await simulateLatency()
  
  const companiesData = await import('./mock/companies.json')
  const company = companiesData.default.find((c: any) => c.id === id)
  return company || null
}

// API pour les villes
export async function getCities(): Promise<any[]> {
  await simulateLatency()
  
  // Import dynamique pour éviter les erreurs de build
  const citiesData = await import('./mock/cities.json')
  return citiesData.default
}

// Fonction de recherche globale
export async function globalSearch(query: string): Promise<{
  talents: Talent[]
  missions: Mission[]
}> {
  await simulateLatency()
  
  const talents = (talentsData as Talent[]).filter(talent =>
    talent.name.toLowerCase().includes(query.toLowerCase()) ||
    talent.title.toLowerCase().includes(query.toLowerCase()) ||
    talent.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 5)

  const missions = (missionsData as Mission[]).filter(mission =>
    mission.title.toLowerCase().includes(query.toLowerCase()) ||
    mission.company.toLowerCase().includes(query.toLowerCase()) ||
    mission.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5)

  return { talents, missions }
}
