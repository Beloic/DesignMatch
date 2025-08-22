'use client'

import { Search, Filter, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  variant?: 'search' | 'filter' | 'general'
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  variant = 'general'
}: EmptyStateProps) {
  const { language } = useLanguage()

  const getIcon = () => {
    switch (variant) {
      case 'search':
        return <Search className="h-16 w-16 text-muted-foreground" />
      case 'filter':
        return <Filter className="h-16 w-16 text-muted-foreground" />
      default:
        return <RefreshCw className="h-16 w-16 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Icône */}
      <div className="mb-6 text-muted-foreground">
        {getIcon()}
      </div>

      {/* Titre */}
      <h3 className="text-2xl font-semibold text-foreground mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-lg max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {/* Action */}
      {actionLabel && onAction && (
        <Button onClick={onAction} size="lg">
          {actionLabel}
        </Button>
      )}

      {/* Suggestions selon le variant */}
      {variant === 'search' && (
        <div className="mt-8 text-sm text-muted-foreground">
          <p className="mb-2">Suggestions :</p>
          <ul className="space-y-1">
            <li>• Vérifiez l'orthographe des mots-clés</li>
            <li>• Essayez des termes plus généraux</li>
            <li>• Utilisez moins de mots-clés</li>
          </ul>
        </div>
      )}

      {variant === 'filter' && (
        <div className="mt-8 text-sm text-muted-foreground">
          <p className="mb-2">Suggestions :</p>
          <ul className="space-y-1">
            <li>• Élargissez vos critères de recherche</li>
            <li>• Supprimez certains filtres</li>
            <li>• Essayez une localisation différente</li>
          </ul>
        </div>
      )}
    </div>
  )
}
