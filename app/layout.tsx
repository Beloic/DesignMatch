import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/hooks/useTheme'
import { LanguageProvider } from '@/hooks/useLanguage'
import { AuthProvider } from '@/hooks/useAuth'
import { ToastProvider } from '@/components/ToastArea'
import { AppNavbar } from '@/components/AppNavbar'
import { AppFooter } from '@/components/AppFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DesignMatch - Plateforme de mise en relation Recruteurs ↔ Talents UX/UI',
  description: 'Connectez recruteurs et talents UX/UI Design en France et en Europe. Trouvez votre prochain designer ou votre prochaine mission.',
  keywords: 'UX Design, UI Design, Product Design, Recrutement, Freelance, CDI, Design System, Figma, Sketch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <ToastProvider>
                <div className="min-h-screen bg-background text-foreground">
                  <AppNavbar />
                  <main className="flex-1">
                    {children}
                  </main>
                  <AppFooter />
                </div>
              </ToastProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
