const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rscgytocxltrqtwspehs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY2d5dG9jeGx0cnF0d3NwZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjUzNDEsImV4cCI6MjA3MTQ0MTM0MX0.MkaV0vkLX9jdCxZ_5fz6jjZBhChc1W9vtVicZSt1Pt0'

// Note: Pour exécuter du SQL directement, il faut utiliser la clé de service, pas la clé anon
// Mais on peut tester l'état actuel avec la clé anon

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function setupDatabase() {
  console.log('🔧 Configuration de la base de données DesignMatch...')
  
  try {
    // Vérification de l'état actuel
    console.log('\n📊 Vérification de l\'état actuel...')
    
    // Test des tables existantes
    const tables = ['profiles', 'categories', 'missions', 'applications', 'favorites', 'messages', 'notifications', 'reviews']
    const tableStatus = {}
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('count')
          .limit(1)
        
        if (error) {
          tableStatus[table] = '❌ Non accessible'
        } else {
          tableStatus[table] = '✅ Accessible'
        }
      } catch (e) {
        tableStatus[table] = '❌ Erreur'
      }
    }
    
    console.log('\n📋 État des tables:')
    Object.entries(tableStatus).forEach(([table, status]) => {
      console.log(`   - ${table}: ${status}`)
    })
    
    // Test d'inscription
    console.log('\n🧪 Test d\'inscription...')
    
    const testEmail = 'testuser@designmatch.fr'
    const testPassword = 'motdepasse123'
    
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Utilisateur Test'
        }
      }
    })
    
    if (signupError) {
      console.log('❌ Erreur inscription:', signupError.message)
      console.log('   Code:', signupError.status)
      
      // Diagnostics supplémentaires
      if (signupError.message.includes('invalid')) {
        console.log('\n🔍 Diagnostic:')
        console.log('   - Le problème semble être la validation d\'email')
        console.log('   - Vérifiez la configuration Auth dans Supabase')
        console.log('   - Allez dans Authentication > Settings')
        console.log('   - Vérifiez que les inscriptions sont activées')
      }
    } else {
      console.log('✅ Inscription réussie!')
      console.log('   - User ID:', signupData.user?.id)
      console.log('   - Email:', signupData.user?.email)
      console.log('   - Confirmation requise:', !signupData.session)
      
      // Test de création de profil
      if (signupData.user && tableStatus.profiles === '✅ Accessible') {
        console.log('\n👤 Test de création de profil...')
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: signupData.user.id,
            email: testEmail,
            full_name: 'Utilisateur Test',
            job_title: 'Designer Test',
            skills: ['Design', 'Test'],
            experience_years: 0,
            availability: true
          })
          .select()
          .single()
        
        if (profileError) {
          console.log('❌ Erreur création profil:', profileError.message)
        } else {
          console.log('✅ Profil créé avec succès!')
        }
      }
      
      // Nettoyage
      if (signupData.user) {
        console.log('🧹 Nettoyage du test...')
        // Note: La suppression via admin n'est pas possible avec la clé anon
        console.log('   (Nettoyage manuel requis)')
      }
    }
    
    // Résumé et recommandations
    console.log('\n📋 RÉSUMÉ:')
    const tablesOk = Object.values(tableStatus).filter(s => s.includes('✅')).length
    console.log(`   - Tables accessibles: ${tablesOk}/${tables.length}`)
    console.log(`   - Inscription: ${signupError ? '❌' : '✅'}`)
    
    if (signupError || tablesOk < tables.length) {
      console.log('\n🔧 ACTIONS REQUISES:')
      
      if (tablesOk < tables.length) {
        console.log('   1. Exécuter les scripts SQL dans Supabase SQL Editor:')
        console.log('      - database/clean-tables-only.sql')
        console.log('      - database/install-step-by-step.sql')
      }
      
      if (signupError) {
        console.log('   2. Configurer l\'authentification dans Supabase:')
        console.log('      - Aller dans Authentication > Settings')
        console.log('      - Activer "Enable email signups"')
        console.log('      - Vérifier les domaines autorisés')
        console.log('      - Configurer les URLs de redirection')
      }
    } else {
      console.log('\n🎉 TOUT FONCTIONNE!')
      console.log('   La base de données est prête à l\'utilisation.')
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error)
  }
}

setupDatabase()
