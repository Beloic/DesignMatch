const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rscgytocxltrqtwspehs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY2d5dG9jeGx0cnF0d3NwZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjUzNDEsImV4cCI6MjA3MTQ0MTM0MX0.MkaV0vkLX9jdCxZ_5fz6jjZBhChc1W9vtVicZSt1Pt0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkAuthConfig() {
  console.log('🔍 Vérification de la configuration d\'authentification...')
  
  try {
    // Test de connexion basique
    const { data: testData, error: testError } = await supabase
      .from('categories')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Erreur de connexion:', testError)
      return
    }
    
    console.log('✅ Connexion Supabase établie')
    
    // Test de récupération des informations de session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.log('⚠️  Erreur de session:', sessionError.message)
    } else {
      console.log('✅ Gestion des sessions OK')
      console.log('   - Session actuelle:', session ? 'Oui' : 'Non')
    }
    
    // Test de récupération de l'utilisateur actuel
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.log('⚠️  Erreur utilisateur:', userError.message)
    } else {
      console.log('✅ Gestion des utilisateurs OK')
      console.log('   - Utilisateur actuel:', user ? 'Oui' : 'Non')
    }
    
    // Test de la configuration des e-mails
    console.log('\n📧 Test de la configuration des e-mails...')
    
    // Vérifier si les templates d'e-mail existent
    try {
      const { data: emailTemplates, error: emailError } = await supabase
        .from('auth.email_templates')
        .select('*')
        .limit(5)
      
      if (emailError) {
        console.log('⚠️  Templates d\'e-mail non accessibles:', emailError.message)
      } else {
        console.log('✅ Templates d\'e-mail accessibles')
        console.log('   - Nombre de templates:', emailTemplates?.length || 0)
      }
    } catch (error) {
      console.log('⚠️  Impossible d\'accéder aux templates d\'e-mail:', error.message)
    }
    
    // Test de la configuration générale
    try {
      const { data: config, error: configError } = await supabase
        .from('auth.config')
        .select('*')
        .limit(5)
      
      if (configError) {
        console.log('⚠️  Configuration non accessible:', configError.message)
      } else {
        console.log('✅ Configuration accessible')
        console.log('   - Nombre de configs:', config?.length || 0)
      }
    } catch (error) {
      console.log('⚠️  Impossible d\'accéder à la configuration:', error.message)
    }
    
    console.log('\n🎯 Résumé:')
    console.log('- Connexion Supabase: ✅')
    console.log('- Gestion des sessions: ' + (sessionError ? '❌' : '✅'))
    console.log('- Gestion des utilisateurs: ' + (userError ? '❌' : '✅'))
    console.log('- Templates d\'e-mail: ' + (emailTemplates ? '✅' : '⚠️'))
    console.log('- Configuration générale: ' + (config ? '✅' : '⚠️'))
    
    if (sessionError || userError) {
      console.log('\n⚠️  Problèmes détectés dans l\'authentification.')
      console.log('   Vérifiez que les scripts SQL ont été exécutés.')
    }
    
  } catch (error) {
    console.error('❌ Erreur inattendue:', error)
  }
}

checkAuthConfig()

