'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, HeartOff, Mail, Download, Share2, Edit, MapPin, Clock, Euro, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProfileHeaderProps {
  // Informations de base
  name: string
  title: string
  avatar?: string
  location: string
  availability: string
  dailyRate?: number
  experience?: number
  
  // Métadonnées
  rating?: number
  projectsCount?: number
  clientsCount?: number
  
  // Actions
  isFavorite?: boolean
  onToggleFavorite?: () => void
  onContact?: () => void
  onDownloadCV?: () => void
  onShare?: () => void
  onEdit?: () => void
  
  // Variantes
  variant?: 'talent' | 'recruiter' | 'company'
  size?: 'sm' | 'md' | 'lg'
  
  // Classes personnalisées
  className?: string
}

export function ProfileHeader({
  name,
  title,
  avatar,
  location,
  availability,
  dailyRate,
  experience,
  rating,
  projectsCount,
  clientsCount,
  isFavorite = false,
  onToggleFavorite,
  onContact,
  onDownloadCV,
  onShare,
  onEdit,
  variant = 'talent',
  size = 'md',
  className
}: ProfileHeaderProps) {
  const getAvatarSize = () => {
    switch (size) {
      case 'sm': return 'h-16 w-16'
      case 'lg': return 'h-32 w-32'
      default: return 'h-24 w-24'
    }
  }

  const getTitleSize = () => {
    switch (size) {
      case 'sm': return 'text-xl'
      case 'lg': return 'text-4xl'
      default: return 'text-3xl'
    }
  }

  const getSubtitleSize = () => {
    switch (size) {
      case 'sm': return 'text-base'
      case 'lg': return 'text-xl'
      default: return 'text-xl'
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getVariantIcon = () => {
    switch (variant) {
      case 'recruiter':
        return <MapPin className="h-4 w-4" />
      case 'company':
        return <MapPin className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getVariantLabel = () => {
    switch (variant) {
      case 'recruiter':
        return 'Localisation'
      case 'company':
        return 'Localisation'
      default:
        return 'Disponibilité'
    }
  }

  const getVariantValue = () => {
    switch (variant) {
      case 'recruiter':
      case 'company':
        return location
      default:
        return availability
    }
  }

  return (
    <Card className={cn("", className)}>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Avatar */}
          <Avatar className={cn("flex-shrink-0", getAvatarSize())}>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className={cn(
              "text-foreground",
              size === 'sm' ? "text-lg" : size === 'lg' ? "text-3xl" : "text-2xl"
            )}>
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          
          {/* Informations principales */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h1 className={cn("font-bold text-foreground mb-2", getTitleSize())}>
                  {name}
                </h1>
                <p className={cn("text-muted-foreground mb-3", getSubtitleSize())}>
                  {title}
                </p>
                
                {/* Métadonnées */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    {getVariantIcon()}
                    <span>{getVariantLabel()}: {getVariantValue()}</span>
                  </div>
                  
                  {variant === 'talent' && dailyRate && (
                    <div className="flex items-center space-x-1">
                      <Euro className="h-4 w-4" />
                      <span>TJM: {dailyRate}€/jour</span>
                    </div>
                  )}
                  
                  {variant === 'talent' && experience && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{experience} ans d'expérience</span>
                    </div>
                  )}
                  
                  {rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{rating}/5</span>
                    </div>
                  )}
                </div>
                
                {/* Statistiques */}
                {(projectsCount || clientsCount) && (
                  <div className="flex items-center space-x-6 mt-3 text-sm text-muted-foreground">
                    {projectsCount && (
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-foreground">{projectsCount}+</span>
                        <span>projets</span>
                      </div>
                    )}
                    {clientsCount && (
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-foreground">{clientsCount}+</span>
                        <span>clients</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                {onToggleFavorite && (
                  <Button
                    variant={isFavorite ? "default" : "outline"}
                    size="sm"
                    onClick={onToggleFavorite}
                  >
                    {isFavorite ? (
                      <>
                        <Heart className="h-4 w-4 mr-2" />
                        Favori
                      </>
                    ) : (
                      <>
                        <HeartOff className="h-4 w-4 mr-2" />
                        Ajouter
                      </>
                    )}
                  </Button>
                )}
                
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions secondaires */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t">
          {onContact && (
            <Button size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Contacter
            </Button>
          )}
          
          {onDownloadCV && variant === 'talent' && (
            <Button variant="outline" size="sm" onClick={onDownloadCV}>
              <Download className="h-4 w-4 mr-2" />
              Télécharger CV
            </Button>
          )}
          
          {onShare && (
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
