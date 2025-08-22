'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, MapPin, Clock, Euro, Building, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Mission } from '@/lib/types'
import { useFavorites } from '@/hooks/useFavorites'
import { useLanguage } from '@/lib/i18n'
import { formatDate, formatSalary, formatDailyRate } from '@/lib/utils'

interface MissionCardProps {
  mission: Mission
}

export function MissionCard({ mission }: MissionCardProps) {
  const { isMissionFavorite, toggleMissionFavorite } = useFavorites()
  const [isFavorite, setIsFavorite] = useState(isMissionFavorite(mission.id))

  const handleToggleFavorite = () => {
    toggleMissionFavorite(mission.id)
    setIsFavorite(!isFavorite)
  }

  const isFavoriteState = isMissionFavorite(mission.id)

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {mission.logo && (
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <img src={mission.logo} alt={mission.company} className="w-8 h-8 object-contain" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {mission.title}
              </h3>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Building className="h-4 w-4" />
                <span className="text-sm">{mission.company}</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFavorite}
            className={`h-8 w-8 ${isFavoriteState ? 'text-red-500' : 'text-muted-foreground'}`}
            aria-label={isFavoriteState ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart className={`h-4 w-4 ${isFavoriteState ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Informations principales */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{mission.location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{mission.workMode}</span>
          </div>
        </div>

        {/* Contrat et niveau */}
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">{mission.contract}</Badge>
          <Badge variant="outline">{mission.seniority}</Badge>
        </div>

        {/* Salaire/TJM */}
        {mission.dailyRate && (
          <div className="flex items-center space-x-2 text-sm font-medium text-primary">
            <Euro className="h-4 w-4" />
            <span>{formatDailyRate(mission.dailyRate[0], mission.dailyRate[1])}</span>
          </div>
        )}
        
        {mission.salaryRange && (
          <div className="flex items-center space-x-2 text-sm font-medium text-primary">
            <Euro className="h-4 w-4" />
            <span>{formatSalary(mission.salaryRange[0], mission.salaryRange[1])}</span>
          </div>
        )}

        {/* Date de publication */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Publié {formatDate(mission.postedAt)}</span>
        </div>

        {/* Outils requis */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Outils requis :</p>
          <div className="flex flex-wrap gap-1">
            {mission.tools.slice(0, 4).map((tool, index) => (
              <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                {tool}
              </span>
            ))}
            {mission.tools.length > 4 && (
              <span className="text-xs bg-muted px-2 py-1 rounded">
                +{mission.tools.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {mission.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {mission.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{mission.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button asChild variant="outline" size="sm">
            <Link href={`/missions/${mission.id}`}>
              Voir la mission
            </Link>
          </Button>
          
          <Button asChild size="sm">
            <Link href={`/missions/${mission.id}`}>
              Postuler
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
