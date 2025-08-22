'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  User, 
  FileText, 
  Briefcase, 
  Send, 
  LogOut,
  Building2
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilPageComponent() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('profil')

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const isRecruiter = user?.job_title || user?.company
  
  const menuItems = isRecruiter ? [
    {
      id: 'profil',
      label: 'Mon Profil',
      icon: User,
      description: 'Gérer vos informations personnelles'
    },
    {
      id: 'entreprise',
      label: 'Mon Entreprise',
      icon: Building2,
      description: 'Gérer les informations de votre entreprise'
    },
    {
      id: 'nouvelle-offre',
      label: 'Nouvelle Offre',
      icon: Briefcase,
      description: 'Publier une nouvelle mission'
    }
  ] : [
    {
      id: 'profil',
      label: 'Mon Profil',
      icon: User,
      description: 'Gérer vos informations personnelles'
    },
    {
      id: 'cv',
      label: 'Mes CV',
      icon: FileText,
      description: 'Gérer vos CV et documents'
    },
    {
      id: 'offres',
      label: 'Voir les Offres',
      icon: Briefcase,
      description: 'Parcourir les missions disponibles'
    },
    {
      id: 'postulations',
      label: 'Mes Offres Postulées',
      icon: Send,
      description: 'Suivre vos candidatures'
    }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'profil':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Mon Profil</h2>
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
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
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <input 
                      type="tel" 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ville</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Paris, Lyon, Marseille..."
                    />
                  </div>
                </div>
                <Button className="w-full md:w-auto">
                  Sauvegarder les modifications
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'cv':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Mes CV</h2>
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Aucun CV téléchargé pour le moment</p>
                  <Button>
                    Télécharger un CV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'offres':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Voir les Offres</h2>
            <Card>
              <CardHeader>
                <CardTitle>Missions Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Redirection vers la page des missions...
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => router.push('/missions')}
                >
                  Voir toutes les missions
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'postulations':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Mes Offres Postulées</h2>
            <Card>
              <CardHeader>
                <CardTitle>Candidatures en Cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Send className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Aucune candidature pour le moment</p>
                  <p className="text-sm text-gray-500">
                    Commencez par postuler à des missions qui vous intéressent
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'entreprise':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Mon Entreprise</h2>
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'Entreprise</CardTitle>
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
                      placeholder="Tech, Finance, Design..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Taille de l'entreprise</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                      <option value="">Sélectionnez...</option>
                      <option value="1-10">1-10 employés</option>
                      <option value="11-50">11-50 employés</option>
                      <option value="51-200">51-200 employés</option>
                      <option value="200+">200+ employés</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Site web</label>
                    <input 
                      type="url" 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="https://votre-entreprise.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description de l'entreprise</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    placeholder="Décrivez votre entreprise, sa mission, ses valeurs..."
                  ></textarea>
                </div>
                <Button className="w-full md:w-auto">
                  Sauvegarder les informations
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'nouvelle-offre':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Nouvelle Offre</h2>
            <Card>
              <CardHeader>
                <CardTitle>Publier une Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Créer une nouvelle mission</p>
                  <p className="text-sm text-gray-500 mb-6">
                    Publiez une nouvelle offre d'emploi pour attirer les meilleurs talents
                  </p>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => router.push('/publier')}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Créer une Mission
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      default:
        return null
    }
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Barre latérale */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            {/* En-tête avec type d'utilisateur */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-800">
                  {isRecruiter ? 'Recruteur' : 'Candidat'}
                </span>
              </div>
              <div className="h-px bg-gray-200"></div>
            </div>

            {/* Menu de navigation */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </button>
                )
              })}
            </nav>

            {/* Bouton de déconnexion en bas */}
            <div className="absolute bottom-6 left-6 right-6">
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
