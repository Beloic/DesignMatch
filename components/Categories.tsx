'use client'

import Link from 'next/link'
import { Palette, Users, Layers, Eye, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

const categories = [
  {
    id: 'ux-research',
    name: 'UX Research',
    description: 'Recherche utilisateur, tests, interviews, personas',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    count: '120+ talents'
  },
  {
    id: 'ui-design',
    name: 'UI Design',
    description: 'Interfaces utilisateur, composants, design systems',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    count: '200+ talents'
  },
  {
    id: 'product-design',
    name: 'Product Design',
    description: 'Conception de produits, stratégie, vision',
    icon: Target,
    color: 'from-green-500 to-emerald-500',
    count: '150+ talents'
  },
  {
    id: 'design-system',
    name: 'Design System',
    description: 'Systèmes de composants, documentation, gouvernance',
    icon: Layers,
    color: 'from-orange-500 to-red-500',
    count: '80+ talents'
  },
  {
    id: 'accessibility',
    name: 'Accessibilité',
    description: 'WCAG, design inclusif, technologies d\'assistance',
    icon: Eye,
    color: 'from-indigo-500 to-blue-500',
    count: '60+ talents'
  },
  {
    id: 'motion-design',
    name: 'Motion Design',
    description: 'Animation, transitions, micro-interactions',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    count: '90+ talents'
  }
]

export function Categories() {
  const { language } = useLanguage()

  return (
    <section className="py-16">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('home.sections.categories', language)}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explorez les différentes spécialités du design UX/UI et trouvez l'expertise qui correspond à vos besoins
          </p>
        </div>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-card border rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              {/* Icône avec gradient */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <category.icon className="h-8 w-8 text-white" />
              </div>

              {/* Contenu */}
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {category.description}
              </p>

              {/* Nombre de talents */}
              <div className="text-sm text-primary font-medium mb-4">
                {category.count}
              </div>

              {/* CTA */}
              <Button
                asChild
                variant="outline"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <Link href={`/talents?category=${category.id}`}>
                  Explorer cette catégorie
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* CTA global */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/talents" className="flex items-center space-x-2">
              <span>Découvrir tous nos talents</span>
              <Palette className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
