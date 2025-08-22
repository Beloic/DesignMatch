#!/usr/bin/env node

/**
 * Script de diagnostic pour vérifier la connectivité Vercel-GitHub
 * Usage: node scripts/check-vercel-webhook.js
 */

import https from 'https';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Diagnostic de la connectivité Vercel-GitHub\n');

// 1. Vérification de la configuration Git
console.log('1️⃣ Configuration Git:');
try {
  const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
  const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  const lastCommit = execSync('git log -1 --oneline', { encoding: 'utf8' }).trim();
  
  console.log(`   📍 Remote URL: ${remoteUrl}`);
  console.log(`   🌿 Branche actuelle: ${branch}`);
  console.log(`   📝 Dernier commit: ${lastCommit}`);
} catch (error) {
  console.log('   ❌ Erreur lors de la vérification Git:', error.message);
}

// 2. Vérification de la connectivité GitHub
console.log('\n2️⃣ Connectivité GitHub:');
try {
  const response = await new Promise((resolve, reject) => {
    const req = https.request('https://github.com/Beloic/DesignMatch', { method: 'HEAD' }, (res) => {
      resolve({ statusCode: res.statusCode, headers: res.headers });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => reject(new Error('Timeout')));
    req.end();
  });
  
  console.log(`   ✅ GitHub accessible (Status: ${response.statusCode})`);
} catch (error) {
  console.log(`   ❌ GitHub inaccessible: ${error.message}`);
}

// 3. Vérification de la configuration Vercel
console.log('\n3️⃣ Configuration Vercel:');
try {
  const vercelConfigPath = join(__dirname, '..', 'vercel.json');
  const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, 'utf8'));
  console.log('   ✅ vercel.json trouvé');
  console.log(`   📋 Version: ${vercelConfig.version}`);
  console.log(`   🔧 Framework: ${vercelConfig.framework || 'Non spécifié'}`);
  console.log(`   📦 Build Command: ${vercelConfig.buildCommand || 'Défaut'}`);
} catch (error) {
  console.log('   ❌ vercel.json non trouvé ou invalide:', error.message);
}

// 4. Vérification du build local
console.log('\n4️⃣ Build local:');
try {
  console.log('   🔨 Test du build...');
  execSync('npm run build', { stdio: 'pipe' });
  console.log('   ✅ Build local réussi');
} catch (error) {
  console.log('   ❌ Build local échoué:', error.message);
}

// 5. Recommandations
console.log('\n5️⃣ Recommandations:');
console.log('   📋 Vérifiez manuellement sur GitHub:');
console.log('      - Settings > Webhooks > Vérifiez les webhooks Vercel');
console.log('   📋 Vérifiez sur Vercel:');
console.log('      - Projet > Settings > Git > Vérifiez la connexion GitHub');
console.log('   📋 Si aucun webhook:');
console.log('      - Reconnectez le projet GitHub sur Vercel');
console.log('      - Ou créez manuellement un webhook GitHub vers Vercel');

console.log('\n🎯 Diagnostic terminé !');
