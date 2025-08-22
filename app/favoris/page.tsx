'use client'

import { useState, useEffect } from 'react'
import { Heart, Trash2, User, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TalentCard } from '@/components/TalentCard'
import { MissionCard } from '@/components/MissionCard'
import { useFavorites } from '@/hooks/useFavorites'
import { getTalentById, getMissionById } from '@/lib/api'
import { Talent, Mission } from '@/lib/types'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export default function FavorisPage() {
  const { favorites, clearAllFavorites, removeTalentFromFavorites, removeMissionFromFavorites } = useFavorites()
  const [favoriteTalents, setFavoriteTalents] = useState<Talent[]>([])
  const [favoriteMissions, setFavoriteMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  // Charger les détails des favoris
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true)
        
        // Charger les talents favoris
        const talentsPromises = favorites.talents.map(id => getTalentById(id))
        const talents = await Promise.all(talentsPromises)
        setFavoriteTalents(talents.filter(Boolean) as Talent[])
        
        // Charger les missions favorites
        const missionsPromises = favorites.missions.map(id => getMissionById(id))
        const missions = await Promise.all(missionsPromises)
        setFavoriteMissions(missions.filter(Boolean) as Mission[])
        
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [favorites])

  const totalFavorites = favorites.talents.length + favorites.missions.length

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement de vos favoris...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold text-foreground">Mes Favoris</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {totalFavorites > 0 
              ? `${totalFavorites} élément${totalFavorites > 1 ? 's' : ''} dans vos favoris`
              : 'Aucun favori pour le moment'
            }
          </p>
        </div>

        {totalFavorites === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Aucun favori
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Commencez à explorer nos talents et missions pour ajouter vos premiers favoris.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/talents">Découvrir les talents</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/missions">Voir les missions</a>
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Actions */}
            <div className="flex justify-end mb-6">
              <Button
                variant="outline"
                onClick={clearAllFavorites}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Vider tous les favoris
              </Button>
            </div>

            {/* Talents favoris */}
            {favoriteTalents.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center space-x-2 mb-6">
                  <User className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    Talents favoris ({favoriteTalents.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteTalents.map((talent) => (
                    <div key={talent.id} className="relative">
                      <TalentCard talent={talent} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTalentFromFavorites(talent.id)}
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                        aria-label="Retirer des favoris"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missions favorites */}
            {favoriteMissions.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    Missions favorites ({favoriteMissions.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteMissions.map((mission) => (
                    <div key={mission.id} className="relative">
                      <MissionCard mission={mission} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMissionFromFavorites(mission.id)}
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                        aria-label="Retirer des favoris"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
