import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rscgytocxltrqtwspehs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY2d5dG9jeGx0cnF0d3NwZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjUzNDEsImV4cCI6MjA3MTQ0MTM0MX0.MkaV0vkLX9jdCxZ_5fz6jjZBhChc1W9vtVicZSt1Pt0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour les tables
export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  user_type: 'talent' | 'recruiter'
  email_confirmed: boolean
  created_at: string
  updated_at: string
}

export interface TalentProfile {
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

export interface CompanyProfile {
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

export interface Mission {
  id: string
  recruiter_id: string
  title: string
  description: string
  requirements: string[]
  skills_needed: string[]
  budget_min: number
  budget_max: number
  duration: string
  location: string
  remote_work: boolean
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  mission_id: string
  talent_id: string
  cover_letter: string
  proposed_rate: number
  estimated_duration: string
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
  created_at: string
  updated_at: string
}
