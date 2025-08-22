const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rscgytocxltrqtwspehs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY2d5dG9jeGx0cnF0d3NwZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjUzNDEsImV4cCI6MjA3MTQ0MTM0MX0.MkaV0vkLX9jdCxZ_5fz6jjZBhChc1W9vtVicZSt1Pt0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSignup() {
  console.log('🧪 Test d\'inscription d\'un utilisateur...')
  
  const testEmail = 'testuser@example.com'
  const testPassword = 'testpassword123'
  const testFullName = 'Utilisateur Test'
  
  try {
    console.log(`📧 Tentative d'inscription avec: ${testEmail}`)
    
    // Test d'inscription
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: testFullName
        }
      }
    })
    
    if (error) {
      console.error('❌ Erreur lors de l\'inscription:', error)
      return
    }
    
    if (data.user) {
      console.log('✅ Inscription réussie!')
      console.log('👤 Utilisateur créé:', data.user.id)
      console.log('📧 Email:', data.user.email)
      console.log('🔐 Session:', data.session ? 'Oui' : 'Non')
      
      // Vérifier si le profil a été créé
      if (data.user.id) {
        console.log('\n🔍 Vérification du profil créé...')
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()
        
        if (profileError) {
          console.log('⚠️  Profil non trouvé:', profileError.message)
        } else {
          console.log('✅ Profil créé avec succès:')
          console.log('   - Nom:', profileData.full_name)
          console.log('   - Email:', profileData.email)
          console.log('   - Créé le:', profileData.created_at)
        }
      }
      
      // Nettoyer le compte de test
      console.log('\n🧹 Nettoyage du compte de test...')
      const { error: deleteError } = await supabase.auth.admin.deleteUser(data.user.id)
      
      if (deleteError) {
        console.log('⚠️  Impossible de supprimer le compte de test:', deleteError.message)
      } else {
        console.log('✅ Compte de test supprimé')
      }
      
    } else {
      console.log('⚠️  Aucun utilisateur créé')
    }
    
  } catch (error) {
    console.error('❌ Erreur inattendue:', error)
  }
}

testSignup()
