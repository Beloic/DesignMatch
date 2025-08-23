'use client'

import Link from 'next/link'
import { Heart, Mail, Twitter, Linkedin, Github } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export function AppFooter() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-foreground">DesignMatch</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              La meilleure façon de connecter recruteurs et talents UX/UI Design en France et en Europe. 
              Trouvez votre prochain designer ou votre prochaine mission.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:contact@designmatch.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/designmatch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/designmatch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/designmatch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/talents" className="text-muted-foreground hover:text-primary transition-colors">
                  Découvrir les talents
                </Link>
              </li>
              <li>
                <Link href="/missions" className="text-muted-foreground hover:text-primary transition-colors">
                  Voir les missions
                </Link>
              </li>
              <li>
                <Link href="/publier" className="text-muted-foreground hover:text-primary transition-colors">
                  Publier une mission
                </Link>
              </li>
              <li>
                <Link href="/dashboard/talent" className="text-muted-foreground hover:text-primary transition-colors">
                  Créer mon profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/aide" className="text-muted-foreground hover:text-primary transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} DesignMatch. Tous droits réservés.
            </p>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              Fait avec <Heart className="inline h-4 w-4 text-red-500" /> en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
