'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Users, 
  Briefcase, 
  Plus,
  Eye,
  Calendar,
  TrendingUp,
  Star,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardRecruteur() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  // Données mock pour la démonstration
  const mockStats = {
    activeJobs: 5,
    totalApplications: 47,
    interviewsScheduled: 8,
    hires: 2,
    avgResponseTime: '3.2h',
    profileViews: 89
  }

  const mockActiveJobs = [
    {
      id: 1,
      title: 'Senior UX Designer',
      company: 'TechCorp',
      location: 'Paris, France',
      type: 'CDI',
      salary: '60k-80k€',
      applications: 12,
      status: 'active',
      postedAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'StartupLab',
      location: 'Lyon, France',
      type: 'Freelance',
      salary: '400-600€/jour',
      applications: 8,
      status: 'active',
      postedAt: '2024-01-12'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      type: 'CDD',
      salary: '45k-55k€',
      applications: 15,
      status: 'active',
      postedAt: '2024-01-08'
    }
  ]

  const mockRecentApplications = [
    {
      id: 1,
      candidate: 'Sophie Martin',
      position: 'Senior UX Designer',
      status: 'new',
      appliedAt: '2024-01-15 10:30',
      experience: '5 ans',
      skills: ['Figma', 'Research', 'Prototyping']
    },
    {
      id: 2,
      candidate: 'Thomas Dubois',
      position: 'Product Designer',
      status: 'reviewed',
      appliedAt: '2024-01-15 09:15',
      experience: '3 ans',
      skills: ['Design System', 'Strategy']
    },
    {
      id: 3,
      candidate: 'Emma Leroy',
      position: 'UI/UX Designer',
      status: 'interview',
      appliedAt: '2024-01-14 16:45',
      experience: '4 ans',
      skills: ['Figma', 'Sketch', 'User Testing']
    }
  ]

  const mockTopCandidates = [
    {
      id: 1,
      name: 'Alexandre Moreau',
      title: 'Senior Product Designer',
      experience: '7 ans',
      skills: ['Design System', 'Strategy', 'Leadership'],
      matchScore: 95,
      location: 'Paris, France'
    },
    {
      id: 2,
      name: 'Marie Dubois',
      title: 'UX Researcher',
      experience: '5 ans',
      skills: ['User Research', 'Analytics', 'Prototyping'],
      matchScore: 92,
      location: 'Lyon, France'
    },
    {
      id: 3,
      name: 'Pierre Laurent',
      title: 'UI Designer',
      experience: '4 ans',
      skills: ['Figma', 'Sketch', 'Design System'],
      matchScore: 88,
      location: 'Remote'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="default" className="bg-blue-500">Nouveau</Badge>
      case 'reviewed':
        return <Badge variant="secondary">En cours</Badge>
      case 'interview':
        return <Badge variant="default" className="bg-purple-500">Entretien</Badge>
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
    { id: 'jobs', label: 'Mes offres', icon: Briefcase },
    { id: 'candidates', label: 'Candidats', icon: Users },
    { id: 'company', label: 'Mon entreprise', icon: Building2 }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Offres actives</p>
                <p className="text-2xl font-bold">{mockStats.activeJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Candidatures</p>
                <p className="text-2xl font-bold">{mockStats.totalApplications}</p>
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
                <p className="text-2xl font-bold">{mockStats.interviewsScheduled}</p>
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
              <span className="text-sm text-muted-foreground">Temps de réponse moyen</span>
              <span className="font-semibold">{mockStats.avgResponseTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Vues de profil</span>
              <span className="font-semibold">{mockStats.profileViews}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Embauches réussies</span>
              <span className="font-semibold">{mockStats.hires}</span>
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
                <Users className="h-4 w-4 text-blue-500" />
                <span>3 nouvelles candidatures reçues</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span>Entretien programmé avec Emma Leroy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Offre "Senior UX Designer" publiée</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offres actives */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Offres actives</span>
          </CardTitle>
          <Button onClick={() => router.push('/publier')}>
            <Plus className="h-4 w-4 mr-2" />
            Publier une offre
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActiveJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Posté le {job.postedAt}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{job.type}</Badge>
                      <span className="text-sm text-muted-foreground">{job.salary}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{job.applications}</div>
                    <div className="text-sm text-muted-foreground">candidatures</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Voir les candidats
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

  const renderJobs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mes offres d'emploi</h2>
        <Button onClick={() => router.push('/publier')}>
          <Plus className="h-4 w-4 mr-2" />
          Publier une offre
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {mockActiveJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary">{job.applications}</div>
                      <div className="text-sm text-muted-foreground">candidatures</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Gérer
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

  const renderCandidates = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Candidats récents</h2>

      <Card>
        <CardHeader>
          <CardTitle>Nouvelles candidatures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentApplications.map((application) => (
              <div key={application.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{application.candidate}</h3>
                    <p className="text-sm text-muted-foreground">{application.position}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Expérience : {application.experience}</span>
                      <span>Candidature : {application.appliedAt}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {application.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(application.status)}
                    <Button variant="outline" size="sm">
                      Voir le profil
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top candidats recommandés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTopCandidates.map((candidate) => (
              <div key={candidate.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Expérience : {candidate.experience}</span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{candidate.location}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{candidate.matchScore}%</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Match parfait</div>
                    <Button size="sm" className="mt-2">
                      Contacter
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

  const renderCompany = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations de l'entreprise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom de l'entreprise</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Nom de votre entreprise"
                defaultValue={user?.company || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secteur d'activité</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Tech, Design, Finance..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg h-24"
              placeholder="Décrivez votre entreprise..."
            />
          </div>
          <Button className="w-full">Mettre à jour</Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'jobs':
        return renderJobs()
      case 'candidates':
        return renderCandidates()
      case 'company':
        return renderCompany()
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
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Dashboard Recruteur</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Gérez vos offres et trouvez les meilleurs talents
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
