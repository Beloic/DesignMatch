'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '@/lib/supabase'

// Types compatibles avec le nouveau schéma
interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  phone?: string
  bio?: string
  location?: string
  website?: string
  company?: string
  job_title?: string
  skills?: string[]
  experience_years?: number
  hourly_rate?: number
  availability?: boolean
  created_at: string
  updated_at: string
}

interface TalentProfile {
  id: string
  user_id: string
  title: string
  bio: string
  skills: string[]
  experience_years: number
  hourly_rate: number
  portfolio_url?: string
  linkedin_url?: string
  github_url?: string
  location: string
  availability: 'available' | 'partially_available' | 'unavailable'
  created_at: string
  updated_at: string
}

interface CompanyProfile {
  id: string
  user_id: string
  company_name: string
  industry: string
  company_size: string
  description: string
  website_url?: string
  linkedin_url?: string
  logo_url?: string
  location: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  talentProfile: TalentProfile | null
  companyProfile: CompanyProfile | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, userType: 'talent' | 'recruiter') => Promise<{ success: boolean; error?: string; message?: string }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [talentProfile, setTalentProfile] = useState<TalentProfile | null>(null)
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier la session actuelle
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      }
      setLoading(false)
    }

    getSession()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setUser(null)
          setTalentProfile(null)
          setCompanyProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      // Récupérer le profil utilisateur depuis la nouvelle table profiles
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (userError) {
        // Si le profil n'existe pas, le créer
        if (userError.code === 'PGRST116') {
          console.log('Profil non trouvé, création automatique...')
          await createDefaultProfile(userId)
          return
        }
        throw userError
      }

      setUser(userData)

      // Pour l'instant, on ne gère que le profil principal
      // Les profils spécialisés (talent/entreprise) seront gérés plus tard
      setTalentProfile(null)
      setCompanyProfile(null)
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error)
    }
  }

  const createDefaultProfile = async (userId: string) => {
    try {
      // Récupérer les infos utilisateur de Supabase Auth
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || 'Utilisateur',
          job_title: 'Designer',
          skills: ['Design'],
          experience_years: 0,
          availability: true
        })
        .select()
        .single()

      if (profileError) throw profileError

      setUser(profileData)
      console.log('Profil par défaut créé avec succès')
    } catch (error) {
      console.error('Erreur lors de la création du profil par défaut:', error)
    }
  }

  const signUp = async (email: string, password: string, fullName: string, userType: 'talent' | 'recruiter') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`
        }
      })

      if (error) throw error

      if (data.user) {
        // Note: Le profil sera créé après la confirmation d'email
        // pour éviter les erreurs RLS avec un utilisateur non authentifié
        console.log('Utilisateur créé, profil sera créé après confirmation d\'email')

        // Vérifier si l'email a été envoyé
        if (data.session === null && data.user.identities && data.user.identities.length === 0) {
          return { 
            success: true, 
            message: 'Vérifiez votre email pour confirmer votre compte avant de vous connecter.' 
          }
        }
      }

      return { success: true, error: null }
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error)
      return { 
        success: false, 
        error: error.message || 'Une erreur est survenue lors de l\'inscription' 
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { error: new Error('Utilisateur non connecté') }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id)

      if (error) throw error

      // Mettre à jour l'état local
      setUser(prev => prev ? { ...prev, ...data } : null)

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const value = {
    user,
    talentProfile,
    companyProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  }

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}
