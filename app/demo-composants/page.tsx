'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, HeartOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProfileHeader } from '@/components/ProfileHeader'
import { Section, SectionHeader, SectionContent, SectionFooter, SectionGrid, SectionList } from '@/components/Section'
import { useToast } from '@/components/ToastArea'
import { useFavorites } from '@/hooks/useFavorites'

export default function ComposantsDemoPage() {
  const { addToast } = useToast()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  const [inputValue, setInputValue] = useState('')

  const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    addToast({
      title: `Toast ${type}`,
      description: `Ceci est un toast de type ${type}`,
      type
    })
  }

  const toggleFavorite = () => {
    const talentId = 'demo-1'
    if (favorites.talents.includes(talentId)) {
      removeFromFavorites('talents', talentId)
      addToast({
        title: 'Retiré des favoris',
        type: 'info'
      })
    } else {
      addToFavorites('talents', talentId)
      addToast({
        title: 'Ajouté aux favoris',
        type: 'success'
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
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Démonstration des Composants
          </h1>
          <p className="text-xl text-muted-foreground">
            Testez tous les composants de l'application
          </p>
        </div>

        {/* Composants UI de base */}
        <Section title="Composants UI de base" variant="card" className="mb-8">
          <SectionGrid cols={2} gap="md">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Boutons</h3>
              <div className="flex flex-wrap gap-2">
                <Button>Bouton principal</Button>
                <Button variant="secondary">Secondaire</Button>
                <Button variant="outline">Contour</Button>
                <Button variant="ghost">Fantôme</Button>
                <Button variant="destructive">Destructif</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Petit</Button>
                <Button size="default">Normal</Button>
                <Button size="lg">Grand</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Champs de saisie</h3>
              <div className="space-y-2">
                <Input placeholder="Placeholder..." />
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Input disabled placeholder="Désactivé" />
              </div>
            </div>
          </SectionGrid>
        </Section>

        {/* Badges et Avatars */}
        <Section title="Badges et Avatars" variant="card" className="mb-8">
          <SectionGrid cols={2} gap="md">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Par défaut</Badge>
                <Badge variant="secondary">Secondaire</Badge>
                <Badge variant="outline">Contour</Badge>
                <Badge variant="destructive">Destructif</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Avatars</h3>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/api/placeholder/40/40" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">LG</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </SectionGrid>
        </Section>

        {/* ProfileHeader */}
        <Section title="ProfileHeader" variant="card" className="mb-8">
          <ProfileHeader
            name="Sophie Martin"
            title="Product Designer Senior"
            location="Paris, France"
            availability="Immédiate"
            dailyRate={650}
            experience={8}
            rating={4.8}
            projectsCount={25}
            clientsCount={20}
            isFavorite={favorites.talents.includes('demo-1')}
            onToggleFavorite={toggleFavorite}
            onContact={() => showToast('info')}
            onDownloadCV={() => showToast('success')}
            onShare={() => showToast('info')}
            variant="talent"
            size="md"
          />
        </Section>

        {/* Composants Section */}
        <Section title="Composants Section" variant="card" className="mb-8">
          <SectionGrid cols={1} gap="lg">
            {/* Section simple */}
            <Section title="Section simple" description="Description de la section">
              <p>Contenu de la section simple.</p>
            </Section>

            {/* Section avec variantes */}
            <Section 
              title="Section avec variantes" 
              variant="bordered"
              align="center"
              showDivider
            >
              <p>Section avec bordure gauche et alignement centré.</p>
            </Section>

            {/* Section avec grille */}
            <Section title="Section avec grille">
              <SectionGrid cols={3} gap="md">
                <Card>
                  <CardContent className="p-4">
                    <p>Élément 1</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p>Élément 2</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p>Élément 3</p>
                  </CardContent>
                </Card>
              </SectionGrid>
            </Section>

            {/* Section avec liste */}
            <Section title="Section avec liste">
              <SectionList>
                <div className="py-3">
                  <h4 className="font-medium">Élément de liste 1</h4>
                  <p className="text-sm text-muted-foreground">Description de l'élément 1</p>
                </div>
                <div className="py-3">
                  <h4 className="font-medium">Élément de liste 2</h4>
                  <p className="text-sm text-muted-foreground">Description de l'élément 2</p>
                </div>
                <div className="py-3">
                  <h4 className="font-medium">Élément de liste 3</h4>
                  <p className="text-sm text-muted-foreground">Description de l'élément 3</p>
                </div>
              </SectionList>
            </Section>
          </SectionGrid>
        </Section>

        {/* Système de toasts */}
        <Section title="Système de toasts" variant="card" className="mb-8">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Cliquez sur les boutons ci-dessous pour tester les différents types de toasts.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => showToast('success')} variant="outline">
                Toast Succès
              </Button>
              <Button onClick={() => showToast('error')} variant="outline">
                Toast Erreur
              </Button>
              <Button onClick={() => showToast('warning')} variant="outline">
                Toast Avertissement
              </Button>
              <Button onClick={() => showToast('info')} variant="outline">
                Toast Info
              </Button>
            </div>
          </div>
        </Section>

        {/* Gestion des favoris */}
        <Section title="Gestion des favoris" variant="card" className="mb-8">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              État actuel des favoris : {favorites.talents.length} talents, {favorites.missions.length} missions
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={toggleFavorite} variant="outline">
                {favorites.talents.includes('demo-1') ? (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Retirer des favoris
                  </>
                ) : (
                  <>
                    <HeartOff className="h-4 w-4 mr-2" />
                    Ajouter aux favoris
                  </>
                )}
              </Button>
              <Button 
                onClick={() => {
                  addToFavorites('missions', 'demo-mission')
                  addToast({
                    title: 'Mission ajoutée aux favoris',
                    type: 'success'
                  })
                }}
                variant="outline"
              >
                Ajouter une mission
              </Button>
            </div>
          </div>
        </Section>

        {/* Navigation */}
        <Section title="Navigation" variant="card" className="mb-8">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Liens vers les différentes pages de démonstration.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/demo-toasts">Démo des toasts</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/talents">Liste des talents</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/missions">Liste des missions</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/favoris">Favoris</Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* Note de démo */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm">
            <span>💾 Démo UI — tous les composants fonctionnels</span>
          </div>
        </div>
      </div>
    </div>
  )
}
