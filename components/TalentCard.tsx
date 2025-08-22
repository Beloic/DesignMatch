'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, MapPin, Clock, Euro, Star, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Talent } from '@/lib/types'
import { useFavorites } from '@/hooks/useFavorites'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'
import { formatSalary, formatDailyRate, getInitials, truncateText } from '@/lib/utils'

interface TalentCardProps {
  talent: Talent
  featured?: boolean
}

export function TalentCard({ talent, featured = false }: TalentCardProps) {
  const { isTalentFavorite, toggleTalentFavorite } = useFavorites()
  const { language } = useLanguage()
  const [isFavorite, setIsFavorite] = useState(isTalentFavorite(talent.id))

  const handleToggleFavorite = () => {
    toggleTalentFavorite(talent.id)
    setIsFavorite(!isFavorite)
  }

  const isFavoriteState = isTalentFavorite(talent.id)

  return (
    <div className={`group relative bg-card border rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${featured ? 'ring-2 ring-primary/20' : ''}`}>
      {/* Badge Featured */}
      {featured && (
        <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
          <Star className="inline h-3 w-3 mr-1" />
          Mis en avant
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={talent.avatar} alt={talent.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(talent.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {talent.name}
            </h3>
            <p className="text-muted-foreground text-sm">{talent.title}</p>
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

      {/* Informations principales */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{talent.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{talent.availability}</span>
        </div>

        {/* Salaire/TJM */}
        {talent.dailyRate && (
          <div className="flex items-center space-x-2 text-sm font-medium text-primary">
            <Euro className="h-4 w-4" />
            <span>{formatDailyRate(talent.dailyRate, talent.dailyRate)}</span>
          </div>
        )}
        
        {talent.salaryRange && (
          <div className="flex items-center space-x-2 text-sm font-medium text-primary">
            <Euro className="h-4 w-4" />
            <span>{formatSalary(talent.salaryRange[0], talent.salaryRange[1])}</span>
          </div>
        )}
      </div>

      {/* Compétences */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {talent.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {talent.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{talent.skills.length - 4}
            </Badge>
          )}
        </div>
      </div>

      {/* Outils */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Outils maîtrisés :</p>
        <div className="flex flex-wrap gap-1">
          {talent.tools.slice(0, 3).map((tool, index) => (
            <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
              {tool}
            </span>
          ))}
          {talent.tools.length > 3 && (
            <span className="text-xs bg-muted px-2 py-1 rounded">
              +{talent.tools.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Langues */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Langues :</span>
          {talent.languages.map((lang, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
        {truncateText(talent.bio, 120)}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href={`/talents/${talent.id}`}>
            Voir le profil
          </Link>
        </Button>
        
        <div className="flex items-center space-x-2">
          {talent.portfolioUrl && (
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <a href={talent.portfolioUrl} target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          
          {talent.linkedin && (
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <a href={`https://${talent.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
