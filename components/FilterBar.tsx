'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FilterParams, Contract, WorkMode, Seniority } from '@/lib/types'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

interface FilterBarProps {
  currentFilters: FilterParams
  onApplyFilters: (filters: Partial<FilterParams>) => void
  onResetFilters: () => void
}

const tools = [
  'Figma', 'Sketch', 'Adobe XD', 'Principle', 'Framer', 'Miro', 'Notion',
  'Hotjar', 'UserTesting', 'Google Analytics', 'After Effects', 'Lottie'
]

export function FilterBar({ currentFilters, onApplyFilters, onResetFilters }: FilterBarProps) {
  const [localFilters, setLocalFilters] = useState<FilterParams>(currentFilters)
  const [isExpanded, setIsExpanded] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    setLocalFilters(currentFilters)
  }, [currentFilters])

  const handleFilterChange = (key: keyof FilterParams, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    onApplyFilters(localFilters)
    setIsExpanded(false)
  }

  const handleResetFilters = () => {
    setLocalFilters({ page: 1, pageSize: 12 })
    onResetFilters()
    setIsExpanded(false)
  }

  const hasActiveFilters = Object.keys(currentFilters).some(key => 
    key !== 'page' && key !== 'pageSize' && currentFilters[key as keyof FilterParams]
  )

  const activeFiltersCount = Object.keys(currentFilters).filter(key => 
    key !== 'page' && key !== 'pageSize' && currentFilters[key as keyof FilterParams]
  ).length

  return (
    <div className="bg-card border rounded-2xl p-6 mb-8">
      {/* Header des filtres */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Filtres</h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleResetFilters}>
              <X className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Masquer' : 'Afficher'} les filtres
          </Button>
        </div>
      </div>

      {/* Barre de recherche rapide */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher par nom, compétences, ville..."
            value={localFilters.q || ''}
            onChange={(e) => handleFilterChange('q', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filtres détaillés */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Localisation */}
          <div>
            <label className="block text-sm font-medium mb-3">Localisation</label>
            <Input
              type="text"
              placeholder="Paris, Lyon, Remote..."
              value={localFilters.city || ''}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            />
          </div>

          {/* Contrat */}
          <div>
            <label className="block text-sm font-medium mb-3">Type de contrat</label>
            <div className="flex flex-wrap gap-2">
              {(['Freelance', 'CDI', 'CDD', 'Stage', 'Alternance'] as Contract[]).map((contract) => (
                <Button
                  key={contract}
                  variant={localFilters.contract?.includes(contract) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const current = localFilters.contract || []
                    const newValue = current.includes(contract)
                      ? current.filter(c => c !== contract)
                      : [...current, contract]
                    handleFilterChange('contract', newValue)
                  }}
                >
                  {t(`contracts.${contract.toLowerCase()}`, language)}
                </Button>
              ))}
            </div>
          </div>

          {/* Mode de travail */}
          <div>
            <label className="block text-sm font-medium mb-3">Mode de travail</label>
            <div className="flex flex-wrap gap-2">
              {(['Remote', 'Hybride', 'Sur site'] as WorkMode[]).map((mode) => (
                <Button
                  key={mode}
                  variant={localFilters.workMode?.includes(mode) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const current = localFilters.workMode || []
                    const newValue = current.includes(mode)
                      ? current.filter(m => m !== mode)
                      : [...current, mode]
                    handleFilterChange('workMode', newValue)
                  }}
                >
                  {t(`workModes.${mode.toLowerCase().replace(' ', '')}`, language)}
                </Button>
              ))}
            </div>
          </div>

          {/* Niveau */}
          <div>
            <label className="block text-sm font-medium mb-3">Niveau d'expérience</label>
            <div className="flex flex-wrap gap-2">
              {(['Junior', 'Intermédiaire', 'Senior', 'Lead'] as Seniority[]).map((level) => (
                <Button
                  key={level}
                  variant={localFilters.seniority?.includes(level) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const current = localFilters.seniority || []
                    const newValue = current.includes(level)
                      ? current.filter(l => l !== level)
                      : [...current, level]
                    handleFilterChange('seniority', newValue)
                  }}
                >
                  {t(`seniority.${level.toLowerCase()}`, language)}
                </Button>
              ))}
            </div>
          </div>

          {/* Outils */}
          <div>
            <label className="block text-sm font-medium mb-3">Outils maîtrisés</label>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Button
                  key={tool}
                  variant={localFilters.tools?.includes(tool) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const current = localFilters.tools || []
                    const newValue = current.includes(tool)
                      ? current.filter(t => t !== tool)
                      : [...current, tool]
                    handleFilterChange('tools', newValue)
                  }}
                >
                  {tool}
                </Button>
              ))}
            </div>
          </div>

          {/* Tri */}
          <div>
            <label className="block text-sm font-medium mb-3">Trier par</label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'relevance', label: 'Pertinence' },
                { value: 'recent', label: 'Plus récent' },
                { value: 'rate', label: 'TJM/Salaire' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={localFilters.sort === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('sort', option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          {hasActiveFilters && (
            <span>
              {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleResetFilters}>
            Réinitialiser
          </Button>
          <Button onClick={handleApplyFilters}>
            Appliquer les filtres
          </Button>
        </div>
      </div>
    </div>
  )
}
