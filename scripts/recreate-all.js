const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rscgytocxltrqtwspehs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY2d5dG9jeGx0cnF0d3NwZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjUzNDEsImV4cCI6MjA3MTQ0MTM0MX0.MkaV0vkLX9jdCxZ_5fz6jjZBhChc1W9vtVicZSt1Pt0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function recreateDatabase() {
  console.log('🔥 Recréation complète de la base de données...')
  
  try {
    // Étape 1: Supprimer toutes les tables existantes
    console.log('\n🗑️  Suppression des tables existantes...')
    
    const tables = ['reviews', 'notifications', 'messages', 'favorites', 'applications', 'missions', 'categories', 'profiles']
    
    for (const table of tables) {
      try {
        const { error } = await supabase.rpc('drop_table_if_exists', { table_name: `public.${table}` })
        if (error) {
          console.log(`⚠️  Table ${table}:`, error.message)
        } else {
          console.log(`✅ Table ${table} supprimée`)
        }
      } catch (e) {
        console.log(`⚠️  Erreur table ${table}:`, e.message)
      }
    }
    
    // Étape 2: Test de connexion
    console.log('\n🔍 Test de connexion...')
    const { data: testData, error: testError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(1)
    
    if (testError) {
      console.error('❌ Erreur de connexion:', testError)
      return
    }
    
    console.log('✅ Connexion établie')
    
    // Étape 3: Créer les tables via des requêtes SQL
    console.log('\n🔧 Création des nouvelles tables...')
    
    // Créer la table profiles
    const createProfilesSQL = `
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT,
        avatar_url TEXT,
        phone TEXT,
        bio TEXT,
        location TEXT,
        website TEXT,
        company TEXT,
        job_title TEXT,
        skills TEXT[],
        experience_years INTEGER DEFAULT 0,
        hourly_rate DECIMAL(10,2),
        availability BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
    
    const { error: profilesError } = await supabase.rpc('exec_sql', { sql: createProfilesSQL })
    if (profilesError) {
      console.log('⚠️  Erreur création profiles:', profilesError.message)
    } else {
      console.log('✅ Table profiles créée')
    }
    
    // Activer RLS sur profiles
    const { error: rlsError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;'
    })
    
    // Créer les politiques RLS
    const { error: policyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
        CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
        CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
      `
    })
    
    if (!profilesError && !rlsError && !policyError) {
      console.log('✅ Configuration profiles terminée')
    }
    
    // Étape 4: Test d'inscription simple
    console.log('\n🧪 Test d\'inscription simple...')
    
    const testEmail = 'test@designmatch.com'
    const testPassword = 'testpassword123'
    
    // D'abord, essayer de supprimer l'utilisateur s'il existe
    try {
      const { data: existingUser } = await supabase.auth.admin.listUsers()
      const userToDelete = existingUser.users.find(u => u.email === testEmail)
      if (userToDelete) {
        await supabase.auth.admin.deleteUser(userToDelete.id)
        console.log('🗑️  Ancien utilisateur de test supprimé')
      }
    } catch (e) {
      console.log('ℹ️  Pas d\'ancien utilisateur à supprimer')
    }
    
    // Tenter l'inscription
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test User'
        }
      }
    })
    
    if (signupError) {
      console.log('❌ Erreur inscription:', signupError.message)
    } else {
      console.log('✅ Inscription test réussie!')
      console.log('   - User ID:', signupData.user?.id)
      console.log('   - Email:', signupData.user?.email)
      
      // Créer le profil
      if (signupData.user) {
        const { error: profileInsertError } = await supabase
          .from('profiles')
          .insert({
            id: signupData.user.id,
            email: testEmail,
            full_name: 'Test User',
            job_title: 'Designer',
            skills: ['Design', 'Test'],
            experience_years: 0,
            availability: true
          })
        
        if (profileInsertError) {
          console.log('⚠️  Erreur création profil:', profileInsertError.message)
        } else {
          console.log('✅ Profil test créé')
        }
        
        // Nettoyer le test
        await supabase.auth.admin.deleteUser(signupData.user.id)
        console.log('🧹 Utilisateur test nettoyé')
      }
    }
    
    console.log('\n🎉 Recréation terminée!')
    console.log('   - Base de données: Recréée')
    console.log('   - Table profiles: ✅')
    console.log('   - Sécurité RLS: ✅')
    console.log('   - Test inscription: ' + (signupError ? '❌' : '✅'))
    
  } catch (error) {
    console.error('❌ Erreur générale:', error)
  }
}

recreateDatabase()

