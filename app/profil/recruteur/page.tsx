'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, ArrowLeft, Save, Users, MapPin, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export default function RecruiterProfilePage() {
  const [formData, setFormData] = useState({
    companyName: 'TechCorp Solutions',
    industry: 'SaaS / Fintech',
    size: '50-200 employés',
    description: 'TechCorp Solutions est une entreprise innovante spécialisée dans le développement de solutions SaaS pour le secteur financier. Nous créons des expériences utilisateur exceptionnelles pour nos clients.',
    website: 'https://techcorp-solutions.com',
    linkedin: 'linkedin.com/company/techcorp-solutions',
    location: 'Paris, France',
    remotePolicy: 'Hybride (2-3 jours/semaine)',
    contactPerson: 'Marie Dubois',
    contactEmail: 'marie.dubois@techcorp-solutions.com',
    contactPhone: '+33 1 23 45 67 89',
    hiringFrequency: 'Permanent',
    typicalProjectDuration: '6-12 mois',
    budgetRange: '500-800€/jour'
  })
  const { language } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // En mode démo, on affiche juste un message
    alert('Profil recruteur sauvegardé ! (Démo UI)')
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
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Profil Recruteur</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Gérez les informations de votre entreprise et vos besoins de recrutement
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations entreprise */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations entreprise</CardTitle>
                  <CardDescription>
                    Présentez votre entreprise et son activité
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                      Nom de l'entreprise
                    </label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium mb-2">
                        Secteur d'activité
                      </label>
                      <Input
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        placeholder="ex: SaaS, Fintech, E-commerce..."
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium mb-2">
                        Taille de l'entreprise
                      </label>
                      <select
                        id="size"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="1-10 employés">1-10 employés</option>
                        <option value="11-50 employés">11-50 employés</option>
                        <option value="50-200 employés">50-200 employés</option>
                        <option value="200-1000 employés">200-1000 employés</option>
                        <option value="1000+ employés">1000+ employés</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      Description de l'entreprise
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Décrivez votre entreprise, sa mission, ses valeurs..."
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium mb-2">
                        Localisation
                      </label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="ex: Paris, France"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="remotePolicy" className="block text-sm font-medium mb-2">
                        Politique télétravail
                      </label>
                      <select
                        id="remotePolicy"
                        value={formData.remotePolicy}
                        onChange={(e) => setFormData({ ...formData, remotePolicy: e.target.value })}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="100% Remote">100% Remote</option>
                        <option value="Hybride (2-3 jours/semaine)">Hybride (2-3 jours/semaine)</option>
                        <option value="Hybride (1-2 jours/semaine)">Hybride (1-2 jours/semaine)</option>
                        <option value="Sur site uniquement">Sur site uniquement</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Politique de recrutement */}
              <Card>
                <CardHeader>
                  <CardTitle>Politique de recrutement</CardTitle>
                  <CardDescription>
                    Vos habitudes et besoins en recrutement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="hiringFrequency" className="block text-sm font-medium mb-2">
                        Fréquence de recrutement
                      </label>
                      <select
                        id="hiringFrequency"
                        value={formData.hiringFrequency}
                        onChange={(e) => setFormData({ ...formData, hiringFrequency: e.target.value })}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Permanent">Permanent</option>
                        <option value="Freelance">Freelance</option>
                        <option value="CDD">CDD</option>
                        <option value="Stage">Stage</option>
                        <option value="Mixte">Mixte</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="typicalProjectDuration" className="block text-sm font-medium mb-2">
                        Durée typique des projets
                      </label>
                      <Input
                        id="typicalProjectDuration"
                        value={formData.typicalProjectDuration}
                        onChange={(e) => setFormData({ ...formData, typicalProjectDuration: e.target.value })}
                        placeholder="ex: 6-12 mois"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="budgetRange" className="block text-sm font-medium mb-2">
                      Fourchette de budget (TJM)
                    </label>
                    <Input
                      id="budgetRange"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      placeholder="ex: 500-800€/jour"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Contact principal */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact principal</CardTitle>
                  <CardDescription>
                    Votre contact de référence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium mb-2">
                      Nom du contact
                    </label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="ex: Marie Dubois"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
                      Email de contact
                    </label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="contact@entreprise.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+33 1 23 45 67 89"
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
                    <label htmlFor="website" className="block text-sm font-medium mb-2">
                      Site web
                    </label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://votre-entreprise.com"
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
                      placeholder="linkedin.com/company/votre-entreprise"
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
