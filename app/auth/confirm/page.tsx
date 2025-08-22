'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

export default function ConfirmEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Récupérer les paramètres depuis le fragment d'URL (#)
        const hash = window.location.hash.substring(1) // Enlever le #
        const hashParams = new URLSearchParams(hash)
        
        // Récupérer les paramètres de l'URL
        const token = searchParams.get('token') || hashParams.get('token')
        const type = searchParams.get('type') || hashParams.get('type')
        const access_token = searchParams.get('access_token') || hashParams.get('access_token')
        const refresh_token = searchParams.get('refresh_token') || hashParams.get('refresh_token')

        if (access_token && refresh_token) {
          // Si on a des tokens d'accès, c'est une confirmation réussie
          // On peut directement créer une session
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token
          })

          if (error) {
            throw error
          }

          if (data.session) {
            setStatus('success')
            setMessage('Votre email a été confirmé avec succès ! Vous pouvez maintenant vous connecter.')
          } else {
            setStatus('error')
            setMessage('Impossible de créer la session. Veuillez réessayer.')
          }
        } else if (token && type === 'signup') {
          // Ancienne méthode avec OTP (pour compatibilité)
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup'
          })

          if (error) {
            throw error
          }

          if (data.user) {
            setStatus('success')
            setMessage('Votre email a été confirmé avec succès ! Vous pouvez maintenant vous connecter.')
          } else {
            setStatus('error')
            setMessage('Impossible de vérifier l\'utilisateur. Veuillez réessayer.')
          }
        } else {
          setStatus('error')
          setMessage('Lien de confirmation invalide ou expiré.')
        }
      } catch (error: any) {
        console.error('Erreur lors de la confirmation:', error)
        setStatus('error')
        setMessage(error.message || 'Une erreur est survenue lors de la confirmation de votre email.')
      }
    }

    confirmEmail()
  }, [searchParams])

  const getStatusContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Confirmation de votre email en cours...</p>
          </div>
        )
      
      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">Email confirmé !</h2>
            <p className="text-muted-foreground mb-6">{message}</p>
            <Button asChild size="lg">
              <Link href="/auth/login">
                Se connecter
              </Link>
            </Button>
          </div>
        )
      
      case 'error':
        return (
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur de confirmation</h2>
            <p className="text-muted-foreground mb-6">{message}</p>
            <div className="space-y-3">
              <Button asChild variant="outline">
                <Link href="/auth/register">
                  Réessayer l'inscription
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth/login">
                  Se connecter
                </Link>
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Bouton retour */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Link>
          </Button>
        </div>

        {/* Card de confirmation */}
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <CardTitle className="text-2xl">Confirmation d'email</CardTitle>
            <CardDescription>
              Confirmez votre adresse email pour activer votre compte
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {getStatusContent()}
            
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
