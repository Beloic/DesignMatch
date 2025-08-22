const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabaseUrl = 'https://rscgytocxltrqtwspehs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY2d5dG9jeGx0cnF0d3NwZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjUzNDEsImV4cCI6MjA3MTQ0MTM0MX0.MkaV0vkLX9jdCxZ_5fz6jjZBhChc1W9vtVicZSt1Pt0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function applySchema() {
  console.log('🔧 Application du schéma de base de données...')
  
  try {
    // Test de connexion
    const { data: testData, error: testError } = await supabase
      .from('categories')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Erreur de connexion:', testError)
      return
    }
    
    console.log('✅ Connexion Supabase établie')
    
    // Vérification des tables existantes
    console.log('\n📊 Vérification des tables existantes...')
    
    // Test de la table profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (profilesError) {
      console.log('⚠️  Table profiles non accessible:', profilesError.message)
    } else {
      console.log('✅ Table profiles accessible')
    }
    
    // Test de la table missions
    const { data: missionsData, error: missionsError } = await supabase
      .from('missions')
      .select('count')
      .limit(1)
    
    if (missionsError) {
      console.log('⚠️  Table missions non accessible:', missionsError.message)
    } else {
      console.log('✅ Table missions accessible')
    }
    
    // Test de la table applications
    const { data: applicationsData, error: applicationsError } = await supabase
      .from('applications')
      .select('count')
      .limit(1)
    
    if (applicationsError) {
      console.log('⚠️  Table applications non accessible:', applicationsError.message)
    } else {
      console.log('✅ Table applications accessible')
    }
    
    console.log('\n🎯 Résumé:')
    console.log('- Connexion Supabase: ✅')
    console.log('- Table categories: ✅ (déjà créée)')
    console.log('- Table profiles: ' + (profilesError ? '❌' : '✅'))
    console.log('- Table missions: ' + (missionsError ? '❌' : '✅'))
    console.log('- Table applications: ' + (applicationsError ? '❌' : '✅'))
    
    if (profilesError || missionsError || applicationsError) {
      console.log('\n⚠️  Certaines tables ne sont pas encore créées.')
      console.log('   Exécutez le script SQL dans l\'interface Supabase SQL Editor.')
      console.log('   Commencez par: database/schema.sql')
    } else {
      console.log('\n🎉 Toutes les tables sont accessibles!')
    }
    
  } catch (error) {
    console.error('❌ Erreur inattendue:', error)
  }
}

applySchema()
