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
  Building2, 
  Users, 
  Clock, 
  Briefcase,
  Send,
  Share2,
  Bookmark,
  Star,
  CheckCircle,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useFavorites } from '@/hooks/useFavorites'
import { getMissionById, getCompanyById } from '@/lib/api'
import { Mission, Company } from '@/lib/types'
import { formatSalary, formatDailyRate, formatDate } from '@/lib/utils'

export default function MissionDetailPage() {
  const params = useParams()
  const missionId = params.id as string
  const [mission, setMission] = useState<Mission | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  
  const isFavorite = mission ? favorites.missions.includes(mission.id) : false

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const missionData = await getMissionById(missionId)
        setMission(missionData)
        
        // Récupérer les informations de l'entreprise
        if (missionData.companyId) {
          try {
            const companyData = await getCompanyById(missionData.companyId)
            setCompany(companyData)
          } catch (error) {
            console.error('Erreur lors du chargement de l\'entreprise:', error)
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la mission:', error)
      } finally {
        setLoading(false)
      }
    }

    if (missionId) {
      fetchMission()
    }
  }, [missionId])

  const handleToggleFavorite = () => {
    if (mission) {
      if (isFavorite) {
        removeFromFavorites('missions', mission.id)
      } else {
        addToFavorites('missions', mission.id)
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

  if (!mission) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Mission non trouvée</h1>
            <p className="text-muted-foreground mb-6">
              La mission que vous recherchez n'existe pas ou a été supprimée.
            </p>
            <Button asChild>
              <Link href="/missions">Voir toutes les missions</Link>
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
              <Link href="/missions" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Retour aux missions</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête de la mission */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      {company && (
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={company.logo} alt={company.name} />
                          <AvatarFallback className="text-lg">
                            {company.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <h2 className="text-lg font-medium text-muted-foreground">
                          {company?.name || 'Entreprise'}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {mission.location}
                        </p>
                      </div>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                      {mission.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{mission.contractType}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{mission.seniority}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{mission.workMode}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{mission.duration}</span>
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
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description de la mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {mission.description}
                </p>
              </CardContent>
            </Card>

            {/* Exigences */}
            {mission.requirements && mission.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Exigences</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mission.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Responsabilités */}
            {mission.responsibilities && mission.responsibilities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Responsabilités</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mission.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Compétences et outils */}
            <Card>
              <CardHeader>
                <CardTitle>Compétences et outils</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mission.skills && mission.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Compétences requises</h4>
                    <div className="flex flex-wrap gap-2">
                      {mission.skills.map((skill, index) => (
                        <Badge key={index} variant="default">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {mission.tools && mission.tools.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Outils maîtrisés</h4>
                    <div className="flex flex-wrap gap-2">
                      {mission.tools.map((tool, index) => (
                        <Badge key={index} variant="secondary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Avantages et bénéfices */}
            {mission.benefits && mission.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Avantages et bénéfices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mission.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informations sur l'entreprise */}
            {company && (
              <Card>
                <CardHeader>
                  <CardTitle>À propos de l'entreprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback className="text-xl">
                        {company.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {company.name}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {company.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{company.size}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{company.industry}</span>
                        </div>
                      </div>
                    </div>
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
                  <Send className="h-4 w-4 mr-2" />
                  Postuler
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline" className="w-full">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Sauvegarder
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
                  <span className="text-sm text-muted-foreground">Type de contrat</span>
                  <span className="font-medium">{mission.contractType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Séniorité</span>
                  <span className="font-medium">{mission.seniority}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mode de travail</span>
                  <span className="font-medium">{mission.workMode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Durée</span>
                  <span className="font-medium">{mission.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Localisation</span>
                  <span className="font-medium">{mission.location}</span>
                </div>
                {mission.startDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date de début</span>
                    <span className="font-medium">{formatDate(mission.startDate)}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Rémunération */}
            <Card>
              <CardHeader>
                <CardTitle>Rémunération</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mission.dailyRate && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {formatDailyRate(mission.dailyRate)}
                    </div>
                    <p className="text-sm text-muted-foreground">TJM (€/jour)</p>
                  </div>
                )}
                {mission.salary && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {formatSalary(mission.salary)}
                    </div>
                    <p className="text-sm text-muted-foreground">Salaire annuel</p>
                  </div>
                )}
                <div className="text-center text-sm text-muted-foreground">
                  <p>Négociable selon l'expérience</p>
                </div>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vues</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Candidatures</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Partages</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Favoris</span>
                  <span className="font-medium">15</span>
                </div>
              </CardContent>
            </Card>

            {/* Liens utiles */}
            {company && (
              <Card>
                <CardHeader>
                  <CardTitle>Liens utiles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {company.website && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={company.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Site web
                      </a>
                    </Button>
                  )}
                  {company.linkedin && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`https://${company.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Building2 className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
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
