const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rscgytocxltrqtwspehs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY2d5dG9jeGx0cnF0d3NwZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjUzNDEsImV4cCI6MjA3MTQ0MTM0MX0.MkaV0vkLX9jdCxZ_5fz6jjZBhChc1W9vtVicZSt1Pt0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testRealSignup() {
  console.log('🧪 Test d\'inscription avec une vraie adresse...')
  
  // Utilisez une adresse e-mail de test valide
  const testEmail = 'test@gmail.com' // Adresse simple pour le test
  const testPassword = 'testpassword123'
  const testFullName = 'Loic Bernard Test'
  
  try {
    console.log(`📧 Tentative d'inscription avec: ${testEmail}`)
    
    // Test d'inscription basique (sans création de profil custom)
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: testFullName
        },
        emailRedirectTo: 'http://localhost:3001/auth/callback'
      }
    })
    
    if (error) {
      console.error('❌ Erreur lors de l\'inscription:', error.message)
      console.error('   Code d\'erreur:', error.status)
      console.error('   Détails:', error)
      return
    }
    
    if (data.user) {
      console.log('✅ Inscription réussie!')
      console.log('👤 Utilisateur créé:', data.user.id)
      console.log('📧 Email:', data.user.email)
      console.log('🔐 Session:', data.session ? 'Oui' : 'Non (confirmation requise)')
      console.log('✉️  Email de confirmation:', data.user.email_confirmed_at ? 'Confirmé' : 'En attente')
      
      if (!data.session) {
        console.log('\n📬 Un e-mail de confirmation a été envoyé à votre adresse.')
        console.log('   Vérifiez votre boîte mail et cliquez sur le lien de confirmation.')
      }
      
      // Tenter de créer le profil manuellement si l'utilisateur existe
      console.log('\n👤 Tentative de création du profil...')
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: testEmail,
            full_name: testFullName,
            job_title: 'Designer Test',
            skills: ['Design', 'Test'],
            experience_years: 0,
            availability: true
          })
          .select()
          .single()
        
        if (profileError) {
          console.log('⚠️  Erreur lors de la création du profil:', profileError.message)
          
          // Vérifier si le profil existe déjà
          const { data: existingProfile, error: checkError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()
          
          if (!checkError && existingProfile) {
            console.log('✅ Le profil existe déjà:')
            console.log('   - Nom:', existingProfile.full_name)
            console.log('   - Email:', existingProfile.email)
          }
        } else {
          console.log('✅ Profil créé avec succès!')
          console.log('   - ID:', profileData.id)
          console.log('   - Nom:', profileData.full_name)
        }
      } catch (profileError) {
        console.log('⚠️  Erreur de profil:', profileError.message)
      }
      
    } else {
      console.log('⚠️  Aucun utilisateur créé')
    }
    
  } catch (error) {
    console.error('❌ Erreur inattendue:', error)
  }
}

testRealSignup()
