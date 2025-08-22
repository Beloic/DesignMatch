import { ArrowRight, Star, Users, Briefcase, Building, CheckCircle, Play } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="h-4 w-4" />
              <span>Plateforme de mise en relation UX/UI Design</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-tight">
              Trouvez votre
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Design Match
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Connectez recruteurs et talents UX/UI Design en France et en Europe. 
              Trouvez votre prochain designer ou votre prochaine mission en quelques clics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90">
                <Link href="/publier" className="flex items-center space-x-2">
                  <span>Publier une mission</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg">
                <Link href="/talents" className="flex items-center space-x-2">
                  <span>Découvrir les talents</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Talents UX/UI vérifiés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <div className="text-muted-foreground">Missions publiées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Entreprises partenaires</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              DesignMatch simplifie le recrutement de talents UX/UI Design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-background rounded-2xl border shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Publiez votre offre</h3>
              <p className="text-muted-foreground">
                Décrivez le poste, les compétences requises et votre entreprise
              </p>
            </div>

            <div className="text-center p-8 bg-background rounded-2xl border shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Recevez des candidatures</h3>
              <p className="text-muted-foreground">
                Les candidats qualifiés postulent directement à votre offre
              </p>
            </div>

            <div className="text-center p-8 bg-background rounded-2xl border shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Recrutez le bon profil</h3>
              <p className="text-muted-foreground">
                Sélectionnez le candidat idéal et intégrez-le à votre équipe
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nos solutions de recrutement
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des solutions adaptées à tous vos besoins en recrutement UX/UI Design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-card rounded-2xl border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Recrutement CDI</h3>
              <p className="text-muted-foreground mb-6">
                Trouvez le designer permanent qui s'intègre parfaitement à votre équipe
              </p>
              <Badge variant="secondary">CDI</Badge>
            </div>

            <div className="p-8 bg-card rounded-2xl border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Freelance & Missions</h3>
              <p className="text-muted-foreground mb-6">
                Des profils expérimentés pour vos projets ponctuels ou à long terme
              </p>
              <Badge variant="secondary">Freelance</Badge>
            </div>

            <div className="p-8 bg-card rounded-2xl border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Recrutement Spécialisé</h3>
              <p className="text-muted-foreground mb-6">
                Des experts en recrutement UX/UI pour vous accompagner dans vos embauches
              </p>
              <Badge variant="secondary">Expertise</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez les retours d'expérience de nos utilisateurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 bg-background rounded-2xl border">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "DesignMatch m'a permis de trouver le designer parfait pour notre refonte UX. 
                Le processus était simple et efficace."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">M</span>
                </div>
                <div>
                  <div className="font-semibold">Marie Dubois</div>
                  <div className="text-sm text-muted-foreground">Product Manager, TechCorp</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-background rounded-2xl border">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "En tant que freelance, j'ai trouvé des missions passionnantes et des clients 
                de qualité grâce à DesignMatch."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">T</span>
                </div>
                <div>
                  <div className="font-semibold">Thomas Martin</div>
                  <div className="text-sm text-muted-foreground">UX Designer Freelance</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-background rounded-2xl border">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "L'équipe DesignMatch est très professionnelle. Ils ont compris nos besoins 
                et nous ont mis en relation avec des talents exceptionnels."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">S</span>
                </div>
                <div>
                  <div className="font-semibold">Sophie Bernard</div>
                  <div className="text-sm text-muted-foreground">CEO, StartupLab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
                      <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à recruter votre talent UX/UI ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Rejoignez des centaines d'entreprises qui ont déjà trouvé leur designer idéal
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg">
                              <Link href="/publier" className="flex items-center space-x-2">
                  <span>Publier une offre</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/talents" className="flex items-center space-x-2">
                <span>Voir les talents</span>
                <Play className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pourquoi choisir DesignMatch ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Profils vérifiés</h3>
                <p className="text-muted-foreground">Tous nos talents sont préalablement validés et testés</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Mise en relation rapide</h3>
                <p className="text-muted-foreground">Recevez des propositions sous 24-48h</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Support personnalisé</h3>
                <p className="text-muted-foreground">Une équipe dédiée pour vous accompagner</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Sécurité garantie</h3>
                <p className="text-muted-foreground">Paiements sécurisés et contrats protégés</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
