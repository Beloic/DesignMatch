'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TalentCard } from '@/components/TalentCard'
import { getFeaturedTalents } from '@/lib/api'
import { Talent } from '@/lib/types'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export function FeaturedTalents() {
  const [talents, setTalents] = useState<Talent[]>([])
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    const loadFeaturedTalents = async () => {
      try {
        setLoading(true)
        const featuredTalents = await getFeaturedTalents(6)
        setTalents(featuredTalents)
      } catch (error) {
        console.error('Erreur lors du chargement des talents mis en avant:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedTalents()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('home.sections.featuredTalents', language)}
            </h2>
            <p className="text-muted-foreground text-lg">
              Découvrez nos meilleurs talents UX/UI Design
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-card border rounded-2xl p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-muted rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24" />
                    <div className="h-3 bg-muted rounded w-32" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (talents.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            <span>Recommandés</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('home.sections.featuredTalents', language)}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez nos meilleurs talents UX/UI Design, sélectionnés pour leur expertise et leur expérience
          </p>
        </div>

        {/* Grille des talents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {talents.map((talent) => (
            <TalentCard key={talent.id} talent={talent} featured={talent.featured} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/talents" className="flex items-center space-x-2">
              <span>Voir tous les talents</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
