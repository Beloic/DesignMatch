'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, ArrowLeft, Send, Building2, MapPin, Calendar, Euro, Users, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export default function PublishMissionPage() {
  const [formData, setFormData] = useState({
    title: 'Product Designer Senior pour application mobile',
    company: 'TechCorp Solutions',
    location: 'Paris, France',
    contractType: 'Freelance',
    workMode: 'Hybride',
    seniority: 'Senior',
    duration: '6 mois',
    startDate: '2024-03-01',
    dailyRate: 650,
    description: 'Nous recherchons un Product Designer Senior pour rejoindre notre équipe et participer au développement de notre application mobile innovante. Vous travaillerez en étroite collaboration avec nos équipes produit et développement.',
    requirements: [
      'Minimum 5 ans d\'expérience en Product Design',
      'Maîtrise de Figma et des outils de prototypage',
      'Expérience en conception d\'applications mobiles',
      'Capacité à mener des recherches utilisateur'
    ],
    responsibilities: [
      'Conception de l\'expérience utilisateur',
      'Création de wireframes et prototypes',
      'Tests utilisateur et itérations',
      'Collaboration avec les développeurs'
    ],
    skills: ['UX Research', 'Prototypage', 'Design System', 'Mobile Design'],
    tools: ['Figma', 'Principle', 'Miro', 'Notion'],
    benefits: [
      'Télétravail flexible',
      'Équipe dynamique et innovante',
      'Projets impactants',
      'Formation continue'
    ]
  })
  const { language } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // En mode démo, on affiche juste un message
    alert('Mission publiée avec succès ! (Démo UI)')
  }

  const addItem = (field: keyof typeof formData, item: string) => {
    if (Array.isArray(formData[field])) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] as string[]), item]
      })
    }
  }

  const removeItem = (field: keyof typeof formData, index: number) => {
    if (Array.isArray(formData[field])) {
      setFormData({
        ...formData,
        [field]: (formData[field] as string[]).filter((_, i) => i !== index)
      })
    }
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
            <Plus className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Publier une mission</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Créez et publiez votre mission pour attirer les meilleurs talents UX/UI
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations de base */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations de base</CardTitle>
                  <CardDescription>
                    Les détails essentiels de votre mission
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                      Titre de la mission *
                    </label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="ex: Product Designer Senior pour application mobile"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Entreprise *
                      </label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nom de votre entreprise"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium mb-2">
                        Localisation *
                      </label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="ex: Paris, France"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="contractType" className="block text-sm font-medium mb-2">
                        Type de contrat
                      </label>
                      <select
                        id="contractType"
                        value={formData.contractType}
                        onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Freelance">Freelance</option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Stage">Stage</option>
                        <option value="Alternance">Alternance</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="workMode" className="block text-sm font-medium mb-2">
                        Mode de travail
                      </label>
                      <select
                        id="workMode"
                        value={formData.workMode}
                        onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Sur site">Sur site</option>
                        <option value="Hybride">Hybride</option>
                        <option value="100% Remote">100% Remote</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="seniority" className="block text-sm font-medium mb-2">
                        Séniorité
                      </label>
                      <select
                        id="seniority"
                        value={formData.seniority}
                        onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Junior">Junior</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium mb-2">
                        Durée
                      </label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="ex: 6 mois, 1 an..."
                      />
                    </div>
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium mb-2">
                        Date de début
                      </label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                    </div>
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

              {/* Description et exigences */}
              <Card>
                <CardHeader>
                  <CardTitle>Description et exigences</CardTitle>
                  <CardDescription>
                    Décrivez votre mission et ce que vous attendez
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      Description de la mission *
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Décrivez en détail la mission, le contexte, les objectifs..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Exigences principales
                    </label>
                    <div className="space-y-2">
                      {formData.requirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={req}
                            onChange={(e) => {
                              const newReqs = [...formData.requirements]
                              newReqs[index] = e.target.value
                              setFormData({ ...formData, requirements: newReqs })
                            }}
                            placeholder="Exigence..."
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem('requirements', index)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addItem('requirements', '')}
                      >
                        Ajouter une exigence
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Responsabilités
                    </label>
                    <div className="space-y-2">
                      {formData.responsibilities.map((resp, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={resp}
                            onChange={(e) => {
                              const newResps = [...formData.responsibilities]
                              newResps[index] = e.target.value
                              setFormData({ ...formData, responsibilities: newResps })
                            }}
                            placeholder="Responsabilité..."
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem('responsibilities', index)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addItem('responsibilities', '')}
                      >
                        Ajouter une responsabilité
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compétences et outils */}
              <Card>
                <CardHeader>
                  <CardTitle>Compétences et outils</CardTitle>
                  <CardDescription>
                    Les compétences et outils requis pour cette mission
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium mb-2">
                      Compétences requises
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
                </CardContent>
              </Card>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Avantages et bénéfices */}
              <Card>
                <CardHeader>
                  <CardTitle>Avantages et bénéfices</CardTitle>
                  <CardDescription>
                    Ce que vous proposez aux candidats
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Avantages proposés
                    </label>
                    <div className="space-y-2">
                      {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={benefit}
                            onChange={(e) => {
                              const newBenefits = [...formData.benefits]
                              newBenefits[index] = e.target.value
                              setFormData({ ...formData, benefits: newBenefits })
                            }}
                            placeholder="Avantage..."
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem('benefits', index)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addItem('benefits', '')}
                      >
                        Ajouter un avantage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Publier la mission
                  </Button>
                </CardContent>
              </Card>

              {/* Aide */}
              <Card>
                <CardHeader>
                  <CardTitle>Conseils pour une bonne annonce</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Soyez précis sur les compétences requises</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Décrivez clairement le contexte et les objectifs</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Mettez en avant les avantages de votre entreprise</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Précisez le mode de travail et la flexibilité</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>

        {/* Note de démo */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm">
            <span>💾 Démo UI — publication simulée</span>
          </div>
        </div>
      </div>
    </div>
  )
}
