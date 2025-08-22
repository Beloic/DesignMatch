const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rscgytocxltrqtwspehs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY2d5dG9jeGx0cnF0d3NwZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjUzNDEsImV4cCI6MjA3MTQ0MTM0MX0.MkaV0vkLX9jdCxZ_5fz6jjZBhChc1W9vtVicZSt1Pt0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSimpleEmail() {
  console.log('📧 Test avec différents formats d\'email...')
  
  const emailsToTest = [
    'test@test.com',
    'user@example.com',
    'hello@world.com',
    'simple@mail.co'
  ]
  
  for (const email of emailsToTest) {
    console.log(`\n🧪 Test avec: ${email}`)
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: 'password123',
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      })
      
      if (error) {
        console.log(`❌ ${error.message}`)
      } else {
        console.log(`✅ Succès! User ID: ${data.user?.id}`)
        
        // Nettoyer immédiatement
        if (data.user) {
          console.log('🧹 Nettoyage...')
          // Note: Impossible avec clé anon, mais on note le succès
        }
        break // Sortir dès qu'un email fonctionne
      }
    } catch (e) {
      console.log(`❌ Erreur: ${e.message}`)
    }
  }
  
  console.log('\n💡 Si aucun email ne fonctionne:')
  console.log('   1. Vérifiez les paramètres Auth dans Supabase')
  console.log('   2. Activez "Enable email signups"')
  console.log('   3. Désactivez temporairement "Enable email confirmations" pour les tests')
  console.log('   4. Ajoutez les URLs de redirection correctes')
}

testSimpleEmail()
