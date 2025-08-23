'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { t } from '@/lib/i18n'
import { useLanguage } from '@/hooks/useLanguage'
import { useAuth } from '@/hooks/useAuth'

export function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const { user, signOut } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-foreground">DesignMatch</span>
          </Link>

          {/* Navigation principale - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/talents" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Talents
            </Link>
            <Link href="/missions" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Missions
            </Link>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                {/* Bouton S'inscrire */}
                <Button variant="outline" asChild>
                  <Link href="/auth/register">
                    S'inscrire
                  </Link>
                </Button>
                
                {/* Bouton Se connecter */}
                <Button asChild>
                  <Link href="/auth/login">
                    Se connecter
                  </Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Menu utilisateur */}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard" aria-label="Dashboard">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url} alt={user.full_name} />
                        <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link>
                  </Button>
                  
                  <Button variant="ghost" size="icon" onClick={signOut} aria-label="Se déconnecter">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>



        {/* Menu mobile déroulant */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/talents">{t('nav.talents', language)}</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/missions">{t('nav.missions', language)}</Link>
              </Button>
              
              {/* Séparateur */}
              <div className="border-t my-4"></div>
              
              {!user ? (
                <>
                  {/* Boutons d'authentification */}
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/auth/register">S'inscrire</Link>
                  </Button>
                  <Button asChild className="justify-start">
                    <Link href="/auth/login">Se connecter</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/dashboard">Mon dashboard</Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start" onClick={signOut}>
                    Se déconnecter
                  </Button>
                </>
              )}
            </div>
            

          </div>
        )}
      </div>
    </nav>
  )
}
