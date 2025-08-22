'use client'

import { ToastDemo } from '@/components/ToastArea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ToastDemoPage() {
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
            Démonstration des Toasts
          </h1>
          <p className="text-xl text-muted-foreground">
            Testez le système de notifications de l'application
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Démo des toasts */}
          <Card>
            <CardHeader>
              <CardTitle>Test des toasts</CardTitle>
              <CardDescription>
                Cliquez sur les boutons ci-dessous pour tester différents types de toasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ToastDemo />
            </CardContent>
          </Card>

          {/* Informations sur le système */}
          <Card>
            <CardHeader>
              <CardTitle>À propos du système de toasts</CardTitle>
              <CardDescription>
                Caractéristiques et utilisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Types de toasts disponibles :</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Success - Pour les actions réussies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Error - Pour les erreurs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Warning - Pour les avertissements</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Info - Pour les informations</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Fonctionnalités :</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Auto-désactivation après 5 secondes</li>
                  <li>• Animations d'entrée et de sortie</li>
                  <li>• Support des actions cliquables</li>
                  <li>• Positionnement en haut à droite</li>
                  <li>• Responsive et accessible</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Utilisation dans le code :</h4>
                <div className="bg-muted p-3 rounded text-xs font-mono">
                  {`const { addToast } = useToast();

addToast({
  title: 'Succès !',
  description: 'Action effectuée',
  type: 'success'
});`}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note de démo */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm">
            <span>💾 Démo UI — système de toasts fonctionnel</span>
          </div>
        </div>
      </div>
    </div>
  )
}
