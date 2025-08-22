'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { TalentCard } from '@/components/TalentCard'
import { FilterBar } from '@/components/FilterBar'
import { PaginationBar } from '@/components/PaginationBar'
import { EmptyState } from '@/components/EmptyState'
import { getTalents } from '@/lib/api'
import { Talent, FilterParams } from '@/lib/types'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export default function TalentsPage() {
  const [talents, setTalents] = useState<Talent[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const { language } = useLanguage()

  // Récupérer les paramètres de l'URL
  const getFiltersFromURL = (): FilterParams => {
    const params: FilterParams = {
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: 12
    }

    const q = searchParams.get('q')
    if (q) params.q = q

    const city = searchParams.get('city')
    if (city) params.city = city

    const contract = searchParams.get('contract')
    if (contract) params.contract = contract.split(',') as any[]

    const workMode = searchParams.get('workMode')
    if (workMode) params.workMode = workMode.split(',') as any[]

    const seniority = searchParams.get('seniority')
    if (seniority) params.seniority = seniority.split(',') as any[]

    const tools = searchParams.get('tools')
    if (tools) params.tools = tools.split(',')

    const sort = searchParams.get('sort') as any
    if (sort) params.sort = sort

    return params
  }

  // Charger les talents
  const loadTalents = async (filters: FilterParams) => {
    try {
      setLoading(true)
      const response = await getTalents(filters)
      setTalents(response.items)
      setTotal(response.total)
      setCurrentPage(response.page)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error('Erreur lors du chargement des talents:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mettre à jour l'URL avec les filtres
  const updateURL = (filters: FilterParams) => {
    const params = new URLSearchParams()
    
    if (filters.q) params.set('q', filters.q)
    if (filters.city) params.set('city', filters.city)
    if (filters.contract?.length) params.set('contract', filters.contract.join(','))
    if (filters.workMode?.length) params.set('workMode', filters.workMode.join(','))
    if (filters.seniority?.length) params.set('seniority', filters.seniority.join(','))
    if (filters.tools?.length) params.set('tools', filters.tools.join(','))
    if (filters.sort) params.set('sort', filters.sort)
    if (filters.page && filters.page > 1) params.set('page', filters.page.toString())

    const newURL = params.toString() ? `?${params.toString()}` : '/talents'
    router.push(newURL)
  }

  // Appliquer les filtres
  const applyFilters = (newFilters: Partial<FilterParams>) => {
    const currentFilters = getFiltersFromURL()
    const updatedFilters = { ...currentFilters, ...newFilters, page: 1 }
    updateURL(updatedFilters)
    loadTalents(updatedFilters)
  }

  // Changer de page
  const changePage = (page: number) => {
    const currentFilters = getFiltersFromURL()
    const updatedFilters = { ...currentFilters, page }
    updateURL(updatedFilters)
    loadTalents(updatedFilters)
  }

  // Charger les talents au montage et quand l'URL change
  useEffect(() => {
    const filters = getFiltersFromURL()
    loadTalents(filters)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Découvrez nos talents UX/UI Design
          </h1>
          <p className="text-xl text-muted-foreground">
            {total > 0 ? `${total} talents` : 'Aucun talent'} trouvé
            {searchParams.get('q') && ` pour "${searchParams.get('q')}"`}
          </p>
        </div>

        {/* Filtres */}
        <FilterBar
          currentFilters={getFiltersFromURL()}
          onApplyFilters={applyFilters}
          onResetFilters={() => {
            router.push('/talents')
            loadTalents({ page: 1, pageSize: 12 })
          }}
        />

        {/* Contenu */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="bg-card border rounded-2xl p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-muted rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24" />
                    <div className="h-3 bg-muted rounded w-32" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : talents.length > 0 ? (
          <>
            {/* Grille des talents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
              {talents.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={changePage}
                total={total}
                pageSize={12}
              />
            )}
          </>
        ) : (
          <EmptyState
            title="Aucun talent trouvé"
            description="Essayez de modifier vos critères de recherche ou de réinitialiser les filtres."
            actionLabel="Réinitialiser les filtres"
            onAction={() => {
              router.push('/talents')
              loadTalents({ page: 1, pageSize: 12 })
            }}
          />
        )}
      </div>
    </div>
  )
}
