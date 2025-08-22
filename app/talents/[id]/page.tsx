'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Heart, 
  HeartOff, 
  MapPin, 
  Calendar, 
  Euro, 
  Mail, 
  Linkedin, 
  Globe, 
  Star,
  Clock,
  Users,
  Briefcase,
  Award,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useFavorites } from '@/hooks/useFavorites'
import { getTalentById } from '@/lib/api'
import { Talent } from '@/lib/types'
import { formatSalary, formatDailyRate } from '@/lib/utils'

export default function TalentDetailPage() {
  const params = useParams()
  const talentId = params.id as string
  const [talent, setTalent] = useState<Talent | null>(null)
  const [loading, setLoading] = useState(true)
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  
  const isFavorite = talent ? favorites.talents.includes(talent.id) : false

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        const data = await getTalentById(talentId)
        setTalent(data)
      } catch (error) {
        console.error('Erreur lors du chargement du talent:', error)
      } finally {
        setLoading(false)
      }
    }

    if (talentId) {
      fetchTalent()
    }
  }, [talentId])

  const handleToggleFavorite = () => {
    if (talent) {
      if (isFavorite) {
        removeFromFavorites('talents', talent.id)
      } else {
        addToFavorites('talents', talent.id)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!talent) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Talent non trouvé</h1>
            <p className="text-muted-foreground mb-6">
              Le talent que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button asChild>
              <Link href="/talents">Voir tous les talents</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header avec navigation */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Button variant="ghost" asChild>
              <Link href="/talents" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Retour aux talents</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête du profil */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={talent.avatar} alt={talent.name} />
                    <AvatarFallback className="text-2xl">
                      {talent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                          {talent.name}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-3">
                          {talent.title}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{talent.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{talent.availability}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Euro className="h-4 w-4" />
                            <span>{formatDailyRate(talent.dailyRate)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={isFavorite ? "default" : "outline"}
                          size="sm"
                          onClick={handleToggleFavorite}
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
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* À propos */}
            <Card>
              <CardHeader>
                <CardTitle>À propos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {talent.bio}
                </p>
              </CardContent>
            </Card>

            {/* Expérience */}
            <Card>
              <CardHeader>
                <CardTitle>Expérience</CardTitle>
                <CardDescription>
                  {talent.experience} ans d'expérience en UX/UI Design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {talent.recentProjects?.map((project, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h4 className="font-semibold text-foreground">{project.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools?.map((tool, toolIndex) => (
                          <Badge key={toolIndex} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compétences */}
            <Card>
              <CardHeader>
                <CardTitle>Compétences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Compétences principales</h4>
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.map((skill, index) => (
                        <Badge key={index} variant="default">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Outils maîtrisés</h4>
                    <div className="flex flex-wrap gap-2">
                      {talent.tools.map((tool, index) => (
                        <Badge key={index} variant="secondary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Langues</h4>
                    <div className="flex flex-wrap gap-2">
                      {talent.languages.map((language, index) => (
                        <Badge key={index} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio et réalisations */}
            {talent.portfolio && (
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-foreground">
                      Découvrez le travail de {talent.name.split(' ')[0]} sur son portfolio.
                    </p>
                    <Button asChild>
                      <a href={talent.portfolio} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Voir le portfolio
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  <Mail className="h-4 w-4 mr-2" />
                  Contacter
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger CV
                </Button>
                <Button variant="outline" className="w-full">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Voir les missions
                </Button>
              </CardContent>
            </Card>

            {/* Informations clés */}
            <Card>
              <CardHeader>
                <CardTitle>Informations clés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Disponibilité</span>
                  <span className="font-medium">{talent.availability}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">TJM</span>
                  <span className="font-medium">{formatDailyRate(talent.dailyRate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expérience</span>
                  <span className="font-medium">{talent.experience} ans</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Localisation</span>
                  <span className="font-medium">{talent.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Liens sociaux */}
            <Card>
              <CardHeader>
                <CardTitle>Liens sociaux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {talent.linkedin && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`https://${talent.linkedin}`} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {talent.website && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={talent.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Site web
                    </a>
                  </Button>
                )}
                {talent.portfolio && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={talent.portfolio} target="_blank" rel="noopener noreferrer">
                      <Award className="h-4 w-4 mr-2" />
                      Portfolio
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Projets réalisés</span>
                  <span className="font-medium">25+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Clients satisfaits</span>
                  <span className="font-medium">20+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Note moyenne</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">4.8</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Note de démo */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm">
            <span>💾 Démo UI — données simulées</span>
          </div>
        </div>
      </div>
    </div>
  )
}
