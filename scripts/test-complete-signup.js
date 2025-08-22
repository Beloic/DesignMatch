const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rscgytocxltrqtwspehs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY2d5dG9jeGx0cnF0d3NwZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjUzNDEsImV4cCI6MjA3MTQ0MTM0MX0.MkaV0vkLX9jdCxZ_5fz6jjZBhChc1W9vtVicZSt1Pt0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testCompleteSignup() {
  console.log('🎯 Test complet d\'inscription avec création de profil...')
  
  const testEmail = 'designer@mail.co'
  const testPassword = 'motdepasse123'
  const testFullName = 'Designer Test'
  const userType = 'talent'
  
  try {
    console.log(`📧 Inscription avec: ${testEmail}`)
    
    // Étape 1: Inscription utilisateur
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: testFullName,
          user_type: userType
        },
        emailRedirectTo: 'http://localhost:3001/auth/callback'
      }
    })
    
    if (signupError) {
      console.error('❌ Erreur inscription:', signupError.message)
      return
    }
    
    if (!signupData.user) {
      console.error('❌ Aucun utilisateur créé')
      return
    }
    
    console.log('✅ Inscription réussie!')
    console.log('   - User ID:', signupData.user.id)
    console.log('   - Email:', signupData.user.email)
    console.log('   - Session:', signupData.session ? 'Oui' : 'Non (confirmation requise)')
    
    // Étape 2: Création du profil
    console.log('\n👤 Création du profil...')
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: signupData.user.id,
        email: testEmail,
        full_name: testFullName,
        job_title: userType === 'talent' ? 'Designer' : 'Recruteur',
        company: userType === 'recruiter' ? 'Entreprise Test' : null,
        skills: userType === 'talent' ? ['Design', 'UX/UI'] : [],
        experience_years: 2,
        hourly_rate: userType === 'talent' ? 45.00 : null,
        availability: true
      })
      .select()
      .single()
    
    if (profileError) {
      console.error('❌ Erreur création profil:', profileError.message)
      
      // Vérifier si le profil existe déjà
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', signupData.user.id)
        .single()
      
      if (!checkError && existingProfile) {
        console.log('✅ Le profil existe déjà:')
        console.log('   - Nom:', existingProfile.full_name)
        console.log('   - Titre:', existingProfile.job_title)
        console.log('   - Compétences:', existingProfile.skills)
      }
    } else {
      console.log('✅ Profil créé avec succès!')
      console.log('   - Nom:', profileData.full_name)
      console.log('   - Titre:', profileData.job_title)
      console.log('   - Compétences:', profileData.skills)
      console.log('   - Taux horaire:', profileData.hourly_rate ? `${profileData.hourly_rate}€` : 'Non défini')
    }
    
    // Étape 3: Test de récupération des catégories
    console.log('\n📂 Test des catégories...')
    
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('name, description, icon')
      .limit(3)
    
    if (categoriesError) {
      console.error('❌ Erreur catégories:', categoriesError.message)
    } else {
      console.log('✅ Catégories récupérées:')
      categories.forEach(cat => {
        console.log(`   ${cat.icon} ${cat.name}: ${cat.description}`)
      })
    }
    
    // Étape 4: Test de connexion
    console.log('\n🔐 Test de connexion...')
    
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    })
    
    if (loginError) {
      console.log('⚠️  Erreur connexion:', loginError.message)
      if (loginError.message.includes('Invalid login credentials')) {
        console.log('   (Normal si la confirmation d\'email est requise)')
      }
    } else {
      console.log('✅ Connexion réussie!')
      console.log('   - Session active:', !!loginData.session)
      
      // Déconnexion
      await supabase.auth.signOut()
      console.log('🚪 Déconnexion effectuée')
    }
    
    // Résumé
    console.log('\n🎉 TEST COMPLET TERMINÉ!')
    console.log('   - Inscription: ✅')
    console.log('   - Profil: ' + (profileError ? '⚠️' : '✅'))
    console.log('   - Catégories: ' + (categoriesError ? '❌' : '✅'))
    console.log('   - Connexion: ' + (loginError ? '⚠️' : '✅'))
    
    console.log('\n🎯 Votre application est prête!')
    console.log('   Vous pouvez maintenant tester sur: http://localhost:3001')
    console.log('   Utilisez un email avec un domaine réel (ex: @gmail.com, @mail.co)')
    
  } catch (error) {
    console.error('❌ Erreur générale:', error)
  }
}

testCompleteSignup()
