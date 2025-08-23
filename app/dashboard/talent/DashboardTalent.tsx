'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  FileText, 
  Briefcase, 
  Send, 
  Eye,
  Calendar,
  TrendingUp,
  Star,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardTalent() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  // Données mock pour la démonstration
  const mockStats = {
    profileViews: 127,
    applications: 8,
    interviews: 3,
    offers: 1,
    responseRate: 85,
    avgResponseTime: '2.4h'
  }

  const mockRecentApplications = [
    {
      id: 1,
      company: 'TechCorp',
      position: 'Senior UX Designer',
      status: 'pending',
      appliedAt: '2024-01-15',
      responseTime: '1.2h'
    },
    {
      id: 2,
      company: 'StartupLab',
      position: 'Product Designer',
      status: 'interview',
      appliedAt: '2024-01-12',
      responseTime: '4.8h'
    },
    {
      id: 3,
      company: 'DesignStudio',
      position: 'UI/UX Designer',
      status: 'rejected',
      appliedAt: '2024-01-10',
      responseTime: '2.1h'
    }
  ]

  const mockRecommendedJobs = [
    {
      id: 1,
      company: 'InnovationCorp',
      position: 'UX Designer',
      location: 'Paris, France',
      type: 'CDI',
      salary: '45k-65k€',
      skills: ['Figma', 'Research', 'Prototyping'],
      postedAt: '2h'
    },
    {
      id: 2,
      company: 'CreativeAgency',
      position: 'Senior Product Designer',
      location: 'Lyon, France',
      type: 'Freelance',
      salary: '400-600€/jour',
      skills: ['Design System', 'Strategy', 'Leadership'],
      postedAt: '5h'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>
      case 'interview':
        return <Badge variant="default" className="bg-blue-500">Entretien</Badge>
      case 'accepted':
        return <Badge variant="default" className="bg-green-500">Accepté</Badge>
      case 'rejected':
        return <Badge variant="destructive">Refusé</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Eye },
    { id: 'applications', label: 'Mes candidatures', icon: Send },
    { id: 'profile', label: 'Mon profil', icon: User },
    { id: 'portfolio', label: 'Portfolio', icon: FileText }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vues du profil</p>
                <p className="text-2xl font-bold">{mockStats.profileViews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Send className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Candidatures</p>
                <p className="text-2xl font-bold">{mockStats.applications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entretiens</p>
                <p className="text-2xl font-bold">{mockStats.interviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Offres reçues</p>
                <p className="text-2xl font-bold">{mockStats.offers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métriques de performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Taux de réponse</span>
              <span className="font-semibold">{mockStats.responseRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Temps de réponse moyen</span>
              <span className="font-semibold">{mockStats.avgResponseTime}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Activité récente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Profil mis à jour il y a 2 jours</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Send className="h-4 w-4 text-blue-500" />
                <span>Nouvelle candidature envoyée</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Eye className="h-4 w-4 text-purple-500" />
                <span>5 nouvelles vues du profil</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offres recommandées */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Offres recommandées</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecommendedJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{job.position}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Posté il y a {job.postedAt}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{job.type}</Badge>
                      <span className="text-sm text-muted-foreground">{job.salary}</span>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => router.push(`/missions/${job.id}`)}>
                    Voir l'offre
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderApplications = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mes candidatures récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentApplications.map((application) => (
              <div key={application.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{application.position}</h3>
                    <p className="text-sm text-muted-foreground">{application.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Candidature envoyée le {application.applicationDate}</span>
                      <span>Réponse en {application.responseTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(application.status)}
                    <Button variant="outline" size="sm">
                      Voir les détails
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom complet</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Votre nom complet"
                defaultValue={user?.full_name || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="votre@email.com"
                defaultValue={user?.email || ''}
              />
            </div>
          </div>
          <Button className="w-full">Mettre à jour le profil</Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderPortfolio = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mon portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Portfolio en construction</h3>
            <p className="text-muted-foreground mb-4">
              Ajoutez vos projets et réalisations pour attirer l'attention des recruteurs
            </p>
            <Button>Ajouter un projet</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'applications':
        return renderApplications()
      case 'profile':
        return renderProfile()
      case 'portfolio':
        return renderPortfolio()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Dashboard Talent</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Gérez votre carrière et suivez vos opportunités
          </p>
        </div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Contenu principal */}
        {renderContent()}
      </div>
    </div>
  )
}
