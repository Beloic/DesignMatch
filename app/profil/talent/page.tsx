'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export default function TalentProfilePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@email.com',
    title: 'Product Designer Senior',
    bio: 'Product Designer passionnée avec 8 ans d\'expérience dans la conception d\'expériences utilisateur centrées sur l\'humain. Spécialisée dans la conception de produits digitaux complexes et l\'élaboration de design systems évolutifs.',
    location: 'Paris',
    portfolioUrl: 'https://sophie-martin.design',
    linkedin: 'linkedin.com/in/sophie-martin',
    website: 'sophie-martin.design',
    skills: ['UX Research', 'Prototypage', 'Design System', 'Recherche utilisateur'],
    tools: ['Figma', 'Sketch', 'Adobe XD', 'Principle'],
    languages: ['FR', 'EN'],
    availability: 'Immédiate',
    dailyRate: 650
  })
  const { language } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // En mode démo, on affiche juste un message
    alert('Profil sauvegardé ! (Démo UI)')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Retour à l'accueil</span>
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Mon Profil Talent</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Gérez votre profil et vos informations personnelles
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Vos informations de base et coordonnées
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        Prénom
                      </label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Nom
                      </label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                      Titre professionnel
                    </label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="ex: Product Designer Senior"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-2">
                      Localisation
                    </label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="ex: Paris, Lyon, Remote"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bio et description */}
              <Card>
                <CardHeader>
                  <CardTitle>Biographie</CardTitle>
                  <CardDescription>
                    Présentez-vous et vos compétences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-2">
                      Description professionnelle
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Décrivez votre expérience, vos spécialités..."
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Compétences et outils */}
              <Card>
                <CardHeader>
                  <CardTitle>Compétences et outils</CardTitle>
                  <CardDescription>
                    Vos compétences principales et outils maîtrisés
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium mb-2">
                      Compétences principales
                    </label>
                    <Input
                      id="skills"
                      value={formData.skills.join(', ')}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ').filter(Boolean) })}
                      placeholder="UX Research, Prototypage, Design System..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Séparez les compétences par des virgules
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="tools" className="block text-sm font-medium mb-2">
                      Outils maîtrisés
                    </label>
                    <Input
                      id="tools"
                      value={formData.tools.join(', ')}
                      onChange={(e) => setFormData({ ...formData, tools: e.target.value.split(', ').filter(Boolean) })}
                      placeholder="Figma, Sketch, Adobe XD..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Séparez les outils par des virgules
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="languages" className="block text-sm font-medium mb-2">
                      Langues
                    </label>
                    <Input
                      id="languages"
                      value={formData.languages.join(', ')}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(', ').filter(Boolean) })}
                      placeholder="FR, EN, ES..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Disponibilité et tarifs */}
              <Card>
                <CardHeader>
                  <CardTitle>Disponibilité & Tarifs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium mb-2">
                      Disponibilité
                    </label>
                    <select
                      id="availability"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="Immédiate">Immédiate</option>
                      <option value="Sous 2 semaines">Sous 2 semaines</option>
                      <option value="Sous 3 semaines">Sous 3 semaines</option>
                      <option value="Sous 4 semaines">Sous 4 semaines</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dailyRate" className="block text-sm font-medium mb-2">
                      TJM (€/jour)
                    </label>
                    <Input
                      id="dailyRate"
                      type="number"
                      value={formData.dailyRate}
                      onChange={(e) => setFormData({ ...formData, dailyRate: parseInt(e.target.value) || 0 })}
                      placeholder="650"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Liens externes */}
              <Card>
                <CardHeader>
                  <CardTitle>Liens externes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="portfolioUrl" className="block text-sm font-medium mb-2">
                      Portfolio
                    </label>
                    <Input
                      id="portfolioUrl"
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://votre-portfolio.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
                      LinkedIn
                    </label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/votre-profil"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium mb-2">
                      Site web
                    </label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://votre-site.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <Button type="submit" className="w-full" size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder le profil
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>

        {/* Note de démo */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm">
            <span>💾 Démo UI — sauvegarde simulée en localStorage</span>
          </div>
        </div>
      </div>
    </div>
  )
}
