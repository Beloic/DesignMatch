'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MissionCard } from '@/components/MissionCard'
import { getRecentMissions } from '@/lib/api'
import { Mission } from '@/lib/types'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export function RecentMissions() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    const loadRecentMissions = async () => {
      try {
        setLoading(true)
        const recentMissions = await getRecentMissions(6)
        setMissions(recentMissions)
      } catch (error) {
        console.error('Erreur lors du chargement des missions récentes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRecentMissions()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('home.sections.recentMissions', language)}
            </h2>
            <p className="text-muted-foreground text-lg">
              Découvrez les dernières missions publiées
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-32" />
                      <div className="h-3 bg-muted rounded w-24" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (missions.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Clock className="h-4 w-4" />
            <span>Nouvelles opportunités</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('home.sections.recentMissions', language)}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les dernières missions publiées par nos entreprises partenaires
          </p>
        </div>

        {/* Grille des missions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/missions" className="flex items-center space-x-2">
              <span>Voir toutes les missions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
